import { ethers } from 'ethers';
import { z } from 'zod';
import { getProtocolExchangeRateDecimals } from '../../consts/igp.js';
export const StorageGasOracleConfigSchema = z.object({
    gasPrice: z.string(),
    tokenExchangeRate: z.string(),
});
export const ProtocolAgnositicGasOracleConfigSchema = StorageGasOracleConfigSchema.extend({
    // The number of decimals of the remote native token.
    // Optional because it's not required by all protocol types.
    tokenDecimals: z.number().optional(),
});
export const formatGasOracleConfig = (localChainProtocol, config) => ({
    tokenExchangeRate: ethers.utils.formatUnits(config.tokenExchangeRate, getProtocolExchangeRateDecimals(localChainProtocol)),
    gasPrice: ethers.utils.formatUnits(config.gasPrice, 'gwei'),
});
const percentDifference = (actual, expected) => expected.sub(actual).mul(100).div(actual);
const serializePercentDifference = (actual, expected) => {
    if (actual.isZero()) {
        return 'new';
    }
    const diff = percentDifference(actual, expected);
    return diff.isNegative() ? `${diff.toString()}%` : `+${diff.toString()}%`;
};
// TODO: replace once #3771 is fixed
export const oracleConfigToOracleData = (config) => ({
    gasPrice: ethers.BigNumber.from(config.gasPrice),
    tokenExchangeRate: ethers.BigNumber.from(config.tokenExchangeRate),
});
export const serializeDifference = (localChainProtocol, actual, expected) => {
    const gasPriceDiff = serializePercentDifference(actual.gasPrice, expected.gasPrice);
    const tokenExchangeRateDiff = serializePercentDifference(actual.tokenExchangeRate, expected.tokenExchangeRate);
    const productDiff = serializePercentDifference(actual.tokenExchangeRate.mul(actual.gasPrice), expected.tokenExchangeRate.mul(expected.gasPrice));
    const formatted = formatGasOracleConfig(localChainProtocol, expected);
    return `Exchange rate: ${formatted.tokenExchangeRate} (${tokenExchangeRateDiff}), Gas price: ${formatted.gasPrice} gwei (${gasPriceDiff}), Product diff: ${productDiff}`;
};
//# sourceMappingURL=types.js.map