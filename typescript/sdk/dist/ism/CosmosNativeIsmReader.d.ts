import { HyperlaneModuleClient, SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../providers/MultiProvider.js';
import { DerivedIsmConfig } from './types.js';
export declare class CosmosNativeIsmReader {
    protected readonly multiProvider: MultiProvider;
    protected readonly cosmosProviderOrSigner: HyperlaneModuleClient | SigningHyperlaneModuleClient;
    protected readonly logger: import("pino").default.Logger<never>;
    constructor(multiProvider: MultiProvider, cosmosProviderOrSigner: HyperlaneModuleClient | SigningHyperlaneModuleClient);
    deriveIsmConfig(address: Address): Promise<DerivedIsmConfig>;
    private deriveMerkleRootMultisigConfig;
    private deriveMessageIdMultisigConfig;
    private deriveRoutingConfig;
    private deriveTestConfig;
}
//# sourceMappingURL=CosmosNativeIsmReader.d.ts.map