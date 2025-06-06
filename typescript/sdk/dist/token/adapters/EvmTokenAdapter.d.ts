/// <reference types="node" resolution-mode="require"/>
import { PopulatedTransaction } from 'ethers';
import { ERC20, HypERC20, HypERC20Collateral, HypERC4626, HypERC4626Collateral, HypXERC20, HypXERC20Lockbox, IXERC20, IXERC20VS } from '@hyperlane-xyz/core';
import { Address, Domain, Numberish } from '@hyperlane-xyz/utils';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainName } from '../../types.js';
import { TokenMetadata } from '../types.js';
import { IHypTokenAdapter, IHypVSXERC20Adapter, IHypXERC20Adapter, ITokenAdapter, IXERC20VSAdapter, InterchainGasQuote, RateLimitMidPoint, TransferParams, TransferRemoteParams } from './ITokenAdapter.js';
export declare const EVM_TRANSFER_REMOTE_GAS_ESTIMATE = 450000n;
export declare class EvmNativeTokenAdapter extends BaseEvmAdapter implements ITokenAdapter<PopulatedTransaction> {
    getBalance(address: Address): Promise<bigint>;
    getMetadata(): Promise<TokenMetadata>;
    getMinimumTransferAmount(_recipient: Address): Promise<bigint>;
    isApproveRequired(_owner: Address, _spender: Address, _weiAmountOrId: Numberish): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    populateApproveTx(_params: TransferParams): Promise<PopulatedTransaction>;
    populateTransferTx({ weiAmountOrId, recipient, }: TransferParams): Promise<PopulatedTransaction>;
    getTotalSupply(): Promise<bigint | undefined>;
}
export declare class EvmTokenAdapter<T extends ERC20 = ERC20> extends EvmNativeTokenAdapter implements ITokenAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    readonly contractFactory: any;
    readonly contract: T;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    }, contractFactory?: any);
    getBalance(address: Address): Promise<bigint>;
    getMetadata(isNft?: boolean): Promise<TokenMetadata>;
    isApproveRequired(owner: Address, spender: Address, weiAmountOrId: Numberish): Promise<boolean>;
    isRevokeApprovalRequired(owner: Address, spender: Address): Promise<boolean>;
    populateApproveTx({ weiAmountOrId, recipient, }: TransferParams): Promise<PopulatedTransaction>;
    populateTransferTx({ weiAmountOrId, recipient, }: TransferParams): Promise<PopulatedTransaction>;
    getTotalSupply(): Promise<bigint>;
}
export declare class EvmHypSyntheticAdapter extends EvmTokenAdapter<HypERC20> implements IHypTokenAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    readonly contractFactory: any;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    }, contractFactory?: any);
    isApproveRequired(_owner: Address, _spender: Address, _weiAmountOrId: Numberish): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    getDomains(): Promise<Domain[]>;
    getRouterAddress(domain: Domain): Promise<Buffer>;
    getAllRouters(): Promise<Array<{
        domain: Domain;
        address: Buffer;
    }>>;
    getBridgedSupply(): Promise<bigint | undefined>;
    quoteTransferRemoteGas(destination: Domain): Promise<InterchainGasQuote>;
    populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }: TransferRemoteParams): Promise<PopulatedTransaction>;
}
export declare class EvmHypCollateralAdapter extends EvmHypSyntheticAdapter implements IHypTokenAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    readonly collateralContract: HypERC20Collateral;
    protected wrappedTokenAddress?: Address;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    protected getWrappedTokenAddress(): Promise<Address>;
    protected getWrappedTokenAdapter(): Promise<EvmTokenAdapter>;
    getBridgedSupply(): Promise<bigint | undefined>;
    getMetadata(isNft?: boolean): Promise<TokenMetadata>;
    isApproveRequired(owner: Address, spender: Address, weiAmountOrId: Numberish): Promise<boolean>;
    isRevokeApprovalRequired(owner: Address, spender: Address): Promise<boolean>;
    populateApproveTx(params: TransferParams): Promise<PopulatedTransaction>;
    populateTransferTx(params: TransferParams): Promise<PopulatedTransaction>;
}
export declare class EvmHypCollateralFiatAdapter extends EvmHypCollateralAdapter implements IHypTokenAdapter<PopulatedTransaction> {
    /**
     * Note this may be inaccurate, as this returns the total supply
     * of the fiat token, which may be used by other bridges.
     * However this is the best we can do with a simple view call.
     */
    getBridgedSupply(): Promise<bigint>;
}
export declare class EvmHypRebaseCollateralAdapter extends EvmHypCollateralAdapter implements IHypTokenAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    collateralContract: HypERC4626Collateral;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    getBridgedSupply(): Promise<bigint>;
}
export declare class EvmHypSyntheticRebaseAdapter extends EvmHypSyntheticAdapter implements IHypTokenAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    contract: HypERC4626;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    getBridgedSupply(): Promise<bigint>;
}
declare abstract class BaseEvmHypXERC20Adapter<X extends IXERC20 | IXERC20VS> extends EvmHypCollateralAdapter implements IHypXERC20Adapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    readonly hypXERC20: HypXERC20;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    protected abstract connectXERC20(xerc20Addr: Address): X;
    getXERC20(): Promise<X>;
    getBridgedSupply(): Promise<bigint>;
    getMintLimit(): Promise<bigint>;
    getMintMaxLimit(): Promise<bigint>;
    getBurnLimit(): Promise<bigint>;
    getBurnMaxLimit(): Promise<bigint>;
}
declare abstract class BaseEvmHypXERC20LockboxAdapter<X extends IXERC20 | IXERC20VS> extends EvmHypCollateralAdapter implements IHypXERC20Adapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    protected readonly hypXERC20Lockbox: HypXERC20Lockbox;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    /**
     * Note this may be inaccurate, as this returns the balance
     * of the lockbox contract, which may be used by other bridges.
     * However this is the best we can do with a simple view call.
     */
    getBridgedSupply(): Promise<bigint>;
    getXERC20(): Promise<X>;
    protected abstract connectXERC20(xERC20Addr: Address): X;
    getMintLimit(): Promise<bigint>;
    getMintMaxLimit(): Promise<bigint>;
    getBurnLimit(): Promise<bigint>;
    getBurnMaxLimit(): Promise<bigint>;
}
export declare class EvmHypXERC20LockboxAdapter extends BaseEvmHypXERC20LockboxAdapter<IXERC20> {
    protected connectXERC20(xERC20Addr: Address): IXERC20;
}
export declare class EvmHypVSXERC20LockboxAdapter extends BaseEvmHypXERC20LockboxAdapter<IXERC20VS> implements IHypVSXERC20Adapter<PopulatedTransaction> {
    protected connectXERC20(xERC20Addr: Address): IXERC20VS;
    getRateLimits(): Promise<RateLimitMidPoint>;
    populateSetBufferCapTx(newBufferCap: bigint): Promise<PopulatedTransaction>;
    populateSetRateLimitPerSecondTx(newRateLimitPerSecond: bigint): Promise<PopulatedTransaction>;
    populateAddBridgeTx(bufferCap: bigint, rateLimitPerSecond: bigint): Promise<PopulatedTransaction>;
}
export declare class EvmHypXERC20Adapter extends BaseEvmHypXERC20Adapter<IXERC20> {
    protected connectXERC20(xerc20Addr: string): IXERC20;
}
export declare class EvmHypVSXERC20Adapter extends BaseEvmHypXERC20Adapter<IXERC20VS> implements IHypVSXERC20Adapter<PopulatedTransaction> {
    protected connectXERC20(xerc20Addr: string): IXERC20VS;
    getRateLimits(): Promise<RateLimitMidPoint>;
    populateSetBufferCapTx(newBufferCap: bigint): Promise<PopulatedTransaction>;
    populateSetRateLimitPerSecondTx(newRateLimitPerSecond: bigint): Promise<PopulatedTransaction>;
    populateAddBridgeTx(bufferCap: bigint, rateLimitPerSecond: bigint): Promise<PopulatedTransaction>;
}
export declare class EvmHypNativeAdapter extends EvmHypCollateralAdapter implements IHypTokenAdapter<PopulatedTransaction> {
    isApproveRequired(): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }: TransferRemoteParams): Promise<PopulatedTransaction>;
}
export declare class EvmXERC20VSAdapter extends EvmTokenAdapter implements IXERC20VSAdapter<PopulatedTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    xERC20VS: IXERC20VS;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    getRateLimits(bridge: Address): Promise<RateLimitMidPoint>;
    populateRemoveBridgeTx(bridge: Address): Promise<PopulatedTransaction>;
    populateSetBufferCapTx(bridge: Address, newBufferCap: bigint): Promise<PopulatedTransaction>;
    populateSetRateLimitPerSecondTx(bridge: Address, newRateLimitPerSecond: bigint): Promise<PopulatedTransaction>;
    populateAddBridgeTx(bufferCap: bigint, rateLimitPerSecond: bigint, bridge: Address): Promise<PopulatedTransaction>;
}
export {};
//# sourceMappingURL=EvmTokenAdapter.d.ts.map