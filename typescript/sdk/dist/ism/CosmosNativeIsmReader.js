import { IsmTypes, } from '@hyperlane-xyz/cosmos-sdk';
import { assert, rootLogger } from '@hyperlane-xyz/utils';
import { IsmType, } from './types.js';
export class CosmosNativeIsmReader {
    multiProvider;
    cosmosProviderOrSigner;
    logger = rootLogger.child({
        module: 'CosmosNativeIsmReader',
    });
    constructor(multiProvider, cosmosProviderOrSigner) {
        this.multiProvider = multiProvider;
        this.cosmosProviderOrSigner = cosmosProviderOrSigner;
    }
    async deriveIsmConfig(address) {
        try {
            const { ism } = await this.cosmosProviderOrSigner.query.interchainSecurity.Ism({
                id: address,
            });
            assert(ism, `ISM with id ${address} not found`);
            switch (ism.type_url) {
                case IsmTypes.MerkleRootMultisigISM:
                    return this.deriveMerkleRootMultisigConfig(address);
                case IsmTypes.MessageIdMultisigISM:
                    return this.deriveMessageIdMultisigConfig(address);
                case IsmTypes.RoutingISM:
                    return this.deriveRoutingConfig(address);
                case IsmTypes.NoopISM:
                    return this.deriveTestConfig(address);
                default:
                    throw new Error(`Unknown ISM ModuleType: ${ism.type_url}`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to derive ISM config for ${address}`, error);
            throw error;
        }
    }
    async deriveMerkleRootMultisigConfig(address) {
        const { ism } = await this.cosmosProviderOrSigner.query.interchainSecurity.DecodedIsm({
            id: address,
        });
        return {
            type: IsmType.MERKLE_ROOT_MULTISIG,
            address,
            validators: ism.validators,
            threshold: ism.threshold,
        };
    }
    async deriveMessageIdMultisigConfig(address) {
        const { ism } = await this.cosmosProviderOrSigner.query.interchainSecurity.DecodedIsm({
            id: address,
        });
        return {
            type: IsmType.MESSAGE_ID_MULTISIG,
            address,
            validators: ism.validators,
            threshold: ism.threshold,
        };
    }
    async deriveRoutingConfig(address) {
        const { ism } = await this.cosmosProviderOrSigner.query.interchainSecurity.DecodedIsm({
            id: address,
        });
        const domains = {};
        for (const route of ism.routes) {
            const chainName = this.multiProvider.tryGetChainName(route.domain);
            if (!chainName) {
                this.logger.warn(`Unknown domain ID ${route.domain}, skipping domain configuration`);
                continue;
            }
            domains[chainName] = await this.deriveIsmConfig(route.ism);
        }
        return {
            type: IsmType.ROUTING,
            address,
            owner: ism.owner,
            domains,
        };
    }
    async deriveTestConfig(address) {
        return {
            type: IsmType.TEST_ISM,
            address,
        };
    }
}
//# sourceMappingURL=CosmosNativeIsmReader.js.map