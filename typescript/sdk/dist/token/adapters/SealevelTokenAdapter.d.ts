/// <reference types="node" resolution-mode="require"/>
import { AccountMeta, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { Address, Domain } from '@hyperlane-xyz/utils';
import { BaseSealevelAdapter } from '../../app/MultiProtocolApp.js';
import { IgpPaymentKeys, SealevelIgpProgramAdapter } from '../../gas/adapters/SealevelIgpAdapter.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainName } from '../../types.js';
import { TokenMetadata } from '../types.js';
import { IHypTokenAdapter, ITokenAdapter, InterchainGasQuote, TransferParams, TransferRemoteParams } from './ITokenAdapter.js';
import { SealevelHyperlaneTokenData } from './serialization.js';
export declare class SealevelNativeTokenAdapter extends BaseSealevelAdapter implements ITokenAdapter<HyperlaneSolanaTransaction> {
    getBalance(address: Address): Promise<bigint>;
    getMetadata(): Promise<TokenMetadata>;
    getMinimumTransferAmount(recipient: Address): Promise<bigint>;
    isApproveRequired(): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    populateApproveTx(): Promise<HyperlaneSolanaTransaction>;
    populateTransferTx({ weiAmountOrId, recipient, fromAccountOwner, }: TransferParams): Promise<HyperlaneSolanaTransaction>;
    getTotalSupply(): Promise<bigint | undefined>;
}
export declare class SealevelTokenAdapter extends BaseSealevelAdapter implements ITokenAdapter<HyperlaneSolanaTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        token: Address;
    };
    readonly tokenMintPubKey: PublicKey;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token: Address;
    });
    getBalance(owner: Address): Promise<bigint>;
    getMetadata(_isNft?: boolean): Promise<TokenMetadata>;
    getMinimumTransferAmount(_recipient: Address): Promise<bigint>;
    isApproveRequired(): Promise<boolean>;
    isRevokeApprovalRequired(_owner: Address, _spender: Address): Promise<boolean>;
    populateApproveTx(_params: TransferParams): Promise<HyperlaneSolanaTransaction>;
    populateTransferTx({ weiAmountOrId, recipient, fromAccountOwner, fromTokenAccount, }: TransferParams): Promise<HyperlaneSolanaTransaction>;
    getTokenProgramId(): Promise<PublicKey>;
    isSpl2022(): Promise<boolean>;
    deriveAssociatedTokenAccount(owner: PublicKey): Promise<PublicKey>;
    getTotalSupply(): Promise<bigint | undefined>;
}
interface HypTokenAddresses {
    token: Address;
    warpRouter: Address;
    mailbox: Address;
}
export interface HyperlaneSolanaTransaction {
    transaction: Transaction;
    signers: Array<Keypair>;
}
export declare abstract class SealevelHypTokenAdapter extends SealevelTokenAdapter implements IHypTokenAdapter<HyperlaneSolanaTransaction> {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly warpProgramPubKey: PublicKey;
    readonly addresses: HypTokenAddresses;
    protected cachedTokenAccountData: SealevelHyperlaneTokenData | undefined;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: HypTokenAddresses);
    getTokenAccountData(): Promise<SealevelHyperlaneTokenData>;
    getMetadata(): Promise<TokenMetadata>;
    getDomains(): Promise<Domain[]>;
    getRouterAddress(domain: Domain): Promise<Buffer>;
    getAllRouters(): Promise<Array<{
        domain: Domain;
        address: Buffer;
    }>>;
    getBridgedSupply(): Promise<bigint | undefined>;
    quoteTransferRemoteGas(destination: Domain, sender?: Address): Promise<InterchainGasQuote>;
    populateTransferRemoteTx({ weiAmountOrId, destination, recipient, fromAccountOwner, }: TransferRemoteParams): Promise<HyperlaneSolanaTransaction>;
    getIgpKeys(): Promise<IgpPaymentKeys | undefined>;
    getTransferInstructionKeyList({ sender, mailbox, randomWallet, igp, }: KeyListParams): Promise<Array<AccountMeta>>;
    deriveMailboxOutboxAccount(mailbox: PublicKey): PublicKey;
    deriveMessageDispatchAuthorityAccount(): PublicKey;
    deriveMsgStorageAccount(mailbox: PublicKey, randomWalletPubKey: PublicKey): PublicKey;
    deriveHypTokenAccount(): PublicKey;
    deriveAtaPayerAccount(): PublicKey;
    /**
     * Fetches the median prioritization fee for transfers of the collateralAddress token.
     * @returns The median prioritization fee in micro-lamports, defaults to `0` when chain is not solanamainnet
     */
    getMedianPriorityFee(): Promise<number | undefined>;
    protected getIgpAdapter(tokenData: SealevelHyperlaneTokenData): SealevelIgpProgramAdapter | undefined;
}
export declare class SealevelHypNativeAdapter extends SealevelHypTokenAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly wrappedNative: SealevelNativeTokenAdapter;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        token?: Address;
        warpRouter: Address;
        mailbox: Address;
    });
    getBalance(owner: Address): Promise<bigint>;
    getBridgedSupply(): Promise<bigint>;
    getMetadata(): Promise<TokenMetadata>;
    getMinimumTransferAmount(recipient: Address): Promise<bigint>;
    getMedianPriorityFee(): Promise<number | undefined>;
    getTransferInstructionKeyList(params: KeyListParams): Promise<Array<AccountMeta>>;
    deriveNativeTokenCollateralAccount(): PublicKey;
    deriveAtaPayerAccount(): PublicKey;
}
export declare class SealevelHypCollateralAdapter extends SealevelHypTokenAdapter {
    getBalance(owner: Address): Promise<bigint>;
    getBridgedSupply(): Promise<bigint>;
    getTransferInstructionKeyList(params: KeyListParams): Promise<Array<AccountMeta>>;
    deriveEscrowAccount(): PublicKey;
}
export declare class SealevelHypSyntheticAdapter extends SealevelHypTokenAdapter {
    getTransferInstructionKeyList(params: KeyListParams): Promise<Array<AccountMeta>>;
    getBalance(owner: Address): Promise<bigint>;
    getBridgedSupply(): Promise<bigint>;
    getTotalSupply(): Promise<bigint>;
    deriveMintAuthorityAccount(): PublicKey;
    deriveAssociatedTokenAccount(owner: PublicKey): Promise<PublicKey>;
}
interface KeyListParams {
    sender: PublicKey;
    mailbox: PublicKey;
    randomWallet: PublicKey;
    igp?: IgpPaymentKeys;
}
export {};
//# sourceMappingURL=SealevelTokenAdapter.d.ts.map