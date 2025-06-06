import { Logger } from 'pino';
import { SigningHyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { Address, ChainId, Domain, ProtocolType } from '@hyperlane-xyz/utils';
import { HyperlaneModule, HyperlaneModuleParams } from '../core/AbstractHyperlaneModule.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { AnnotatedCosmJsNativeTransaction } from '../providers/ProviderType.js';
import { ChainName, ChainNameOrId } from '../types.js';
import { CosmosNativeIsmReader } from './CosmosNativeIsmReader.js';
import { DomainRoutingIsmConfig, IsmConfig, MultisigIsmConfig } from './types.js';
type IsmModuleAddresses = {
    deployedIsm: Address;
    mailbox: Address;
};
export declare class CosmosNativeIsmModule extends HyperlaneModule<ProtocolType.CosmosNative, IsmConfig, IsmModuleAddresses> {
    protected readonly multiProvider: MultiProvider;
    protected readonly signer: SigningHyperlaneModuleClient;
    protected readonly logger: import("pino").default.Logger<never>;
    protected readonly reader: CosmosNativeIsmReader;
    protected readonly mailbox: Address;
    readonly chain: ChainName;
    readonly chainId: ChainId;
    readonly domainId: Domain;
    constructor(multiProvider: MultiProvider, params: HyperlaneModuleParams<IsmConfig, IsmModuleAddresses>, signer: SigningHyperlaneModuleClient);
    read(): Promise<IsmConfig>;
    update(expectedConfig: IsmConfig): Promise<AnnotatedCosmJsNativeTransaction[]>;
    static create({ chain, config, addresses, multiProvider, signer, }: {
        chain: ChainNameOrId;
        config: IsmConfig;
        addresses: IsmModuleAddresses;
        multiProvider: MultiProvider;
        signer: SigningHyperlaneModuleClient;
    }): Promise<CosmosNativeIsmModule>;
    protected deploy({ config }: {
        config: IsmConfig;
    }): Promise<Address>;
    protected deployMerkleRootMultisigIsm(config: MultisigIsmConfig): Promise<Address>;
    protected deployMessageIdMultisigIsm(config: MultisigIsmConfig): Promise<Address>;
    protected deployRoutingIsm(config: DomainRoutingIsmConfig): Promise<Address>;
    protected updateRoutingIsm({ actual, expected, logger, }: {
        actual: DomainRoutingIsmConfig;
        expected: DomainRoutingIsmConfig;
        logger: Logger;
    }): Promise<AnnotatedCosmJsNativeTransaction[]>;
    protected deployNoopIsm(): Promise<Address>;
}
export {};
//# sourceMappingURL=CosmosNativeIsmModule.d.ts.map