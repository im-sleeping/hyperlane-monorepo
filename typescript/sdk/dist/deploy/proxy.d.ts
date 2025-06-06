import { ethers } from 'ethers';
import { Provider as ZKSyncProvider } from 'zksync-ethers';
import { Address, ChainId } from '@hyperlane-xyz/utils';
import { AnnotatedEV5Transaction } from '../providers/ProviderType.js';
import { DeployedOwnableConfig } from '../types.js';
type EthersLikeProvider = ethers.providers.Provider | ZKSyncProvider;
export type UpgradeConfig = {
    timelock: {
        delay: number;
        roles: {
            executor: Address;
            proposer: Address;
        };
    };
};
export declare function proxyImplementation(provider: EthersLikeProvider, proxy: Address): Promise<Address>;
export declare function isInitialized(provider: EthersLikeProvider, contract: Address): Promise<boolean>;
export declare function proxyAdmin(provider: EthersLikeProvider, proxy: Address): Promise<Address>;
export declare function proxyConstructorArgs<C extends ethers.Contract>(implementation: C, proxyAdmin: string, initializeArgs?: Parameters<C['initialize']>): [string, string, string];
export declare function isProxy(provider: EthersLikeProvider, proxy: Address): Promise<boolean>;
export declare function proxyAdminUpdateTxs(chainId: ChainId, proxyAddress: Address, actualConfig: Readonly<{
    owner: string;
    proxyAdmin?: DeployedOwnableConfig;
}>, expectedConfig: Readonly<{
    owner: string;
    proxyAdmin?: DeployedOwnableConfig;
}>): AnnotatedEV5Transaction[];
export {};
//# sourceMappingURL=proxy.d.ts.map