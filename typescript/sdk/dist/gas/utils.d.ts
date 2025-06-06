import { BigNumber as BigNumberJs } from 'bignumber.js';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { ChainMetadataManager } from '../metadata/ChainMetadataManager.js';
import { AgentCosmosGasPrice } from '../metadata/agentConfig.js';
import { MultiProtocolProvider } from '../providers/MultiProtocolProvider.js';
import { ChainMap, ChainName } from '../types.js';
import { ProtocolAgnositicGasOracleConfig } from './oracle/types.js';
export interface GasPriceConfig {
    amount: string;
    decimals: number;
}
export interface NativeTokenPriceConfig {
    price: string;
    decimals: number;
}
export interface ChainGasOracleParams {
    gasPrice: GasPriceConfig;
    nativeToken: NativeTokenPriceConfig;
}
export declare function getGasPrice(mpp: MultiProtocolProvider, chain: string): Promise<GasPriceConfig>;
export declare function getCosmosChainGasPrice(chain: ChainName, chainMetadataManager: ChainMetadataManager): Promise<AgentCosmosGasPrice>;
export declare function getLocalStorageGasOracleConfig({ local, localProtocolType, gasOracleParams, exchangeRateMarginPct, gasPriceModifier, }: {
    local: ChainName;
    localProtocolType: ProtocolType;
    gasOracleParams: ChainMap<ChainGasOracleParams>;
    exchangeRateMarginPct: number;
    gasPriceModifier?: (local: ChainName, remote: ChainName, gasOracleConfig: ProtocolAgnositicGasOracleConfig) => BigNumberJs.Value;
}): ChainMap<ProtocolAgnositicGasOracleConfig>;
//# sourceMappingURL=utils.d.ts.map