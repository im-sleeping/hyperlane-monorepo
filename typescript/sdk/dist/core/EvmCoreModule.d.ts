import { Mailbox } from '@hyperlane-xyz/core';
import { Address, Domain, EvmChainId, ProtocolType } from '@hyperlane-xyz/utils';
import { HyperlaneAddresses } from '../contracts/types.js';
import { CoreConfig, DeployedCoreAddresses, DerivedCoreConfig } from '../core/types.js';
import { ProxyFactoryFactories } from '../deploy/contracts.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { DerivedIsmConfig, IsmConfig } from '../ism/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedEV5Transaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';
import { HyperlaneModule, HyperlaneModuleParams } from './AbstractHyperlaneModule.js';
import { EvmCoreReader } from './EvmCoreReader.js';
import { EvmIcaModule } from './EvmIcaModule.js';
import { HyperlaneCoreDeployer } from './HyperlaneCoreDeployer.js';
export declare class EvmCoreModule extends HyperlaneModule<ProtocolType.Ethereum, CoreConfig, DeployedCoreAddresses> {
    protected readonly multiProvider: MultiProvider;
    protected logger: import("pino").default.Logger<never>;
    protected coreReader: EvmCoreReader;
    protected evmIcaModule?: EvmIcaModule;
    readonly chainName: ChainName;
    readonly chainId: EvmChainId;
    readonly domainId: Domain;
    constructor(multiProvider: MultiProvider, args: HyperlaneModuleParams<CoreConfig, DeployedCoreAddresses>);
    /**
     * Reads the core configuration from the mailbox address specified in the SDK arguments.
     * @returns The core config.
     */
    read(): Promise<DerivedCoreConfig>;
    /**
     * Updates the core contracts with the provided configuration.
     *
     * @param expectedConfig - The configuration for the core contracts to be updated.
     * @returns An array of Ethereum transactions that were executed to update the contract.
     */
    update(expectedConfig: CoreConfig): Promise<AnnotatedEV5Transaction[]>;
    /**
     * Create a transaction to update an existing ISM config, or deploy a new ISM and return a tx to setDefaultIsm
     *
     * @param actualConfig - The on-chain router configuration, including the ISM configuration, and address.
     * @param expectedConfig - The expected token router configuration, including the ISM configuration.
     * @returns Transaction that need to be executed to update the ISM configuration.
     */
    createDefaultIsmUpdateTxs(actualConfig: DerivedCoreConfig, expectedConfig: CoreConfig): Promise<AnnotatedEV5Transaction[]>;
    /**
     * Updates or deploys the ISM using the provided configuration.
     *
     * @returns Object with deployedIsm address, and update Transactions
     */
    deployOrUpdateIsm(actualDefaultIsmConfig: DerivedIsmConfig, expectDefaultIsmConfig: IsmConfig): Promise<{
        deployedIsm: Address;
        ismUpdateTxs: AnnotatedEV5Transaction[];
    }>;
    /**
     * Create a transaction to transfer ownership of an existing mailbox with a given config.
     *
     * @param actualConfig - The on-chain core configuration.
     * @param expectedConfig - The expected token core configuration.
     * @returns Ethereum transaction that need to be executed to update the owner.
     */
    createMailboxOwnerUpdateTxs(actualConfig: DerivedCoreConfig, expectedConfig: CoreConfig): AnnotatedEV5Transaction[];
    /**
     * Deploys the Core contracts.
     * @remark Most of the contract owners is the Deployer with some being the Proxy Admin.
     * @returns The created EvmCoreModule instance.
     */
    static create(params: {
        chain: ChainNameOrId;
        config: CoreConfig;
        multiProvider: MultiProvider;
        contractVerifier?: ContractVerifier;
    }): Promise<EvmCoreModule>;
    /**
     * Deploys the core Hyperlane contracts.
     * @returns The deployed core contract addresses.
     */
    static deploy(params: {
        config: CoreConfig;
        multiProvider: MultiProvider;
        chain: ChainNameOrId;
        contractVerifier?: ContractVerifier;
    }): Promise<DeployedCoreAddresses>;
    /**
     * Deploys the ISM factories for a given chain.
     * @returns The deployed ISM factories addresses.
     */
    static deployIsmFactories(params: {
        chainName: string;
        config: CoreConfig;
        multiProvider: MultiProvider;
        contractVerifier?: ContractVerifier;
    }): Promise<HyperlaneAddresses<ProxyFactoryFactories>>;
    /**
     * Deploys a Mailbox and its default ISM, hook, and required hook contracts with a given configuration.
     * @returns The deployed Mailbox contract instance.
     */
    static deployMailbox(params: {
        config: CoreConfig;
        proxyAdmin: Address;
        coreDeployer: HyperlaneCoreDeployer;
        multiProvider: MultiProvider;
        chain: ChainNameOrId;
    }): Promise<Mailbox>;
    /**
     * Retrieves the ISM factory factories based on the provided technicalStack and parameters.
     *
     * @param technicalStack - The technicalStack to determine if static address set deployment should be skipped.
     * @param params - An object containing the parameters needed for ISM factory deployment.
     * @param params.chainName - The name of the chain for which the ISM factories are being deployed.
     * @param params.config - The core configuration to be used during deployment.
     * @param params.multiProvider - The multi-provider instance for interacting with the blockchain.
     * @param params.contractVerifier - An optional contract verifier for validating contracts during deployment.
     * @returns A promise that resolves to the addresses of the deployed ISM factory factories.
     */
    private static getIsmFactoryFactories;
}
//# sourceMappingURL=EvmCoreModule.d.ts.map