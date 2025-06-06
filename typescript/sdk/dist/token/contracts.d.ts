import { HypERC20Collateral__factory, HypERC20__factory, HypERC721Collateral__factory, HypERC721URICollateral__factory, HypERC721URIStorage__factory, HypERC721__factory, HypERC4626Collateral__factory, HypERC4626OwnerCollateral__factory, HypERC4626__factory, HypFiatToken__factory, HypNative__factory, HypXERC20Lockbox__factory, HypXERC20__factory } from '@hyperlane-xyz/core';
export declare const hypERC20contracts: {
    synthetic: string;
    syntheticRebase: string;
    syntheticUri: string;
    collateral: string;
    collateralFiat: string;
    collateralUri: string;
    xERC20: string;
    xERC20Lockbox: string;
    collateralVault: string;
    collateralVaultRebase: string;
    native: string;
    nativeScaled: string;
};
export type HypERC20contracts = typeof hypERC20contracts;
export declare const hypERC20factories: {
    synthetic: HypERC20__factory;
    collateral: HypERC20Collateral__factory;
    collateralVault: HypERC4626OwnerCollateral__factory;
    collateralVaultRebase: HypERC4626Collateral__factory;
    syntheticRebase: HypERC4626__factory;
    collateralFiat: HypFiatToken__factory;
    xERC20: HypXERC20__factory;
    xERC20Lockbox: HypXERC20Lockbox__factory;
    native: HypNative__factory;
    nativeScaled: HypNative__factory;
};
export type HypERC20Factories = typeof hypERC20factories;
export declare const hypERC721contracts: {
    collateralUri: string;
    collateral: string;
    syntheticUri: string;
    synthetic: string;
};
export type HypERC721contracts = typeof hypERC721contracts;
export declare const hypERC721factories: {
    collateralUri: HypERC721URICollateral__factory;
    collateral: HypERC721Collateral__factory;
    syntheticUri: HypERC721URIStorage__factory;
    synthetic: HypERC721__factory;
};
export type HypERC721Factories = typeof hypERC721factories;
export type TokenFactories = HypERC20Factories | HypERC721Factories;
//# sourceMappingURL=contracts.d.ts.map