import { HyperlaneModuleClient, SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address } from '@hyperlane-xyz/utils';
import { CosmosNativeHookReader } from '../hook/CosmosNativeHookReader.js';
import { CosmosNativeIsmReader } from '../ism/CosmosNativeIsmReader.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { DerivedCoreConfig } from './types.js';
export declare class CosmosNativeCoreReader {
    protected readonly multiProvider: MultiProvider;
    protected readonly signer: HyperlaneModuleClient | SigningHyperlaneModuleClient;
    protected readonly logger: import("pino").default.Logger<never>;
    protected ismReader: CosmosNativeIsmReader;
    protected hookReader: CosmosNativeHookReader;
    constructor(multiProvider: MultiProvider, signer: HyperlaneModuleClient | SigningHyperlaneModuleClient);
    deriveCoreConfig(mailboxAddress: Address): Promise<DerivedCoreConfig>;
}
//# sourceMappingURL=CosmosNativeCoreReader.d.ts.map