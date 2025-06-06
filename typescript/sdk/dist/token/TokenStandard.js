import { ProtocolType, objMap } from '@hyperlane-xyz/utils';
import { PROTOCOL_TO_DEFAULT_PROVIDER_TYPE, ProviderType, } from '../providers/ProviderType.js';
import { TokenType } from './config.js';
export var TokenStandard;
(function (TokenStandard) {
    // EVM
    TokenStandard["ERC20"] = "ERC20";
    TokenStandard["ERC721"] = "ERC721";
    TokenStandard["EvmNative"] = "EvmNative";
    TokenStandard["EvmHypNative"] = "EvmHypNative";
    TokenStandard["EvmHypCollateral"] = "EvmHypCollateral";
    TokenStandard["EvmHypOwnerCollateral"] = "EvmHypOwnerCollateral";
    TokenStandard["EvmHypRebaseCollateral"] = "EvmHypRebaseCollateral";
    TokenStandard["EvmHypCollateralFiat"] = "EvmHypCollateralFiat";
    TokenStandard["EvmHypSynthetic"] = "EvmHypSynthetic";
    TokenStandard["EvmHypSyntheticRebase"] = "EvmHypSyntheticRebase";
    TokenStandard["EvmHypXERC20"] = "EvmHypXERC20";
    TokenStandard["EvmHypXERC20Lockbox"] = "EvmHypXERC20Lockbox";
    TokenStandard["EvmHypVSXERC20"] = "EvmHypVSXERC20";
    TokenStandard["EvmHypVSXERC20Lockbox"] = "EvmHypVSXERC20Lockbox";
    // Sealevel (Solana)
    TokenStandard["SealevelSpl"] = "SealevelSpl";
    TokenStandard["SealevelSpl2022"] = "SealevelSpl2022";
    TokenStandard["SealevelNative"] = "SealevelNative";
    TokenStandard["SealevelHypNative"] = "SealevelHypNative";
    TokenStandard["SealevelHypCollateral"] = "SealevelHypCollateral";
    TokenStandard["SealevelHypSynthetic"] = "SealevelHypSynthetic";
    // Cosmos
    TokenStandard["CosmosIcs20"] = "CosmosIcs20";
    TokenStandard["CosmosIcs721"] = "CosmosIcs721";
    TokenStandard["CosmosNative"] = "CosmosNative";
    TokenStandard["CosmosIbc"] = "CosmosIbc";
    // CosmWasm
    TokenStandard["CW20"] = "CW20";
    TokenStandard["CWNative"] = "CWNative";
    TokenStandard["CW721"] = "CW721";
    TokenStandard["CwHypNative"] = "CwHypNative";
    TokenStandard["CwHypCollateral"] = "CwHypCollateral";
    TokenStandard["CwHypSynthetic"] = "CwHypSynthetic";
    // Cosmos Native
    TokenStandard["CosmNativeHypCollateral"] = "CosmosNativeHypCollateral";
    TokenStandard["CosmNativeHypSynthetic"] = "CosmosNativeHypSynthetic";
    //Starknet
    TokenStandard["StarknetHypNative"] = "StarknetHypNative";
    TokenStandard["StarknetHypCollateral"] = "StarknetHypCollateral";
    TokenStandard["StarknetHypSynthetic"] = "StarknetHypSynthetic";
})(TokenStandard || (TokenStandard = {}));
// Allows for omission of protocol field in token args
export const TOKEN_STANDARD_TO_PROTOCOL = {
    // EVM
    ERC20: ProtocolType.Ethereum,
    ERC721: ProtocolType.Ethereum,
    EvmNative: ProtocolType.Ethereum,
    EvmHypNative: ProtocolType.Ethereum,
    EvmHypCollateral: ProtocolType.Ethereum,
    EvmHypOwnerCollateral: ProtocolType.Ethereum,
    EvmHypRebaseCollateral: ProtocolType.Ethereum,
    EvmHypCollateralFiat: ProtocolType.Ethereum,
    EvmHypSynthetic: ProtocolType.Ethereum,
    EvmHypSyntheticRebase: ProtocolType.Ethereum,
    EvmHypXERC20: ProtocolType.Ethereum,
    EvmHypXERC20Lockbox: ProtocolType.Ethereum,
    EvmHypVSXERC20: ProtocolType.Ethereum,
    EvmHypVSXERC20Lockbox: ProtocolType.Ethereum,
    // Sealevel (Solana)
    SealevelSpl: ProtocolType.Sealevel,
    SealevelSpl2022: ProtocolType.Sealevel,
    SealevelNative: ProtocolType.Sealevel,
    SealevelHypNative: ProtocolType.Sealevel,
    SealevelHypCollateral: ProtocolType.Sealevel,
    SealevelHypSynthetic: ProtocolType.Sealevel,
    // Cosmos
    CosmosIcs20: ProtocolType.Cosmos,
    CosmosIcs721: ProtocolType.Cosmos,
    CosmosNative: ProtocolType.Cosmos,
    CosmosIbc: ProtocolType.Cosmos,
    // Cosmos Native
    CosmosNativeHypCollateral: ProtocolType.CosmosNative,
    CosmosNativeHypSynthetic: ProtocolType.CosmosNative,
    // CosmWasm
    CW20: ProtocolType.Cosmos,
    CWNative: ProtocolType.Cosmos,
    CW721: ProtocolType.Cosmos,
    CwHypNative: ProtocolType.Cosmos,
    CwHypCollateral: ProtocolType.Cosmos,
    CwHypSynthetic: ProtocolType.Cosmos,
    // Starknet
    StarknetHypCollateral: ProtocolType.Starknet,
    StarknetHypNative: ProtocolType.Starknet,
    StarknetHypSynthetic: ProtocolType.Starknet,
};
export const TOKEN_STANDARD_TO_PROVIDER_TYPE = objMap(TOKEN_STANDARD_TO_PROTOCOL, (k, v) => {
    if (k.startsWith('CosmosNative')) {
        return ProviderType.CosmJsNative;
    }
    if (k.startsWith('Cosmos')) {
        return ProviderType.CosmJs;
    }
    return PROTOCOL_TO_DEFAULT_PROVIDER_TYPE[v];
});
export const TOKEN_NFT_STANDARDS = [
    TokenStandard.ERC721,
    TokenStandard.CosmosIcs721,
    TokenStandard.CW721,
    // TODO solana here
];
export const TOKEN_COLLATERALIZED_STANDARDS = [
    TokenStandard.EvmHypCollateral,
    TokenStandard.EvmHypNative,
    TokenStandard.SealevelHypCollateral,
    TokenStandard.SealevelHypNative,
    TokenStandard.CwHypCollateral,
    TokenStandard.CwHypNative,
    TokenStandard.CosmNativeHypCollateral,
    TokenStandard.EvmHypXERC20Lockbox,
    TokenStandard.EvmHypVSXERC20Lockbox,
];
export const XERC20_STANDARDS = [
    TokenStandard.EvmHypXERC20,
    TokenStandard.EvmHypXERC20Lockbox,
    TokenStandard.EvmHypVSXERC20,
    TokenStandard.EvmHypVSXERC20Lockbox,
];
export const MINT_LIMITED_STANDARDS = [
    TokenStandard.EvmHypXERC20,
    TokenStandard.EvmHypXERC20Lockbox,
    TokenStandard.EvmHypVSXERC20,
    TokenStandard.EvmHypVSXERC20Lockbox,
];
export const TOKEN_HYP_STANDARDS = [
    TokenStandard.EvmHypNative,
    TokenStandard.EvmHypCollateral,
    TokenStandard.EvmHypCollateralFiat,
    TokenStandard.EvmHypOwnerCollateral,
    TokenStandard.EvmHypRebaseCollateral,
    TokenStandard.EvmHypSynthetic,
    TokenStandard.EvmHypSyntheticRebase,
    TokenStandard.EvmHypXERC20,
    TokenStandard.EvmHypXERC20Lockbox,
    TokenStandard.EvmHypVSXERC20,
    TokenStandard.EvmHypVSXERC20Lockbox,
    TokenStandard.SealevelHypNative,
    TokenStandard.SealevelHypCollateral,
    TokenStandard.SealevelHypSynthetic,
    TokenStandard.CwHypNative,
    TokenStandard.CwHypCollateral,
    TokenStandard.CwHypSynthetic,
    TokenStandard.CosmNativeHypCollateral,
    TokenStandard.CosmNativeHypSynthetic,
    TokenStandard.StarknetHypNative,
    TokenStandard.StarknetHypCollateral,
    TokenStandard.StarknetHypSynthetic,
];
export const TOKEN_MULTI_CHAIN_STANDARDS = [
    ...TOKEN_HYP_STANDARDS,
    TokenStandard.CosmosIbc,
];
// Useful for differentiating from norma Cosmos standards
// (e.g. for determining the appropriate cosmos client)
export const TOKEN_COSMWASM_STANDARDS = [
    TokenStandard.CW20,
    TokenStandard.CWNative,
    TokenStandard.CW721,
    TokenStandard.CwHypNative,
    TokenStandard.CwHypCollateral,
    TokenStandard.CwHypSynthetic,
];
export const TOKEN_TYPE_TO_STANDARD = {
    [TokenType.native]: TokenStandard.EvmHypNative,
    [TokenType.collateral]: TokenStandard.EvmHypCollateral,
    [TokenType.collateralFiat]: TokenStandard.EvmHypCollateralFiat,
    [TokenType.XERC20]: TokenStandard.EvmHypXERC20,
    [TokenType.XERC20Lockbox]: TokenStandard.EvmHypXERC20Lockbox,
    [TokenType.collateralVault]: TokenStandard.EvmHypOwnerCollateral,
    [TokenType.collateralVaultRebase]: TokenStandard.EvmHypRebaseCollateral,
    [TokenType.collateralUri]: TokenStandard.EvmHypCollateral,
    [TokenType.synthetic]: TokenStandard.EvmHypSynthetic,
    [TokenType.syntheticRebase]: TokenStandard.EvmHypSyntheticRebase,
    [TokenType.syntheticUri]: TokenStandard.EvmHypSynthetic,
    [TokenType.nativeScaled]: TokenStandard.EvmHypNative,
};
// Starknet supported token types
export const STARKNET_SUPPORTED_TOKEN_TYPES = [
    TokenType.collateral,
    TokenType.native,
    TokenType.synthetic,
];
export const STARKNET_TOKEN_TYPE_TO_STANDARD = {
    [TokenType.collateral]: TokenStandard.StarknetHypCollateral,
    [TokenType.native]: TokenStandard.StarknetHypNative,
    [TokenType.synthetic]: TokenStandard.StarknetHypSynthetic,
};
export const PROTOCOL_TO_NATIVE_STANDARD = {
    [ProtocolType.Ethereum]: TokenStandard.EvmNative,
    [ProtocolType.Cosmos]: TokenStandard.CosmosNative,
    [ProtocolType.CosmosNative]: TokenStandard.CosmosNative,
    [ProtocolType.Sealevel]: TokenStandard.SealevelNative,
    [ProtocolType.Starknet]: TokenStandard.StarknetHypNative,
};
//# sourceMappingURL=TokenStandard.js.map