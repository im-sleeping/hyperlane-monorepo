import { z } from 'zod';
import { HookType } from '../hook/types.js';
import { IsmType } from '../ism/types.js';
import { DerivedMailboxClientFields, GasRouterConfigSchema } from '../router/types.js';
import { ChainMap } from '../types.js';
import { TokenType } from './config.js';
export declare const WarpRouteDeployConfigSchemaErrors: {
    ONLY_SYNTHETIC_REBASE: string;
    NO_SYNTHETIC_ONLY: string;
};
export declare const TokenMetadataSchema: z.ZodObject<{
    name: z.ZodString;
    symbol: z.ZodString;
    decimals: z.ZodOptional<z.ZodNumber>;
    scale: z.ZodOptional<z.ZodNumber>;
    isNft: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    symbol: string;
    name: string;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>;
export type TokenMetadata = z.infer<typeof TokenMetadataSchema>;
export declare const isTokenMetadata: (config: unknown) => config is {
    symbol: string;
    name: string;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
};
export declare const NativeTokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>;
export type NativeTokenConfig = z.infer<typeof NativeTokenConfigSchema>;
export declare const isNativeTokenConfig: (config: unknown) => config is {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
};
export declare const CollateralTokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>;
export type CollateralTokenConfig = z.infer<typeof CollateralTokenConfigSchema>;
export declare const isCollateralTokenConfig: (config: unknown) => config is {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
};
declare const xERC20LimitConfigSchema: z.ZodObject<{
    bufferCap: z.ZodOptional<z.ZodString>;
    rateLimitPerSecond: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    bufferCap?: string | undefined;
    rateLimitPerSecond?: string | undefined;
}, {
    bufferCap?: string | undefined;
    rateLimitPerSecond?: string | undefined;
}>;
export type XERC20LimitConfig = z.infer<typeof xERC20LimitConfigSchema>;
declare const xERC20ExtraBridgesLimitConfigsSchema: z.ZodObject<{
    lockbox: z.ZodString;
    limits: z.ZodObject<{
        bufferCap: z.ZodOptional<z.ZodString>;
        rateLimitPerSecond: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        bufferCap?: string | undefined;
        rateLimitPerSecond?: string | undefined;
    }, {
        bufferCap?: string | undefined;
        rateLimitPerSecond?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    lockbox: string;
    limits: {
        bufferCap?: string | undefined;
        rateLimitPerSecond?: string | undefined;
    };
}, {
    lockbox: string;
    limits: {
        bufferCap?: string | undefined;
        rateLimitPerSecond?: string | undefined;
    };
}>;
declare const xERC20TokenMetadataSchema: z.ZodObject<{
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>;
export type XERC20TokenMetadata = z.infer<typeof xERC20TokenMetadataSchema>;
export type XERC20TokenExtraBridgesLimits = z.infer<typeof xERC20ExtraBridgesLimitConfigsSchema>;
export declare const XERC20TokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>;
export type XERC20LimitsTokenConfig = z.infer<typeof XERC20TokenConfigSchema>;
export declare const isXERC20TokenConfig: (config: unknown) => config is {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
};
export declare const CollateralRebaseTokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.collateralVaultRebase>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateralVaultRebase;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateralVaultRebase;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>;
export declare const isCollateralRebaseTokenConfig: (config: unknown) => config is {
    type: TokenType.collateralVaultRebase;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
};
export declare const SyntheticTokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>;
export type SyntheticTokenConfig = z.infer<typeof SyntheticTokenConfigSchema>;
export declare const isSyntheticTokenConfig: (config: unknown) => config is {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
};
export declare const SyntheticRebaseTokenConfigSchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>;
export type SyntheticRebaseTokenConfig = z.infer<typeof SyntheticRebaseTokenConfigSchema>;
export declare const isSyntheticRebaseTokenConfig: (config: unknown) => config is {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
};
export declare enum ContractVerificationStatus {
    Verified = "verified",
    Unverified = "unverified",
    Error = "error",
    Skipped = "skipped"
}
export declare const HypTokenRouterVirtualConfigSchema: z.ZodObject<{
    contractVerificationStatus: z.ZodRecord<z.ZodString, z.ZodEnum<[ContractVerificationStatus.Verified, ContractVerificationStatus.Unverified, ContractVerificationStatus.Error, ContractVerificationStatus.Skipped]>>;
}, "strip", z.ZodTypeAny, {
    contractVerificationStatus: Record<string, ContractVerificationStatus>;
}, {
    contractVerificationStatus: Record<string, ContractVerificationStatus>;
}>;
export type HypTokenRouterVirtualConfig = z.infer<typeof HypTokenRouterVirtualConfigSchema>;
/**
 * @remarks
 * The discriminatedUnion is basically a switch statement for zod schemas
 * It uses the 'type' key to pick from the array of schemas to validate
 */
export declare const HypTokenConfigSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>]>;
export type HypTokenConfig = z.infer<typeof HypTokenConfigSchema>;
export declare const HypTokenRouterConfigSchema: z.ZodIntersection<z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>]>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    mailbox: z.ZodString;
    hook: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
        beneficiary: z.ZodString;
        oracleKey: z.ZodString;
        overhead: z.ZodRecord<z.ZodString, z.ZodNumber>;
        oracleConfig: z.ZodRecord<z.ZodString, z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodType<import("../hook/types.js").DomainRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").DomainRoutingHookConfig>, z.ZodType<import("../hook/types.js").FallbackRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").FallbackRoutingHookConfig>, z.ZodType<import("../hook/types.js").AmountRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").AmountRoutingHookConfig>, z.ZodType<import("../hook/types.js").AggregationHookConfig, z.ZodTypeDef, import("../hook/types.js").AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>>;
    interchainSecurityModule: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TEST_ISM>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TEST_ISM;
    }, {
        type: IsmType.TEST_ISM;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.OP_STACK>;
        origin: z.ZodString;
        nativeBridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }>, z.ZodIntersection<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.PAUSABLE;
    }, {
        type: IsmType.PAUSABLE;
    }>>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
        relayer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP>;
        originChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP;
        originChain: string;
    }, {
        type: IsmType.CCIP;
        originChain: string;
    }>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodString, "many">;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: string[];
        threshold: number;
    }, {
        validators: string[];
        threshold: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }>>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodObject<{
            signingAddress: z.ZodString;
            weight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            signingAddress: string;
            weight: number;
        }, {
            signingAddress: string;
            weight: number;
        }>, "many">;
        thresholdWeight: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }>>, z.ZodType<import("../ism/types.js").RoutingIsmConfig, z.ZodTypeDef, import("../ism/types.js").RoutingIsmConfig>, z.ZodType<import("../ism/types.js").AggregationIsmConfig, z.ZodTypeDef, import("../ism/types.js").AggregationIsmConfig>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
        bridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP_READ>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP_READ;
    }, {
        type: IsmType.CCIP_READ;
    }>]>>;
    foreignDeployment: z.ZodOptional<z.ZodString>;
    remoteRouters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>;
    gas: z.ZodOptional<z.ZodNumber>;
    destinationGas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    mailbox: string;
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    gas?: number | undefined;
    destinationGas?: Record<string, string> | undefined;
}, {
    owner: string;
    mailbox: string;
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    gas?: number | undefined;
    destinationGas?: Record<string, string> | undefined;
}>>, z.ZodObject<{
    contractVerificationStatus: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<[ContractVerificationStatus.Verified, ContractVerificationStatus.Unverified, ContractVerificationStatus.Error, ContractVerificationStatus.Skipped]>>>;
}, "strip", z.ZodTypeAny, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>;
export type HypTokenRouterConfig = z.infer<typeof HypTokenRouterConfigSchema>;
export type DerivedTokenRouterConfig = z.infer<typeof HypTokenConfigSchema> & Omit<z.infer<typeof GasRouterConfigSchema>, keyof DerivedMailboxClientFields> & DerivedMailboxClientFields;
export type DerivedWarpRouteDeployConfig = ChainMap<DerivedTokenRouterConfig>;
export declare function derivedHookAddress(config: DerivedTokenRouterConfig): string;
export declare function derivedIsmAddress(config: DerivedTokenRouterConfig): string;
export declare const HypTokenRouterConfigMailboxOptionalSchema: z.ZodIntersection<z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>]>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    gas: z.ZodOptional<z.ZodNumber>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    hook: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
        beneficiary: z.ZodString;
        oracleKey: z.ZodString;
        overhead: z.ZodRecord<z.ZodString, z.ZodNumber>;
        oracleConfig: z.ZodRecord<z.ZodString, z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodType<import("../hook/types.js").DomainRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").DomainRoutingHookConfig>, z.ZodType<import("../hook/types.js").FallbackRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").FallbackRoutingHookConfig>, z.ZodType<import("../hook/types.js").AmountRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").AmountRoutingHookConfig>, z.ZodType<import("../hook/types.js").AggregationHookConfig, z.ZodTypeDef, import("../hook/types.js").AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>>;
    interchainSecurityModule: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TEST_ISM>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TEST_ISM;
    }, {
        type: IsmType.TEST_ISM;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.OP_STACK>;
        origin: z.ZodString;
        nativeBridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }>, z.ZodIntersection<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.PAUSABLE;
    }, {
        type: IsmType.PAUSABLE;
    }>>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
        relayer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP>;
        originChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP;
        originChain: string;
    }, {
        type: IsmType.CCIP;
        originChain: string;
    }>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodString, "many">;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: string[];
        threshold: number;
    }, {
        validators: string[];
        threshold: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }>>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodObject<{
            signingAddress: z.ZodString;
            weight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            signingAddress: string;
            weight: number;
        }, {
            signingAddress: string;
            weight: number;
        }>, "many">;
        thresholdWeight: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }>>, z.ZodType<import("../ism/types.js").RoutingIsmConfig, z.ZodTypeDef, import("../ism/types.js").RoutingIsmConfig>, z.ZodType<import("../ism/types.js").AggregationIsmConfig, z.ZodTypeDef, import("../ism/types.js").AggregationIsmConfig>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
        bridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP_READ>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP_READ;
    }, {
        type: IsmType.CCIP_READ;
    }>]>>;
    foreignDeployment: z.ZodOptional<z.ZodString>;
    remoteRouters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>;
    destinationGas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    mailbox: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}>>, z.ZodObject<{
    contractVerificationStatus: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<[ContractVerificationStatus.Verified, ContractVerificationStatus.Unverified, ContractVerificationStatus.Error, ContractVerificationStatus.Skipped]>>>;
}, "strip", z.ZodTypeAny, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>;
export type HypTokenRouterConfigMailboxOptional = z.infer<typeof HypTokenRouterConfigMailboxOptionalSchema>;
export declare const WarpRouteDeployConfigSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>]>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    gas: z.ZodOptional<z.ZodNumber>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    hook: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
        beneficiary: z.ZodString;
        oracleKey: z.ZodString;
        overhead: z.ZodRecord<z.ZodString, z.ZodNumber>;
        oracleConfig: z.ZodRecord<z.ZodString, z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodType<import("../hook/types.js").DomainRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").DomainRoutingHookConfig>, z.ZodType<import("../hook/types.js").FallbackRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").FallbackRoutingHookConfig>, z.ZodType<import("../hook/types.js").AmountRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").AmountRoutingHookConfig>, z.ZodType<import("../hook/types.js").AggregationHookConfig, z.ZodTypeDef, import("../hook/types.js").AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>>;
    interchainSecurityModule: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TEST_ISM>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TEST_ISM;
    }, {
        type: IsmType.TEST_ISM;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.OP_STACK>;
        origin: z.ZodString;
        nativeBridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }>, z.ZodIntersection<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.PAUSABLE;
    }, {
        type: IsmType.PAUSABLE;
    }>>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
        relayer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP>;
        originChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP;
        originChain: string;
    }, {
        type: IsmType.CCIP;
        originChain: string;
    }>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodString, "many">;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: string[];
        threshold: number;
    }, {
        validators: string[];
        threshold: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }>>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodObject<{
            signingAddress: z.ZodString;
            weight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            signingAddress: string;
            weight: number;
        }, {
            signingAddress: string;
            weight: number;
        }>, "many">;
        thresholdWeight: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }>>, z.ZodType<import("../ism/types.js").RoutingIsmConfig, z.ZodTypeDef, import("../ism/types.js").RoutingIsmConfig>, z.ZodType<import("../ism/types.js").AggregationIsmConfig, z.ZodTypeDef, import("../ism/types.js").AggregationIsmConfig>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
        bridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP_READ>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP_READ;
    }, {
        type: IsmType.CCIP_READ;
    }>]>>;
    foreignDeployment: z.ZodOptional<z.ZodString>;
    remoteRouters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>;
    destinationGas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    mailbox: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}>>, z.ZodObject<{
    contractVerificationStatus: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<[ContractVerificationStatus.Verified, ContractVerificationStatus.Unverified, ContractVerificationStatus.Error, ContractVerificationStatus.Skipped]>>>;
}, "strip", z.ZodTypeAny, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>;
export type WarpRouteDeployConfig = z.infer<typeof WarpRouteDeployConfigSchema>;
export declare const WarpRouteDeployConfigMailboxRequiredSchema: z.ZodIntersection<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.native, TokenType.nativeScaled]>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.collateral, TokenType.collateralVault, TokenType.collateralVaultRebase, TokenType.collateralFiat, TokenType.collateralUri]>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TokenType.XERC20, TokenType.XERC20Lockbox]>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    token: z.ZodString;
    xERC20: z.ZodOptional<z.ZodObject<{
        extraBridges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            lockbox: z.ZodString;
            limits: z.ZodObject<{
                bufferCap: z.ZodOptional<z.ZodString>;
                rateLimitPerSecond: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }, {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }, {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }>, "many">>;
        warpRouteLimits: z.ZodObject<{
            bufferCap: z.ZodOptional<z.ZodString>;
            rateLimitPerSecond: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }, {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }, {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}, {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodEnum<[TokenType.synthetic, TokenType.syntheticUri]>;
    initialSupply: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}, {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
}>, z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    decimals: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    scale: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isNft: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodLiteral<TokenType.syntheticRebase>;
    collateralChainName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}, {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}>]>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    gas: z.ZodOptional<z.ZodNumber>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    hook: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
        beneficiary: z.ZodString;
        oracleKey: z.ZodString;
        overhead: z.ZodRecord<z.ZodString, z.ZodNumber>;
        oracleConfig: z.ZodRecord<z.ZodString, z.ZodObject<{
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
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodType<import("../hook/types.js").DomainRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").DomainRoutingHookConfig>, z.ZodType<import("../hook/types.js").FallbackRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").FallbackRoutingHookConfig>, z.ZodType<import("../hook/types.js").AmountRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").AmountRoutingHookConfig>, z.ZodType<import("../hook/types.js").AggregationHookConfig, z.ZodTypeDef, import("../hook/types.js").AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>>;
    interchainSecurityModule: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TEST_ISM>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TEST_ISM;
    }, {
        type: IsmType.TEST_ISM;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.OP_STACK>;
        origin: z.ZodString;
        nativeBridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }, {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }>, z.ZodIntersection<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.PAUSABLE;
    }, {
        type: IsmType.PAUSABLE;
    }>>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
        relayer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }, {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP>;
        originChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP;
        originChain: string;
    }, {
        type: IsmType.CCIP;
        originChain: string;
    }>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodString, "many">;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: string[];
        threshold: number;
    }, {
        validators: string[];
        threshold: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }>>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodObject<{
            signingAddress: z.ZodString;
            weight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            signingAddress: string;
            weight: number;
        }, {
            signingAddress: string;
            weight: number;
        }>, "many">;
        thresholdWeight: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }, {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }>>, z.ZodType<import("../ism/types.js").RoutingIsmConfig, z.ZodTypeDef, import("../ism/types.js").RoutingIsmConfig>, z.ZodType<import("../ism/types.js").AggregationIsmConfig, z.ZodTypeDef, import("../ism/types.js").AggregationIsmConfig>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
        bridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }, {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmType.CCIP_READ>;
    }, "strip", z.ZodTypeAny, {
        type: IsmType.CCIP_READ;
    }, {
        type: IsmType.CCIP_READ;
    }>]>>;
    foreignDeployment: z.ZodOptional<z.ZodString>;
    remoteRouters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>;
    destinationGas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    mailbox: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}>>, z.ZodObject<{
    contractVerificationStatus: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<[ContractVerificationStatus.Verified, ContractVerificationStatus.Unverified, ContractVerificationStatus.Error, ContractVerificationStatus.Skipped]>>>;
}, "strip", z.ZodTypeAny, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}, {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>, Record<string, (({
    type: TokenType.native | TokenType.nativeScaled;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.collateral | TokenType.collateralVault | TokenType.collateralVaultRebase | TokenType.collateralFiat | TokenType.collateralUri;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
} | {
    type: TokenType.XERC20 | TokenType.XERC20Lockbox;
    token: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    xERC20?: {
        warpRouteLimits: {
            bufferCap?: string | undefined;
            rateLimitPerSecond?: string | undefined;
        };
        extraBridges?: {
            lockbox: string;
            limits: {
                bufferCap?: string | undefined;
                rateLimitPerSecond?: string | undefined;
            };
        }[] | undefined;
    } | undefined;
} | {
    type: TokenType.synthetic | TokenType.syntheticUri;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
    initialSupply?: string | number | undefined;
} | {
    type: TokenType.syntheticRebase;
    collateralChainName: string;
    symbol?: string | undefined;
    name?: string | undefined;
    decimals?: number | undefined;
    scale?: number | undefined;
    isNft?: boolean | undefined;
}) & {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
    gas?: number | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    hook?: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | undefined;
    interchainSecurityModule?: string | ({
        validators: string[];
        threshold: number;
    } & {
        type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: IsmType.PAUSABLE;
    }) | {
        type: IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: IsmType.CCIP;
        originChain: string;
    } | {
        type: IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | undefined;
    foreignDeployment?: string | undefined;
    remoteRouters?: Record<string, {
        address: string;
    }> | undefined;
    destinationGas?: Record<string, string> | undefined;
    mailbox?: string | undefined;
}) & {
    contractVerificationStatus?: Record<string, ContractVerificationStatus> | undefined;
}>>, z.ZodRecord<z.ZodString, z.ZodObject<{
    mailbox: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mailbox: string;
}, {
    mailbox: string;
}>>>;
export type WarpRouteDeployConfigMailboxRequired = z.infer<typeof WarpRouteDeployConfigMailboxRequiredSchema>;
export {};
//# sourceMappingURL=types.d.ts.map