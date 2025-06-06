import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { DeployedCoreAddresses, HookConfig } from '@hyperlane-xyz/sdk';
import { Address, ChainId, Domain, ProtocolType } from '@hyperlane-xyz/utils';
import { DerivedHookConfig } from '../hook/types.js';
import { DerivedIsmConfig, IsmConfig } from '../ism/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedCosmJsNativeTransaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';
import { HyperlaneModule, HyperlaneModuleParams } from './AbstractHyperlaneModule.js';
import { CosmosNativeCoreReader } from './CosmosNativeCoreReader.js';
import { CoreConfig, DerivedCoreConfig } from './types.js';
export declare class CosmosNativeCoreModule extends HyperlaneModule<ProtocolType.CosmosNative, CoreConfig, Record<string, string>> {
    protected readonly multiProvider: MultiProvider;
    protected readonly signer: SigningHyperlaneModuleClient;
    protected logger: import("pino").default.Logger<never>;
    protected coreReader: CosmosNativeCoreReader;
    readonly chainName: ChainName;
    readonly chainId: ChainId;
    readonly domainId: Domain;
    constructor(multiProvider: MultiProvider, signer: SigningHyperlaneModuleClient, args: HyperlaneModuleParams<CoreConfig, Record<string, string>>);
    /**
     * Reads the core configuration from the mailbox address
     * @returns The core config.
     */
    read(): Promise<DerivedCoreConfig>;
    /**
     * Deploys the Core contracts.
     * @returns The created CosmosNativeCoreModule instance.
     */
    static create(params: {
        chain: ChainNameOrId;
        config: CoreConfig;
        multiProvider: MultiProvider;
        signer: SigningHyperlaneModuleClient;
    }): Promise<CosmosNativeCoreModule>;
    /**
     * Deploys the core Hyperlane contracts.
     * @returns The deployed core contract addresses.
     */
    static deploy(params: {
        config: CoreConfig;
        multiProvider: MultiProvider;
        chain: ChainNameOrId;
        signer: SigningHyperlaneModuleClient;
    }): Promise<DeployedCoreAddresses>;
    /**
     * Updates the core contracts with the provided configuration.
     *
     * @param expectedConfig - The configuration for the core contracts to be updated.
     * @returns An array of Cosmos transactions that were executed to update the contract.
     */
    update(expectedConfig: CoreConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    private createMailboxOwnerUpdateTxs;
    /**
     * Create a transaction to update an existing ISM config, or deploy a new ISM and return a tx to setDefaultIsm
     *
     * @param actualConfig - The on-chain router configuration, including the ISM configuration, and address.
     * @param expectedConfig - The expected token router configuration, including the ISM configuration.
     * @returns Transaction that need to be executed to update the ISM configuration.
     */
    createDefaultIsmUpdateTxs(actualConfig: DerivedCoreConfig, expectedConfig: CoreConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    /**
     * Updates or deploys the ISM using the provided configuration.
     *
     * @returns Object with deployedIsm address, and update Transactions
     */
    deployOrUpdateIsm(actualDefaultIsmConfig: DerivedIsmConfig, expectDefaultIsmConfig: IsmConfig): Promise<{
        deployedIsm: Address;
        ismUpdateTxs: AnnotatedCosmJsNativeTransaction[];
    }>;
    /**
     * Create a transaction to update an existing Hook config, or deploy a new Hook and return a tx to setDefaultHook
     *
     * @param actualConfig - The on-chain router configuration, including the Hook configuration, and address.
     * @param expectedConfig - The expected token router configuration, including the Hook configuration.
     * @returns Transaction that need to be executed to update the Hook configuration.
     */
    createDefaultHookUpdateTxs(actualConfig: DerivedCoreConfig, expectedConfig: CoreConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    /**
     * Create a transaction to update an existing Hook config, or deploy a new Hook and return a tx to setRequiredHook
     *
     * @param actualConfig - The on-chain router configuration, including the Hook configuration, and address.
     * @param expectedConfig - The expected token router configuration, including the Hook configuration.
     * @returns Transaction that need to be executed to update the Hook configuration.
     */
    createRequiredHookUpdateTxs(actualConfig: DerivedCoreConfig, expectedConfig: CoreConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    /**
     * Updates or deploys the Hook using the provided configuration.
     *
     * @returns Object with deployedHook address, and update Transactions
     */
    deployOrUpdateHook(actualHookConfig: DerivedHookConfig, expectHookConfig: HookConfig): Promise<{
        deployedHook: Address;
        hookUpdateTxs: AnnotatedCosmJsNativeTransaction[];
    }>;
}
//# sourceMappingURL=CosmosNativeCoreModule.d.ts.map