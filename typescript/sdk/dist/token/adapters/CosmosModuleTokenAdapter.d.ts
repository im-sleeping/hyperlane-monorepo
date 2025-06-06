/// <reference types="node" resolution-mode="require"/>
import { MsgSendEncodeObject } from '@cosmjs/stargate';
import { MsgRemoteTransferEncodeObject } from '@hyperlane-xyz/cosmos-sdk';
import { Address, Domain } from '@hyperlane-xyz/utils';
import { BaseCosmNativeAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainName } from '../../types.js';
import { TokenMetadata } from '../types.js';
import { IHypTokenAdapter, ITokenAdapter, InterchainGasQuote, TransferParams, TransferRemoteParams } from './ITokenAdapter.js';
declare class CosmosModuleTokenAdapter extends BaseCosmNativeAdapter implements ITokenAdapter<MsgSendEncodeObject> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: Record<string, Address>;
    readonly properties: {
        denom: string;
    };
    protected getDenom(): Promise<string>;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: Record<string, Address>, properties: {
        denom: string;
    });
    getBalance(address: string): Promise<bigint>;
    getMetadata(): Promise<TokenMetadata>;
    getMinimumTransferAmount(_recipient: Address): Promise<bigint>;
    isApproveRequired(): Promise<boolean>;
    populateApproveTx(_transferParams: TransferParams): Promise<MsgSendEncodeObject>;
    isRevokeApprovalRequired(_: Address, __: Address): Promise<boolean>;
    populateTransferTx(transferParams: TransferParams): Promise<MsgSendEncodeObject>;
    getTotalSupply(): Promise<bigint | undefined>;
}
export declare class CosmNativeHypCollateralAdapter extends CosmosModuleTokenAdapter implements IHypTokenAdapter<MsgSendEncodeObject | MsgRemoteTransferEncodeObject> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    protected tokenId: string;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    protected getDenom(): Promise<string>;
    getDomains(): Promise<Domain[]>;
    getRouterAddress(domain: Domain): Promise<Buffer>;
    getAllRouters(): Promise<Array<{
        domain: Domain;
        address: Buffer;
    }>>;
    getBridgedSupply(): Promise<bigint | undefined>;
    quoteTransferRemoteGas(destination: Domain, _sender?: Address): Promise<InterchainGasQuote>;
    populateTransferRemoteTx(params: TransferRemoteParams): Promise<MsgRemoteTransferEncodeObject>;
}
export declare class CosmNativeHypSyntheticAdapter extends CosmNativeHypCollateralAdapter {
    protected getTokenDenom(): Promise<string>;
}
export {};
//# sourceMappingURL=CosmosModuleTokenAdapter.d.ts.map