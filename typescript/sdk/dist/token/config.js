export var TokenType;
(function (TokenType) {
    TokenType["synthetic"] = "synthetic";
    TokenType["syntheticRebase"] = "syntheticRebase";
    TokenType["syntheticUri"] = "syntheticUri";
    TokenType["collateral"] = "collateral";
    TokenType["collateralVault"] = "collateralVault";
    TokenType["collateralVaultRebase"] = "collateralVaultRebase";
    TokenType["XERC20"] = "xERC20";
    TokenType["XERC20Lockbox"] = "xERC20Lockbox";
    TokenType["collateralFiat"] = "collateralFiat";
    TokenType["collateralUri"] = "collateralUri";
    TokenType["native"] = "native";
    // backwards compatible alias to native
    TokenType["nativeScaled"] = "nativeScaled";
})(TokenType || (TokenType = {}));
export const gasOverhead = (tokenType) => {
    switch (tokenType) {
        case TokenType.synthetic:
            return 64000;
        case TokenType.native:
            return 44000;
        default:
            return 68000;
    }
};
export const NON_ZERO_SENDER_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
//# sourceMappingURL=config.js.map