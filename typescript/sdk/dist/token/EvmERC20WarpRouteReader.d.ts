import { Address } from '@hyperlane-xyz/utils';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { EvmHookReader } from '../hook/EvmHookReader.js';
import { EvmIsmReader } from '../ism/EvmIsmReader.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { DerivedMailboxClientConfig, DestinationGas, RemoteRouters } from '../router/types.js';
import { ChainName, ChainNameOrId, DeployedOwnableConfig } from '../types.js';
import { HyperlaneReader } from '../utils/HyperlaneReader.js';
import { TokenType } from './config.js';
import { DerivedTokenRouterConfig, HypTokenConfig, HypTokenRouterVirtualConfig, TokenMetadata, XERC20TokenMetadata } from './types.js';
export declare class EvmERC20WarpRouteReader extends HyperlaneReader {
    protected readonly multiProvider: MultiProvider;
    protected readonly chain: ChainNameOrId;
    protected readonly concurrency: number;
    protected readonly logger: import("pino").default.Logger<never>;
    protected readonly deriveTokenConfigMap: Record<TokenType, ((address: Address) => Promise<HypTokenConfig>) | null>;
    evmHookReader: EvmHookReader;
    evmIsmReader: EvmIsmReader;
    contractVerifier: ContractVerifier;
    constructor(multiProvider: MultiProvider, chain: ChainNameOrId, concurrency?: number, contractVerifier?: ContractVerifier);
    /**
     * Derives the configuration for a Hyperlane ERC20 router contract at the given address.
     *
     * @param warpRouteAddress - The address of the Hyperlane ERC20 router contract.
     * @returns The configuration for the Hyperlane ERC20 router.
     *
     */
    deriveWarpRouteConfig(warpRouteAddress: Address): Promise<DerivedTokenRouterConfig>;
    deriveWarpRouteVirtualConfig(chain: ChainName, address: Address): Promise<HypTokenRouterVirtualConfig>;
    /**
     * Derives the token type for a given Warp Route address using specific methods
     *
     * @param warpRouteAddress - The Warp Route address to derive the token type for.
     * @returns The derived token type, which can be one of: collateralVault, collateral, native, or synthetic.
     */
    deriveTokenType(warpRouteAddress: Address): Promise<TokenType>;
    /**
     * Fetches the base metadata for a Warp Route contract.
     *
     * @param routerAddress - The address of the Warp Route contract.
     * @returns The base metadata for the Warp Route contract, including the mailbox, owner, hook, and ism.
     */
    fetchMailboxClientConfig(routerAddress: Address): Promise<DerivedMailboxClientConfig>;
    fetchXERC20Config(xERC20Address: Address, warpRouteAddress: Address): Promise<XERC20TokenMetadata>;
    /**
     * Fetches the metadata for a token address.
     *
     * @param warpRouteAddress - The address of the token.
     * @returns A partial ERC20 metadata object containing the token name, symbol, total supply, and decimals.
     * Throws if unsupported token type
     */
    fetchTokenConfig(type: TokenType, warpRouteAddress: Address): Promise<HypTokenConfig>;
    private deriveHypXERC20TokenConfig;
    private deriveHypXERC20LockboxTokenConfig;
    private deriveHypCollateralTokenConfig;
    private deriveHypCollateralFiatTokenConfig;
    private deriveHypCollateralVaultTokenConfig;
    private deriveHypCollateralVaultRebaseTokenConfig;
    private deriveHypSyntheticTokenConfig;
    private deriveHypNativeTokenConfig;
    private deriveHypSyntheticRebaseConfig;
    fetchERC20Metadata(tokenAddress: Address): Promise<TokenMetadata>;
    fetchRemoteRouters(warpRouteAddress: Address): Promise<RemoteRouters>;
    fetchProxyAdminConfig(tokenAddress: Address): Promise<DeployedOwnableConfig>;
    fetchDestinationGas(warpRouteAddress: Address): Promise<DestinationGas>;
}
//# sourceMappingURL=EvmERC20WarpRouteReader.d.ts.map