import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address, ChainId, Domain, ProtocolType } from '@hyperlane-xyz/utils';
import { HyperlaneModule, HyperlaneModuleParams } from '../core/AbstractHyperlaneModule.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedCosmJsNativeTransaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';
import { CosmosNativeHookReader } from './CosmosNativeHookReader.js';
import { HookConfig, IgpHookConfig } from './types.js';
type HookModuleAddresses = {
    deployedHook: Address;
    mailbox: Address;
};
export declare class CosmosNativeHookModule extends HyperlaneModule<ProtocolType.CosmosNative, HookConfig, HookModuleAddresses> {
    protected readonly multiProvider: MultiProvider;
    protected readonly signer: SigningHyperlaneModuleClient;
    protected readonly logger: import("pino").default.Logger<never>;
    protected readonly reader: CosmosNativeHookReader;
    readonly chain: ChainName;
    readonly chainId: ChainId;
    readonly domainId: Domain;
    constructor(multiProvider: MultiProvider, params: HyperlaneModuleParams<HookConfig, HookModuleAddresses>, signer: SigningHyperlaneModuleClient);
    read(): Promise<HookConfig>;
    update(targetConfig: HookConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    static create({ chain, config, addresses, multiProvider, signer, }: {
        chain: ChainNameOrId;
        config: HookConfig;
        addresses: HookModuleAddresses;
        multiProvider: MultiProvider;
        signer: SigningHyperlaneModuleClient;
    }): Promise<CosmosNativeHookModule>;
    protected deploy({ config }: {
        config: HookConfig;
    }): Promise<Address>;
    protected deployIgpHook({ config, }: {
        config: IgpHookConfig;
    }): Promise<Address>;
    protected deployMerkleTreeHook(): Promise<Address>;
    protected deployNoopHook(): Promise<Address>;
}
export {};
//# sourceMappingURL=CosmosNativeHookModule.d.ts.map