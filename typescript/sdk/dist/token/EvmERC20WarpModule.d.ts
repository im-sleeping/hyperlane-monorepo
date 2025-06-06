import { Address, Domain, EvmChainId, ProtocolType } from '@hyperlane-xyz/utils';
import { CCIPContractCache } from '../ccip/utils.js';
import { HyperlaneAddresses } from '../contracts/types.js';
import { HyperlaneModule, HyperlaneModuleParams } from '../core/AbstractHyperlaneModule.js';
import { ProxyFactoryFactories } from '../deploy/contracts.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedEV5Transaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';
import { EvmERC20WarpRouteReader } from './EvmERC20WarpRouteReader.js';
import { DerivedTokenRouterConfig, HypTokenRouterConfig } from './types.js';
type WarpRouteAddresses = HyperlaneAddresses<ProxyFactoryFactories> & {
    deployedTokenRoute: Address;
};
export declare class EvmERC20WarpModule extends HyperlaneModule<ProtocolType.Ethereum, HypTokenRouterConfig, WarpRouteAddresses> {
    protected readonly multiProvider: MultiProvider;
    protected readonly ccipContractCache?: CCIPContractCache | undefined;
    protected readonly contractVerifier?: ContractVerifier | undefined;
    protected logger: import("pino").default.Logger<never>;
    reader: EvmERC20WarpRouteReader;
    readonly chainName: ChainName;
    readonly chainId: EvmChainId;
    readonly domainId: Domain;
    constructor(multiProvider: MultiProvider, args: HyperlaneModuleParams<HypTokenRouterConfig, WarpRouteAddresses>, ccipContractCache?: CCIPContractCache | undefined, contractVerifier?: ContractVerifier | undefined);
    /**
     * Retrieves the token router configuration for the specified address.
     *
     * @param address - The address to derive the token router configuration from.
     * @returns A promise that resolves to the token router configuration.
     */
    read(): Promise<DerivedTokenRouterConfig>;
    /**
     * Updates the Warp Route contract with the provided configuration.
     *
     * @param expectedConfig - The configuration for the token router to be updated.
     * @returns An array of Ethereum transactions that were executed to update the contract, or an error if the update failed.
     */
    update(expectedConfig: HypTokenRouterConfig): Promise<AnnotatedEV5Transaction[]>;
    /**
     * Create a transaction to update the remote routers for the Warp Route contract.
     *
     * @param actualConfig - The on-chain router configuration, including the remoteRouters array.
     * @param expectedConfig - The expected token router configuration.
     * @returns A array with a single Ethereum transaction that need to be executed to enroll the routers
     */
    createEnrollRemoteRoutersUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): AnnotatedEV5Transaction[];
    createUnenrollRemoteRoutersUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): AnnotatedEV5Transaction[];
    /**
     * Create a transaction to update the remote routers for the Warp Route contract.
     *
     * @param actualConfig - The on-chain router configuration, including the remoteRouters array.
     * @param expectedConfig - The expected token router configuration.
     * @returns A array with a single Ethereum transaction that need to be executed to enroll the routers
     */
    createSetDestinationGasUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): AnnotatedEV5Transaction[];
    /**
     * Create transactions to update an existing ISM config, or deploy a new ISM and return a tx to setInterchainSecurityModule
     *
     * @param actualConfig - The on-chain router configuration, including the ISM configuration, and address.
     * @param expectedConfig - The expected token router configuration, including the ISM configuration.
     * @returns Ethereum transaction that need to be executed to update the ISM configuration.
     */
    createIsmUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): Promise<AnnotatedEV5Transaction[]>;
    createHookUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): Promise<AnnotatedEV5Transaction[]>;
    /**
     * Transfer ownership of an existing Warp route with a given config.
     *
     * @param actualConfig - The on-chain router configuration.
     * @param expectedConfig - The expected token router configuration.
     * @returns Ethereum transaction that need to be executed to update the owner.
     */
    createOwnershipUpdateTxs(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): AnnotatedEV5Transaction[];
    /**
     * Updates or deploys the ISM using the provided configuration.
     *
     * @returns Object with deployedIsm address, and update Transactions
     */
    deployOrUpdateIsm(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): Promise<{
        deployedIsm: Address;
        updateTransactions: AnnotatedEV5Transaction[];
    }>;
    /**
     * Updates or deploys the hook using the provided configuration.
     *
     * @returns Object with deployedHook address, and update Transactions
     */
    deployOrUpdateHook(actualConfig: DerivedTokenRouterConfig, expectedConfig: HypTokenRouterConfig): Promise<{
        deployedHook: Address;
        updateTransactions: AnnotatedEV5Transaction[];
    }>;
    deployNewHook(expectedConfig: HypTokenRouterConfig): Promise<{
        deployedHook: Address;
        updateTransactions: AnnotatedEV5Transaction[];
    }>;
    updateExistingHook(expectedConfig: HypTokenRouterConfig, actualConfig: DerivedTokenRouterConfig): Promise<{
        deployedHook: Address;
        updateTransactions: AnnotatedEV5Transaction[];
    }>;
    /**
     * Deploys the Warp Route.
     *
     * @param chain - The chain to deploy the module on.
     * @param config - The configuration for the token router.
     * @param multiProvider - The multi-provider instance to use.
     * @returns A new instance of the EvmERC20WarpHyperlaneModule.
     */
    static create(params: {
        chain: ChainNameOrId;
        config: HypTokenRouterConfig;
        multiProvider: MultiProvider;
        ccipContractCache?: CCIPContractCache;
        contractVerifier?: ContractVerifier;
        proxyFactoryFactories: HyperlaneAddresses<ProxyFactoryFactories>;
    }): Promise<EvmERC20WarpModule>;
}
export {};
//# sourceMappingURL=EvmERC20WarpModule.d.ts.map