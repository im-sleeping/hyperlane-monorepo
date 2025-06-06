import { ethers } from 'ethers';
import { z } from 'zod';
import { ProtocolType } from '@hyperlane-xyz/utils';
export declare const StorageGasOracleConfigSchema: z.ZodObject<{
    gasPrice: z.ZodString;
    tokenExchangeRate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    gasPrice: string;
    tokenExchangeRate: string;
}, {
    gasPrice: string;
    tokenExchangeRate: string;
}>;
export type StorageGasOracleConfig = z.output<typeof StorageGasOracleConfigSchema>;
export declare const ProtocolAgnositicGasOracleConfigSchema: z.ZodObject<{
    gasPrice: z.ZodString;
    tokenExchangeRate: z.ZodString;
    tokenDecimals: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    gasPrice: string;
    tokenExchangeRate: string;
    tokenDecimals?: number | undefined;
}, {
    gasPrice: string;
    tokenExchangeRate: string;
    tokenDecimals?: number | undefined;
}>;
export type ProtocolAgnositicGasOracleConfig = z.output<typeof ProtocolAgnositicGasOracleConfigSchema>;
export type OracleData = {
    tokenExchangeRate: ethers.BigNumber;
    gasPrice: ethers.BigNumber;
};
export declare const formatGasOracleConfig: (localChainProtocol: ProtocolType, config: OracleData) => {
    tokenExchangeRate: string;
    gasPrice: string;
};
export declare const oracleConfigToOracleData: (config: StorageGasOracleConfig) => OracleData;
export declare const serializeDifference: (localChainProtocol: ProtocolType, actual: OracleData, expected: OracleData) => string;
//# sourceMappingURL=types.d.ts.map