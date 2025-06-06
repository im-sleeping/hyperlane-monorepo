/// <reference types="node" resolution-mode="require"/>
import { Call, Contract } from 'starknet';
import { Address, Domain, Numberish } from '@hyperlane-xyz/utils';
import { BaseStarknetAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainName } from '../../types.js';
import { TokenMetadata } from '../types.js';
import { IHypTokenAdapter, InterchainGasQuote, TransferParams, TransferRemoteParams } from './ITokenAdapter.js';
export declare class StarknetHypSyntheticAdapter extends BaseStarknetAdapter implements IHypTokenAdapter<Call> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        warpRouter: Address;
    };
    readonly contract: Contract;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        warpRouter: Address;
    });
    getBalance(address: Address): Promise<bigint>;
    getMetadata(_isNft?: boolean): Promise<TokenMetadata>;
    isApproveRequired(owner: Address, spender: Address, weiAmountOrId: Numberish): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    populateApproveTx({ weiAmountOrId, recipient, }: TransferParams): Promise<Call>;
    populateTransferTx({ weiAmountOrId, recipient, }: TransferParams): Promise<Call>;
    getTotalSupply(): Promise<bigint | undefined>;
    quoteTransferRemoteGas(_destination: Domain): Promise<InterchainGasQuote>;
    populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }: TransferRemoteParams): Promise<Call>;
    getMinimumTransferAmount(_recipient: Address): Promise<bigint>;
    getDomains(): Promise<Domain[]>;
    getRouterAddress(domain: Domain): Promise<Buffer>;
    getAllRouters(): Promise<Array<{
        domain: Domain;
        address: Buffer;
    }>>;
    getBridgedSupply(): Promise<bigint | undefined>;
}
export declare class StarknetHypCollateralAdapter extends StarknetHypSyntheticAdapter {
    readonly collateralContract: Contract;
    protected wrappedTokenAddress?: Address;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        warpRouter: Address;
    });
    protected getWrappedTokenAddress(): Promise<Address>;
    protected getWrappedTokenAdapter(): Promise<StarknetHypSyntheticAdapter>;
    getBalance(address: Address): Promise<bigint>;
    getBridgedSupply(): Promise<bigint | undefined>;
    getMetadata(isNft?: boolean): Promise<TokenMetadata>;
    isApproveRequired(owner: Address, spender: Address, weiAmountOrId: Numberish): Promise<boolean>;
    populateApproveTx(params: TransferParams): Promise<Call>;
    populateTransferTx(params: TransferParams): Promise<Call>;
}
export declare class StarknetHypNativeAdapter extends StarknetHypSyntheticAdapter {
    readonly collateralContract: Contract;
    readonly nativeContract: Contract;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        warpRouter: Address;
    });
    getBalance(address: Address): Promise<bigint>;
    isApproveRequired(owner: Address, spender: Address, weiAmountOrId: Numberish): Promise<boolean>;
    populateApproveTx({ weiAmountOrId, recipient, }: TransferParams): Promise<Call>;
    populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }: TransferRemoteParams): Promise<Call>;
}
//# sourceMappingURL=StarknetTokenAdapter.d.ts.map