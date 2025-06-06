import { Mailbox__factory, ProxyAdmin__factory } from '@hyperlane-xyz/core';
import { objMap, promiseObjAll, rootLogger, } from '@hyperlane-xyz/utils';
import { DEFAULT_CONTRACT_READ_CONCURRENCY } from '../consts/concurrency.js';
import { proxyAdmin } from '../deploy/proxy.js';
import { EvmHookReader } from '../hook/EvmHookReader.js';
import { EvmIcaRouterReader } from '../ica/EvmIcaReader.js';
import { EvmIsmReader } from '../ism/EvmIsmReader.js';
export class EvmCoreReader {
    multiProvider;
    chain;
    concurrency;
    provider;
    evmHookReader;
    evmIsmReader;
    evmIcaRouterReader;
    logger = rootLogger.child({ module: 'EvmCoreReader' });
    constructor(multiProvider, chain, concurrency = multiProvider.tryGetRpcConcurrency(chain) ?? DEFAULT_CONTRACT_READ_CONCURRENCY) {
        this.multiProvider = multiProvider;
        this.chain = chain;
        this.concurrency = concurrency;
        this.provider = this.multiProvider.getProvider(chain);
        this.evmHookReader = new EvmHookReader(multiProvider, chain, concurrency);
        this.evmIsmReader = new EvmIsmReader(multiProvider, chain, concurrency);
        this.evmIcaRouterReader = new EvmIcaRouterReader(multiProvider.getProvider(chain));
    }
    /**
     * Derives the core configuration for a given Mailbox address.
     *
     * @param address - The address of the Mailbox contract.
     * @returns A promise that resolves to the CoreConfig object, containing the owner, default ISM, default Hook, and required Hook configurations.
     */
    async deriveCoreConfig({ mailbox, interchainAccountRouter, }) {
        const mailboxInstance = Mailbox__factory.connect(mailbox, this.provider);
        const [defaultIsm, defaultHook, requiredHook, mailboxProxyAdmin] = await Promise.all([
            mailboxInstance.defaultIsm(),
            mailboxInstance.defaultHook(),
            mailboxInstance.requiredHook(),
            proxyAdmin(this.provider, mailboxInstance.address),
        ]);
        // Parallelize each configuration request
        const results = await promiseObjAll(objMap({
            owner: mailboxInstance.owner(),
            defaultIsm: this.evmIsmReader.deriveIsmConfig(defaultIsm),
            defaultHook: this.evmHookReader.deriveHookConfig(defaultHook),
            requiredHook: this.evmHookReader.deriveHookConfig(requiredHook),
            interchainAccountRouter: interchainAccountRouter
                ? this.evmIcaRouterReader.deriveConfig(interchainAccountRouter)
                : undefined,
            proxyAdmin: this.getProxyAdminConfig(mailboxProxyAdmin),
        }, async (_, readerCall) => {
            try {
                return readerCall;
            }
            catch (e) {
                this.logger.error(`EvmCoreReader: readerCall failed for ${mailbox}:`, e);
                return;
            }
        }));
        return results;
    }
    async getProxyAdminConfig(proxyAdminAddress) {
        const instance = ProxyAdmin__factory.connect(proxyAdminAddress, this.provider);
        const owner = await instance.owner();
        return {
            owner,
            address: proxyAdminAddress,
        };
    }
}
//# sourceMappingURL=EvmCoreReader.js.map