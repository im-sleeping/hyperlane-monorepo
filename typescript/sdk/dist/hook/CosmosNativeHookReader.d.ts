import { HyperlaneModuleClient, SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../providers/MultiProvider.js';
import { HookConfig } from './types.js';
export declare class CosmosNativeHookReader {
    protected readonly multiProvider: MultiProvider;
    protected readonly cosmosProviderOrSigner: HyperlaneModuleClient | SigningHyperlaneModuleClient;
    protected readonly logger: import("pino").default.Logger<never>;
    constructor(multiProvider: MultiProvider, cosmosProviderOrSigner: HyperlaneModuleClient | SigningHyperlaneModuleClient);
    deriveHookConfig(address: Address): Promise<HookConfig>;
    private deriveIgpConfig;
    private deriveMerkleTreeConfig;
    private deriveNoopConfig;
    private isIgpHook;
    private isMerkleTreeHook;
    private isNoopHook;
}
//# sourceMappingURL=CosmosNativeHookReader.d.ts.map