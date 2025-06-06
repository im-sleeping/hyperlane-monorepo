import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StargateClient } from '@cosmjs/stargate';
import { Connection } from '@solana/web3.js';
import { RpcProvider as StarknetRpcProvider } from 'starknet';
import { createPublicClient, http } from 'viem';
import { Provider as ZKProvider } from 'zksync-ethers';
import { HyperlaneModuleClient } from '@hyperlane-xyz/cosmos-sdk';
import { ProtocolType, assert, isNumeric } from '@hyperlane-xyz/utils';
import { ProviderType, } from './ProviderType.js';
import { HyperlaneSmartProvider } from './SmartProvider/SmartProvider.js';
const DEFAULT_RETRY_OPTIONS = {
    maxRetries: 3,
    baseRetryDelayMs: 250,
};
export function defaultEthersV5ProviderBuilder(rpcUrls, network, retryOverride) {
    const provider = new HyperlaneSmartProvider(network, rpcUrls, undefined, retryOverride || DEFAULT_RETRY_OPTIONS);
    return { type: ProviderType.EthersV5, provider };
}
export function defaultViemProviderBuilder(rpcUrls, network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    if (!isNumeric(network))
        throw new Error('Viem requires a numeric network');
    const id = parseInt(network.toString(), 10);
    const name = network.toString(); // TODO get more descriptive name
    const url = rpcUrls[0].http;
    const client = createPublicClient({
        chain: {
            id,
            name,
            network: name,
            nativeCurrency: { name: '', symbol: '', decimals: 0 },
            rpcUrls: { default: { http: [url] }, public: { http: [url] } },
        },
        transport: http(rpcUrls[0].http),
    });
    return { type: ProviderType.Viem, provider: client };
}
export function defaultSolProviderBuilder(rpcUrls, _network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    return {
        type: ProviderType.SolanaWeb3,
        provider: new Connection(rpcUrls[0].http, 'confirmed'),
    };
}
export function defaultFuelProviderBuilder(rpcUrls, _network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    throw new Error('TODO fuel support');
}
export function defaultCosmJsProviderBuilder(rpcUrls, _network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    return {
        type: ProviderType.CosmJs,
        provider: StargateClient.connect(rpcUrls[0].http),
    };
}
export function defaultCosmJsWasmProviderBuilder(rpcUrls, _network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    return {
        type: ProviderType.CosmJsWasm,
        provider: CosmWasmClient.connect(rpcUrls[0].http),
    };
}
export function defaultCosmJsNativeProviderBuilder(rpcUrls, _network) {
    if (!rpcUrls.length)
        throw new Error('No RPC URLs provided');
    return {
        type: ProviderType.CosmJsNative,
        provider: HyperlaneModuleClient.connect(rpcUrls[0].http),
    };
}
export function defaultStarknetJsProviderBuilder(rpcUrls) {
    const provider = new StarknetRpcProvider({
        nodeUrl: rpcUrls[0].http,
    });
    return { provider, type: ProviderType.Starknet };
}
export function defaultZKSyncProviderBuilder(rpcUrls, network) {
    assert(rpcUrls.length, 'No RPC URLs provided');
    const url = rpcUrls[0].http;
    const provider = new ZKProvider(url, network);
    return { type: ProviderType.ZkSync, provider };
}
// Kept for backwards compatibility
export function defaultProviderBuilder(rpcUrls, _network) {
    return defaultEthersV5ProviderBuilder(rpcUrls, _network).provider;
}
export function defaultZKProviderBuilder(rpcUrls, _network) {
    return defaultZKSyncProviderBuilder(rpcUrls, _network).provider;
}
export const defaultProviderBuilderMap = {
    [ProviderType.EthersV5]: defaultEthersV5ProviderBuilder,
    [ProviderType.GnosisTxBuilder]: defaultEthersV5ProviderBuilder,
    [ProviderType.Viem]: defaultViemProviderBuilder,
    [ProviderType.SolanaWeb3]: defaultSolProviderBuilder,
    [ProviderType.CosmJs]: defaultCosmJsProviderBuilder,
    [ProviderType.CosmJsWasm]: defaultCosmJsWasmProviderBuilder,
    [ProviderType.CosmJsNative]: defaultCosmJsNativeProviderBuilder,
    [ProviderType.Starknet]: defaultStarknetJsProviderBuilder,
    [ProviderType.ZkSync]: defaultZKSyncProviderBuilder,
};
export const protocolToDefaultProviderBuilder = {
    [ProtocolType.Ethereum]: defaultEthersV5ProviderBuilder,
    [ProtocolType.Sealevel]: defaultSolProviderBuilder,
    [ProtocolType.Cosmos]: defaultCosmJsWasmProviderBuilder,
    [ProtocolType.CosmosNative]: defaultCosmJsNativeProviderBuilder,
    [ProtocolType.Starknet]: defaultStarknetJsProviderBuilder,
};
//# sourceMappingURL=providerBuilders.js.map