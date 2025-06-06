import { Address, HexString } from '@hyperlane-xyz/utils';
interface EtherscanLikeAPIOptions {
    apiKey?: string;
    apiUrl: string;
}
interface BaseEtherscanLikeAPIParams<TModule extends string, TAction extends string> {
    module: TModule;
    action: TAction;
}
type GetContractDeploymentTransactionResponse = {
    contractAddress: Address;
    contractCreator: Address;
    txHash: HexString;
};
export declare function tryGetContractDeploymentTransaction(explorerOptions: EtherscanLikeAPIOptions, { contractAddress }: {
    contractAddress: Address;
}): Promise<GetContractDeploymentTransactionResponse | undefined>;
export declare function getContractDeploymentTransaction(explorerOptions: EtherscanLikeAPIOptions, requestOptions: {
    contractAddress: Address;
}): Promise<GetContractDeploymentTransactionResponse>;
interface GetEventLogs extends BaseEtherscanLikeAPIParams<'logs', 'getLogs'> {
    address: Address;
    fromBlock: number;
    toBlock: number;
    topic0: string;
}
export type GetEventLogsResponse = {
    address: Address;
    blockNumber: HexString;
    data: HexString;
    gasPrice: HexString;
    gasUsed: HexString;
    logIndex: HexString;
    timeStamp: HexString;
    topics: ReadonlyArray<HexString>;
    transactionHash: HexString;
    transactionIndex: HexString;
};
export declare function getLogsFromEtherscanLikeExplorerAPI({ apiUrl, apiKey: apikey }: EtherscanLikeAPIOptions, options: Omit<GetEventLogs, 'module' | 'action'>): Promise<Array<GetEventLogsResponse>>;
export {};
//# sourceMappingURL=etherscan.d.ts.map