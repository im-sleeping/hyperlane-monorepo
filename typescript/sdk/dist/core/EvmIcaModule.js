import { ethers } from 'ethers';
import { InterchainAccountRouter__factory } from '@hyperlane-xyz/core';
import { addressToBytes32, bytes32ToAddress, difference, rootLogger, } from '@hyperlane-xyz/utils';
import { serializeContracts } from '../contracts/contracts.js';
import { proxyAdminUpdateTxs } from '../deploy/proxy.js';
import { EvmIcaRouterReader } from '../ica/EvmIcaReader.js';
import { InterchainAccountDeployer } from '../middleware/account/InterchainAccountDeployer.js';
import { HyperlaneModule, } from './AbstractHyperlaneModule.js';
export class EvmIcaModule extends HyperlaneModule {
    multiProvider;
    logger = rootLogger.child({ module: 'EvmIcaModule' });
    icaRouterReader;
    domainId;
    chainId;
    constructor(multiProvider, args) {
        super(args);
        this.multiProvider = multiProvider;
        this.icaRouterReader = new EvmIcaRouterReader(multiProvider.getProvider(this.args.chain));
        this.domainId = multiProvider.getDomainId(args.chain);
        this.chainId = multiProvider.getEvmChainId(args.chain);
    }
    async read() {
        return this.icaRouterReader.deriveConfig(this.args.addresses.interchainAccountRouter);
    }
    async update(expectedConfig) {
        const actualConfig = await this.read();
        const transactions = [
            ...(await this.updateRemoteRoutersEnrollment(actualConfig.remoteIcaRouters, expectedConfig.remoteIcaRouters)),
            ...proxyAdminUpdateTxs(this.chainId, this.args.addresses.interchainAccountIsm, actualConfig, expectedConfig),
        ];
        return transactions;
    }
    async updateRemoteRoutersEnrollment(actualConfig, expectedConfig = {}) {
        const transactions = [
            ...(await this.getEnrollRemoteIcaRoutersTxs(actualConfig, expectedConfig)),
            ...(await this.getUnenrollRemoteIcaRoutersTxs(actualConfig, expectedConfig)),
        ];
        return transactions;
    }
    async getEnrollRemoteIcaRoutersTxs(actualConfig, expectedConfig = {}) {
        const transactions = [];
        const routesToEnroll = Array.from(difference(new Set(Object.keys(expectedConfig)), new Set(Object.keys(actualConfig))));
        if (routesToEnroll.length === 0) {
            return transactions;
        }
        const domainsToEnroll = [];
        const remoteDomainIca = [];
        const remoteIsm = [];
        for (const domainId of routesToEnroll) {
            domainsToEnroll.push(domainId);
            remoteDomainIca.push(addressToBytes32(expectedConfig[domainId].address));
            remoteIsm.push(expectedConfig[domainId].interchainSecurityModule
                ? addressToBytes32(expectedConfig[domainId].interchainSecurityModule)
                : ethers.utils.hexZeroPad('0x', 32));
        }
        const remoteTransactions = domainsToEnroll.map((domainId) => ({
            annotation: `Enrolling InterchainAccountRouter on domain ${this.domainId} on InterchainAccountRouter at ${expectedConfig[domainId].address} on domain ${domainId}`,
            chainId: this.multiProvider.getEvmChainId(domainId),
            to: expectedConfig[domainId].address,
            data: InterchainAccountRouter__factory.createInterface().encodeFunctionData('enrollRemoteRouter(uint32,bytes32)', [
                this.domainId,
                addressToBytes32(this.args.addresses.interchainAccountRouter),
            ]),
        }));
        transactions.push({
            annotation: `Enrolling remote InterchainAccountRouters on domain ${this.domainId}`,
            chainId: this.chainId,
            to: this.args.addresses.interchainAccountRouter,
            data: InterchainAccountRouter__factory.createInterface().encodeFunctionData('enrollRemoteRouterAndIsms(uint32[],bytes32[],bytes32[])', [domainsToEnroll, remoteDomainIca, remoteIsm]),
        });
        transactions.push(...remoteTransactions);
        return transactions;
    }
    async getUnenrollRemoteIcaRoutersTxs(actualConfig, expectedConfig = {}) {
        const transactions = [];
        const routesToUnenroll = Array.from(difference(new Set(Object.keys(actualConfig)), new Set(Object.keys(expectedConfig))));
        if (routesToUnenroll.length === 0) {
            return transactions;
        }
        transactions.push({
            annotation: `Unenrolling remote InterchainAccountRouters from chain ${this.domainId}`,
            chainId: this.chainId,
            to: this.args.addresses.interchainAccountRouter,
            data: InterchainAccountRouter__factory.createInterface().encodeFunctionData('unenrollRemoteRouters(uint32[])', [routesToUnenroll]),
        });
        const remoteTransactions = routesToUnenroll.map((domainId) => ({
            annotation: `Removing InterchainAccountRouter on domain ${this.domainId} from InterchainAccountRouter at ${actualConfig[domainId].address} on domain ${domainId}`,
            chainId: this.multiProvider.getEvmChainId(domainId),
            to: bytes32ToAddress(actualConfig[domainId].address),
            data: InterchainAccountRouter__factory.createInterface().encodeFunctionData('unenrollRemoteRouter(uint32)', [this.domainId]),
        }));
        transactions.push(...remoteTransactions);
        return transactions;
    }
    /**
     * Creates a new EvmIcaModule instance by deploying an ICA with an ICA ISM.
     *
     * @param chain - The chain on which to deploy the ICA.
     * @param config - The configuration for the ICA.
     * @param multiProvider - The MultiProvider instance to use for deployment.
     * @returns {Promise<EvmIcaModule>} - A new EvmIcaModule instance.
     */
    static async create({ chain, config, multiProvider, contractVerifier, }) {
        const interchainAccountDeployer = new InterchainAccountDeployer(multiProvider, contractVerifier);
        const deployedContracts = await interchainAccountDeployer.deployContracts(multiProvider.getChainName(chain), config);
        return new EvmIcaModule(multiProvider, {
            addresses: serializeContracts(deployedContracts),
            chain,
            config,
        });
    }
}
//# sourceMappingURL=EvmIcaModule.js.map