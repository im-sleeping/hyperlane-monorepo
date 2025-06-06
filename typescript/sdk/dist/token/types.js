import { z } from 'zod';
import { objMap } from '@hyperlane-xyz/utils';
import { HookType } from '../hook/types.js';
import { IsmType } from '../ism/types.js';
import { GasRouterConfigSchema, } from '../router/types.js';
import { isCompliant } from '../utils/schemas.js';
import { TokenType } from './config.js';
export const WarpRouteDeployConfigSchemaErrors = {
    ONLY_SYNTHETIC_REBASE: `Config with ${TokenType.collateralVaultRebase} must be deployed with ${TokenType.syntheticRebase}`,
    NO_SYNTHETIC_ONLY: `Config must include Native or Collateral OR all synthetics must define token metadata`,
};
export const TokenMetadataSchema = z.object({
    name: z.string(),
    symbol: z.string(),
    decimals: z.number().optional(),
    scale: z.number().optional(),
    isNft: z.boolean().optional(),
});
export const isTokenMetadata = isCompliant(TokenMetadataSchema);
export const NativeTokenConfigSchema = TokenMetadataSchema.partial().extend({
    type: z.enum([TokenType.native, TokenType.nativeScaled]),
});
export const isNativeTokenConfig = isCompliant(NativeTokenConfigSchema);
export const CollateralTokenConfigSchema = TokenMetadataSchema.partial().extend({
    type: z.enum([
        TokenType.collateral,
        TokenType.collateralVault,
        TokenType.collateralVaultRebase,
        TokenType.collateralFiat,
        TokenType.collateralUri,
    ]),
    token: z
        .string()
        .describe('Existing token address to extend with Warp Route functionality'),
});
export const isCollateralTokenConfig = isCompliant(CollateralTokenConfigSchema);
const xERC20LimitConfigSchema = z.object({
    bufferCap: z.string().optional(),
    rateLimitPerSecond: z.string().optional(),
});
const xERC20ExtraBridgesLimitConfigsSchema = z.object({
    lockbox: z.string(),
    limits: xERC20LimitConfigSchema,
});
const xERC20TokenMetadataSchema = z.object({
    xERC20: z
        .object({
        extraBridges: z.array(xERC20ExtraBridgesLimitConfigsSchema).optional(),
        warpRouteLimits: xERC20LimitConfigSchema,
    })
        .optional(),
});
export const XERC20TokenConfigSchema = CollateralTokenConfigSchema.merge(z.object({
    type: z.enum([TokenType.XERC20, TokenType.XERC20Lockbox]),
})).merge(xERC20TokenMetadataSchema);
export const isXERC20TokenConfig = isCompliant(XERC20TokenConfigSchema);
export const CollateralRebaseTokenConfigSchema = TokenMetadataSchema.partial().extend({
    type: z.literal(TokenType.collateralVaultRebase),
});
export const isCollateralRebaseTokenConfig = isCompliant(CollateralRebaseTokenConfigSchema);
export const SyntheticTokenConfigSchema = TokenMetadataSchema.partial().extend({
    type: z.enum([TokenType.synthetic, TokenType.syntheticUri]),
    initialSupply: z.string().or(z.number()).optional(),
});
export const isSyntheticTokenConfig = isCompliant(SyntheticTokenConfigSchema);
export const SyntheticRebaseTokenConfigSchema = TokenMetadataSchema.partial().extend({
    type: z.literal(TokenType.syntheticRebase),
    collateralChainName: z.string(),
});
export const isSyntheticRebaseTokenConfig = isCompliant(SyntheticRebaseTokenConfigSchema);
export var ContractVerificationStatus;
(function (ContractVerificationStatus) {
    ContractVerificationStatus["Verified"] = "verified";
    ContractVerificationStatus["Unverified"] = "unverified";
    ContractVerificationStatus["Error"] = "error";
    ContractVerificationStatus["Skipped"] = "skipped";
})(ContractVerificationStatus || (ContractVerificationStatus = {}));
export const HypTokenRouterVirtualConfigSchema = z.object({
    contractVerificationStatus: z.record(z.enum([
        ContractVerificationStatus.Verified,
        ContractVerificationStatus.Unverified,
        ContractVerificationStatus.Error,
        ContractVerificationStatus.Skipped,
    ])),
});
/**
 * @remarks
 * The discriminatedUnion is basically a switch statement for zod schemas
 * It uses the 'type' key to pick from the array of schemas to validate
 */
export const HypTokenConfigSchema = z.discriminatedUnion('type', [
    NativeTokenConfigSchema,
    CollateralTokenConfigSchema,
    XERC20TokenConfigSchema,
    SyntheticTokenConfigSchema,
    SyntheticRebaseTokenConfigSchema,
]);
export const HypTokenRouterConfigSchema = HypTokenConfigSchema.and(GasRouterConfigSchema).and(HypTokenRouterVirtualConfigSchema.partial());
export function derivedHookAddress(config) {
    return typeof config.hook === 'string' ? config.hook : config.hook.address;
}
export function derivedIsmAddress(config) {
    return typeof config.interchainSecurityModule === 'string'
        ? config.interchainSecurityModule
        : config.interchainSecurityModule.address;
}
export const HypTokenRouterConfigMailboxOptionalSchema = HypTokenConfigSchema.and(GasRouterConfigSchema.extend({
    mailbox: z.string().optional(),
})).and(HypTokenRouterVirtualConfigSchema.partial());
export const WarpRouteDeployConfigSchema = z
    .record(HypTokenRouterConfigMailboxOptionalSchema)
    .refine((configMap) => {
    const entries = Object.entries(configMap);
    return (entries.some(([_, config]) => isCollateralTokenConfig(config) ||
        isCollateralRebaseTokenConfig(config) ||
        isXERC20TokenConfig(config) ||
        isNativeTokenConfig(config)) || entries.every(([_, config]) => isTokenMetadata(config)));
}, WarpRouteDeployConfigSchemaErrors.NO_SYNTHETIC_ONLY)
    // Verify synthetic rebase tokens config
    .transform((warpRouteDeployConfig, ctx) => {
    const collateralRebaseEntry = Object.entries(warpRouteDeployConfig).find(([_, config]) => isCollateralRebaseTokenConfig(config));
    const syntheticRebaseEntry = Object.entries(warpRouteDeployConfig).find(([_, config]) => isSyntheticRebaseTokenConfig(config));
    // Require both collateral rebase and synthetic rebase to be present in the config
    if (!collateralRebaseEntry && !syntheticRebaseEntry) {
        //  Pass through for other token types
        return warpRouteDeployConfig;
    }
    if (collateralRebaseEntry &&
        isCollateralRebasePairedCorrectly(warpRouteDeployConfig)) {
        const collateralChainName = collateralRebaseEntry[0];
        return objMap(warpRouteDeployConfig, (_, config) => {
            if (config.type === TokenType.syntheticRebase)
                config.collateralChainName = collateralChainName;
            return config;
        });
    }
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: WarpRouteDeployConfigSchemaErrors.ONLY_SYNTHETIC_REBASE,
    });
    return z.NEVER; // Causes schema validation to throw with above issue
})
    // Verify that CCIP hooks are paired with CCIP ISMs
    .transform((warpRouteDeployConfig, ctx) => {
    const { ccipHookMap, ccipIsmMap } = getCCIPConfigMaps(warpRouteDeployConfig);
    // Check hooks have corresponding ISMs
    const hookConfigHasMissingIsms = Object.entries(ccipHookMap).some(([originChain, destinationChains]) => Array.from(destinationChains).some((chain) => {
        if (!ccipIsmMap[originChain]?.has(chain)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [chain, 'interchainSecurityModule', '...'],
                message: `Required CCIP ISM not found in config for CCIP Hook with origin chain ${originChain} and destination chain ${chain}`,
            });
            return true;
        }
        return false;
    }));
    // Check ISMs have corresponding hooks
    const ismConfigHasMissingHooks = Object.entries(ccipIsmMap).some(([originChain, destinationChains]) => Array.from(destinationChains).some((chain) => {
        if (!ccipHookMap[originChain]?.has(chain)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [originChain, 'hook', '...'],
                message: `Required CCIP Hook not found in config for CCIP ISM with origin chain ${originChain} and destination chain ${chain}`,
            });
            return true;
        }
        return false;
    }));
    return hookConfigHasMissingIsms || ismConfigHasMissingHooks
        ? z.NEVER
        : warpRouteDeployConfig;
});
const _RequiredMailboxSchema = z.record(z.object({
    mailbox: z.string(),
}));
export const WarpRouteDeployConfigMailboxRequiredSchema = WarpRouteDeployConfigSchema.and(_RequiredMailboxSchema);
function isCollateralRebasePairedCorrectly(warpRouteDeployConfig) {
    // Filter out all the non-collateral rebase configs to check if they are only synthetic rebase tokens
    const otherConfigs = Object.entries(warpRouteDeployConfig).filter(([_, config]) => !isCollateralRebaseTokenConfig(config));
    if (otherConfigs.length === 0)
        return false;
    // The other configs MUST be synthetic rebase
    const allOthersSynthetic = otherConfigs.every(([_, config], _index) => isSyntheticRebaseTokenConfig(config));
    return allOthersSynthetic;
}
function getCCIPConfigMaps(warpRouteDeployConfig) {
    const ccipHookMap = {};
    const ccipIsmMap = {};
    Object.entries(warpRouteDeployConfig).forEach(([chainName, config]) => {
        extractCCIPHookMap(chainName, config.hook, ccipHookMap);
        extractCCIPIsmMap(chainName, config.interchainSecurityModule, ccipIsmMap);
    });
    return { ccipHookMap, ccipIsmMap };
}
function extractCCIPHookMap(currentChain, hookConfig, existsCCIPHookMap) {
    if (!hookConfig || typeof hookConfig === 'string') {
        return;
    }
    switch (hookConfig.type) {
        case HookType.AGGREGATION:
            hookConfig.hooks.forEach((hook) => extractCCIPHookMap(currentChain, hook, existsCCIPHookMap));
            break;
        case HookType.ARB_L2_TO_L1:
            extractCCIPHookMap(currentChain, hookConfig.childHook, existsCCIPHookMap);
            break;
        case HookType.CCIP:
            if (!existsCCIPHookMap[currentChain]) {
                existsCCIPHookMap[currentChain] = new Set();
            }
            existsCCIPHookMap[currentChain].add(hookConfig.destinationChain);
            break;
        case HookType.FALLBACK_ROUTING:
        case HookType.ROUTING:
            Object.entries(hookConfig.domains).forEach(([_, hook]) => {
                extractCCIPHookMap(currentChain, hook, existsCCIPHookMap);
            });
            break;
        default:
            break;
    }
}
function extractCCIPIsmMap(currentChain, ismConfig, existsCCIPIsmMap) {
    if (!ismConfig || typeof ismConfig === 'string') {
        return;
    }
    switch (ismConfig.type) {
        case IsmType.AGGREGATION:
        case IsmType.STORAGE_AGGREGATION:
            ismConfig.modules.forEach((hook) => extractCCIPIsmMap(currentChain, hook, existsCCIPIsmMap));
            break;
        case IsmType.CCIP:
            if (!existsCCIPIsmMap[ismConfig.originChain]) {
                existsCCIPIsmMap[ismConfig.originChain] = new Set();
            }
            existsCCIPIsmMap[ismConfig.originChain].add(currentChain);
            break;
        case IsmType.FALLBACK_ROUTING:
        case IsmType.ROUTING:
            Object.entries(ismConfig.domains).forEach(([_, hook]) => {
                extractCCIPIsmMap(currentChain, hook, existsCCIPIsmMap);
            });
            break;
        default:
            break;
    }
}
//# sourceMappingURL=types.js.map