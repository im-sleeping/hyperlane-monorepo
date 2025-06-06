import { zeroAddress } from 'viem';
import { assert, deepEquals, eqAddress, rootLogger, } from '@hyperlane-xyz/utils';
import { HyperlaneModule, } from '../core/AbstractHyperlaneModule.js';
import { normalizeConfig } from '../utils/ism.js';
import { CosmosNativeHookReader } from './CosmosNativeHookReader.js';
import { HookConfigSchema, HookType, } from './types.js';
export class CosmosNativeHookModule extends HyperlaneModule {
    multiProvider;
    signer;
    logger = rootLogger.child({
        module: 'CosmosNativeHookModule',
    });
    reader;
    // Adding these to reduce how often we need to grab from MultiProvider.
    chain;
    chainId;
    domainId;
    constructor(multiProvider, params, signer) {
        params.config = HookConfigSchema.parse(params.config);
        super(params);
        this.multiProvider = multiProvider;
        this.signer = signer;
        this.reader = new CosmosNativeHookReader(multiProvider, signer);
        this.chain = multiProvider.getChainName(this.args.chain);
        this.chainId = multiProvider.getChainId(this.chain);
        this.domainId = multiProvider.getDomainId(this.chain);
    }
    async read() {
        return this.reader.deriveHookConfig(this.args.addresses.deployedHook);
    }
    async update(targetConfig) {
        if (targetConfig === zeroAddress) {
            return Promise.resolve([]);
        }
        targetConfig = HookConfigSchema.parse(targetConfig);
        // Do not support updating to a custom Hook address
        if (typeof targetConfig === 'string') {
            throw new Error('Invalid targetConfig: Updating to a custom Hook address is not supported. Please provide a valid Hook configuration.');
        }
        this.args.config = targetConfig;
        // We need to normalize the current and target configs to compare.
        const normalizedCurrentConfig = normalizeConfig(await this.read());
        const normalizedTargetConfig = normalizeConfig(targetConfig);
        if (deepEquals(normalizedCurrentConfig, normalizedTargetConfig)) {
            return [];
        }
        this.args.addresses.deployedHook = await this.deploy({
            config: normalizedTargetConfig,
        });
        return [];
    }
    static async create({ chain, config, addresses, multiProvider, signer, }) {
        const module = new CosmosNativeHookModule(multiProvider, {
            addresses,
            chain,
            config,
        }, signer);
        module.args.addresses.deployedHook = await module.deploy({ config });
        return module;
    }
    async deploy({ config }) {
        config = HookConfigSchema.parse(config);
        if (typeof config === 'string') {
            return config;
        }
        const hookType = config.type;
        this.logger.info(`Deploying ${hookType} to ${this.chain}`);
        switch (hookType) {
            case HookType.INTERCHAIN_GAS_PAYMASTER:
                return this.deployIgpHook({ config });
            case HookType.MERKLE_TREE:
                return this.deployMerkleTreeHook();
            case HookType.MAILBOX_DEFAULT:
                return this.deployNoopHook();
            default:
                throw new Error(`Hook type ${hookType} is not supported on Cosmos`);
        }
    }
    async deployIgpHook({ config, }) {
        this.logger.debug('Deploying IGP as hook...');
        const { nativeToken } = this.multiProvider.getChainMetadata(this.chain);
        assert(nativeToken?.denom, `found no native token for chain ${this.chain}`);
        const { response: igp } = await this.signer.createIgp({
            denom: nativeToken.denom,
        });
        for (const [remote, c] of Object.entries(config.oracleConfig)) {
            const remoteDomain = this.multiProvider.tryGetDomainId(remote);
            if (remoteDomain === null) {
                this.logger.warn(`Skipping gas oracle ${this.chain} -> ${remote}.`);
                continue;
            }
            await this.signer.setDestinationGasConfig({
                igp_id: igp.id,
                destination_gas_config: {
                    remote_domain: remoteDomain,
                    gas_overhead: config.overhead[remote].toString(),
                    gas_oracle: {
                        token_exchange_rate: c.tokenExchangeRate,
                        gas_price: c.gasPrice,
                    },
                },
            });
        }
        if (!eqAddress(this.signer.account.address, config.owner)) {
            await this.signer.setIgpOwner({
                igp_id: igp.id,
                new_owner: config.owner,
                renounce_ownership: !config.owner, // if owner is empty we renounce the ownership
            });
        }
        return igp.id;
    }
    async deployMerkleTreeHook() {
        this.logger.debug('Deploying Merkle Tree Hook...');
        const { response: merkleTree } = await this.signer.createMerkleTreeHook({
            mailbox_id: this.args.addresses.mailbox,
        });
        return merkleTree.id;
    }
    async deployNoopHook() {
        this.logger.debug('Deploying Noop Hook...');
        const { response: noopResponse } = await this.signer.createNoopHook({});
        return noopResponse.id;
    }
}
//# sourceMappingURL=CosmosNativeHookModule.js.map