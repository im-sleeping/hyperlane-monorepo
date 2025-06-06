import { Domain, EvmChainId, ProtocolType } from '@hyperlane-xyz/utils';
import { HyperlaneAddresses } from '../contracts/types.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { EvmIcaRouterReader } from '../ica/EvmIcaReader.js';
import { DerivedIcaRouterConfig } from '../ica/types.js';
import { InterchainAccountFactories } from '../middleware/account/contracts.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedEV5Transaction } from '../providers/ProviderType.js';
import { ProxiedRouterConfig } from '../router/types.js';
import { ChainNameOrId } from '../types.js';
import { HyperlaneModule, HyperlaneModuleParams } from './AbstractHyperlaneModule.js';
export type InterchainAccountConfig = ProxiedRouterConfig & Partial<Pick<DerivedIcaRouterConfig, 'remoteIcaRouters'>>;
export declare class EvmIcaModule extends HyperlaneModule<ProtocolType.Ethereum, InterchainAccountConfig, HyperlaneAddresses<InterchainAccountFactories>> {
    protected readonly multiProvider: MultiProvider;
    protected logger: import("pino").default.Logger<never>;
    protected icaRouterReader: EvmIcaRouterReader;
    readonly domainId: Domain;
    readonly chainId: EvmChainId;
    constructor(multiProvider: MultiProvider, args: HyperlaneModuleParams<InterchainAccountConfig, HyperlaneAddresses<InterchainAccountFactories>>);
    read(): Promise<DerivedIcaRouterConfig>;
    update(expectedConfig: InterchainAccountConfig): Promise<AnnotatedEV5Transaction[]>;
    private updateRemoteRoutersEnrollment;
    private getEnrollRemoteIcaRoutersTxs;
    private getUnenrollRemoteIcaRoutersTxs;
    /**
     * Creates a new EvmIcaModule instance by deploying an ICA with an ICA ISM.
     *
     * @param chain - The chain on which to deploy the ICA.
     * @param config - The configuration for the ICA.
     * @param multiProvider - The MultiProvider instance to use for deployment.
     * @returns {Promise<EvmIcaModule>} - A new EvmIcaModule instance.
     */
    static create({ chain, config, multiProvider, contractVerifier, }: {
        chain: ChainNameOrId;
        config: InterchainAccountConfig;
        multiProvider: MultiProvider;
        contractVerifier?: ContractVerifier;
    }): Promise<EvmIcaModule>;
}
//# sourceMappingURL=EvmIcaModule.d.ts.map