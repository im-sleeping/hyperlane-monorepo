import { providers } from 'ethers';
import { Address } from '@hyperlane-xyz/utils';
import { DerivedIcaRouterConfig } from './types.js';
export declare class EvmIcaRouterReader {
    private readonly provider;
    constructor(provider: providers.Provider);
    deriveConfig(address: Address): Promise<DerivedIcaRouterConfig>;
    private deriveRemoteRoutersConfig;
}
//# sourceMappingURL=EvmIcaReader.d.ts.map