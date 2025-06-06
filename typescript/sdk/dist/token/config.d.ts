export declare enum TokenType {
    synthetic = "synthetic",
    syntheticRebase = "syntheticRebase",
    syntheticUri = "syntheticUri",
    collateral = "collateral",
    collateralVault = "collateralVault",
    collateralVaultRebase = "collateralVaultRebase",
    XERC20 = "xERC20",
    XERC20Lockbox = "xERC20Lockbox",
    collateralFiat = "collateralFiat",
    collateralUri = "collateralUri",
    native = "native",
    nativeScaled = "nativeScaled"
}
export declare const gasOverhead: (tokenType: TokenType) => number;
export declare const NON_ZERO_SENDER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
//# sourceMappingURL=config.d.ts.map