/**
 * The types defined here are the source of truth for chain metadata.
 * ANY CHANGES HERE NEED TO BE REFLECTED IN HYPERLANE-BASE CONFIG PARSING.
 */
import { SafeParseReturnType, z } from 'zod';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { ChainMap } from '../types.js';
export declare enum EthJsonRpcBlockParameterTag {
    Earliest = "earliest",
    Latest = "latest",
    Safe = "safe",
    Finalized = "finalized",
    Pending = "pending"
}
export declare enum ExplorerFamily {
    Etherscan = "etherscan",
    Blockscout = "blockscout",
    Routescan = "routescan",
    Voyager = "voyager",
    ZkSync = "zksync",
    Other = "other"
}
export declare enum ChainTechnicalStack {
    ArbitrumNitro = "arbitrumnitro",
    OpStack = "opstack",
    PolygonCDK = "polygoncdk",
    PolkadotSubstrate = "polkadotsubstrate",
    ZkSync = "zksync",
    Other = "other"
}
export declare enum ChainStatus {
    Live = "live",
    Disabled = "disabled"
}
export declare enum ChainDisabledReason {
    BadRpc = "badrpc",
    Deprecated = "deprecated",
    Private = "private",
    Unavailable = "unavailable",
    Other = "other"
}
export type ExplorerFamilyValue = `${ExplorerFamily}`;
export declare const RpcUrlSchema: z.ZodObject<{
    http: z.ZodString;
    concurrency: z.ZodOptional<z.ZodNumber>;
    webSocket: z.ZodOptional<z.ZodString>;
    pagination: z.ZodOptional<z.ZodObject<{
        maxBlockRange: z.ZodOptional<z.ZodNumber>;
        minBlockNumber: z.ZodOptional<z.ZodNumber>;
        maxBlockAge: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxBlockRange?: number | undefined;
        minBlockNumber?: number | undefined;
        maxBlockAge?: number | undefined;
    }, {
        maxBlockRange?: number | undefined;
        minBlockNumber?: number | undefined;
        maxBlockAge?: number | undefined;
    }>>;
    retry: z.ZodOptional<z.ZodObject<{
        maxRequests: z.ZodNumber;
        baseRetryMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        maxRequests: number;
        baseRetryMs: number;
    }, {
        maxRequests: number;
        baseRetryMs: number;
    }>>;
    public: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    http: string;
    concurrency?: number | undefined;
    webSocket?: string | undefined;
    pagination?: {
        maxBlockRange?: number | undefined;
        minBlockNumber?: number | undefined;
        maxBlockAge?: number | undefined;
    } | undefined;
    retry?: {
        maxRequests: number;
        baseRetryMs: number;
    } | undefined;
    public?: boolean | undefined;
}, {
    http: string;
    concurrency?: number | undefined;
    webSocket?: string | undefined;
    pagination?: {
        maxBlockRange?: number | undefined;
        minBlockNumber?: number | undefined;
        maxBlockAge?: number | undefined;
    } | undefined;
    retry?: {
        maxRequests: number;
        baseRetryMs: number;
    } | undefined;
    public?: boolean | undefined;
}>;
export type RpcUrl = z.infer<typeof RpcUrlSchema>;
export declare const BlockExplorerSchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    apiUrl: z.ZodString;
    apiKey: z.ZodOptional<z.ZodString>;
    family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    url: string;
    apiUrl: string;
    apiKey?: string | undefined;
    family?: ExplorerFamily | undefined;
}, {
    name: string;
    url: string;
    apiUrl: string;
    apiKey?: string | undefined;
    family?: ExplorerFamily | undefined;
}>;
export type BlockExplorer = z.infer<typeof BlockExplorerSchema>;
export declare const NativeTokenSchema: z.ZodObject<{
    name: z.ZodString;
    symbol: z.ZodString;
    decimals: z.ZodNumber;
    denom: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    name: string;
    decimals: number;
    denom?: string | undefined;
}, {
    symbol: string;
    name: string;
    decimals: number;
    denom?: string | undefined;
}>;
export declare const GasPriceSchema: z.ZodObject<{
    denom: z.ZodString;
    amount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    denom: string;
    amount: string;
}, {
    denom: string;
    amount: string;
}>;
export declare const DisabledChainSchema: z.ZodObject<{
    status: z.ZodLiteral<ChainStatus.Disabled>;
    reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
}, "strip", z.ZodTypeAny, {
    status: ChainStatus.Disabled;
    reasons: ChainDisabledReason[];
}, {
    status: ChainStatus.Disabled;
    reasons: ChainDisabledReason[];
}>;
export declare const EnabledChainSchema: z.ZodObject<{
    status: z.ZodLiteral<ChainStatus.Live>;
}, "strip", z.ZodTypeAny, {
    status: ChainStatus.Live;
}, {
    status: ChainStatus.Live;
}>;
export type NativeToken = z.infer<typeof NativeTokenSchema>;
/**
 * A collection of useful properties and settings for chains using Hyperlane
 * Specified as a Zod schema
 */
export declare const ChainMetadataSchemaObject: z.ZodObject<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    chainId: string | number;
    domainId: number;
    protocol: ProtocolType;
    rpcUrls: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[];
    availability?: {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    } | {
        status: ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }[] | undefined;
    blocks?: {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    } | undefined;
    bypassBatchSimulation?: boolean | undefined;
    customGrpcUrls?: string | undefined;
    deployer?: {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    } | undefined;
    displayName?: string | undefined;
    displayNameShort?: string | undefined;
    gasCurrencyCoinGeckoId?: string | undefined;
    gnosisSafeTransactionServiceUrl?: string | undefined;
    grpcUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[] | undefined;
    index?: {
        from?: number | undefined;
    } | undefined;
    isTestnet?: boolean | undefined;
    logoURI?: string | undefined;
    nativeToken?: {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    } | undefined;
    restUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[] | undefined;
    slip44?: number | undefined;
    technicalStack?: ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
}, {
    name: string;
    chainId: string | number;
    domainId: number;
    protocol: ProtocolType;
    rpcUrls: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[];
    availability?: {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    } | {
        status: ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }[] | undefined;
    blocks?: {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    } | undefined;
    bypassBatchSimulation?: boolean | undefined;
    customGrpcUrls?: string | undefined;
    deployer?: {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    } | undefined;
    displayName?: string | undefined;
    displayNameShort?: string | undefined;
    gasCurrencyCoinGeckoId?: string | undefined;
    gnosisSafeTransactionServiceUrl?: string | undefined;
    grpcUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[] | undefined;
    index?: {
        from?: number | undefined;
    } | undefined;
    isTestnet?: boolean | undefined;
    logoURI?: string | undefined;
    nativeToken?: {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    } | undefined;
    restUrls?: {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }[] | undefined;
    slip44?: number | undefined;
    technicalStack?: ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
}>;
export declare const ChainMetadataSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }, {
        status: ChainStatus.Disabled;
        reasons: ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: ChainStatus.Live;
    }, {
        status: ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: ExplorerFamily | undefined;
    }>, "many">>;
    blocks: z.ZodOptional<z.ZodObject<{
        confirmations: z.ZodNumber;
        reorgPeriod: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        estimateBlockTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }, {
        confirmations: number;
        reorgPeriod?: string | number | undefined;
        estimateBlockTime?: number | undefined;
    }>>;
    bypassBatchSimulation: z.ZodOptional<z.ZodBoolean>;
    chainId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    customGrpcUrls: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }, {
        name: string;
        email?: string | undefined;
        url?: string | undefined;
    }>>;
    displayName: z.ZodOptional<z.ZodString>;
    displayNameShort: z.ZodOptional<z.ZodString>;
    domainId: z.ZodNumber;
    gasCurrencyCoinGeckoId: z.ZodOptional<z.ZodString>;
    gnosisSafeTransactionServiceUrl: z.ZodOptional<z.ZodString>;
    grpcUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    index: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
    }, {
        from?: number | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    nativeToken: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        denom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }, {
        symbol: string;
        name: string;
        decimals: number;
        denom?: string | undefined;
    }>>;
    protocol: z.ZodNativeEnum<typeof ProtocolType>;
    restUrls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">>;
    rpcUrls: z.ZodArray<z.ZodObject<{
        http: z.ZodString;
        concurrency: z.ZodOptional<z.ZodNumber>;
        webSocket: z.ZodOptional<z.ZodString>;
        pagination: z.ZodOptional<z.ZodObject<{
            maxBlockRange: z.ZodOptional<z.ZodNumber>;
            minBlockNumber: z.ZodOptional<z.ZodNumber>;
            maxBlockAge: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }, {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        }>>;
        retry: z.ZodOptional<z.ZodObject<{
            maxRequests: z.ZodNumber;
            baseRetryMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxRequests: number;
            baseRetryMs: number;
        }, {
            maxRequests: number;
            baseRetryMs: number;
        }>>;
        public: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }, {
        http: string;
        concurrency?: number | undefined;
        webSocket?: string | undefined;
        pagination?: {
            maxBlockRange?: number | undefined;
            minBlockNumber?: number | undefined;
            maxBlockAge?: number | undefined;
        } | undefined;
        retry?: {
            maxRequests: number;
            baseRetryMs: number;
        } | undefined;
        public?: boolean | undefined;
    }>, "many">;
    slip44: z.ZodOptional<z.ZodNumber>;
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    gasPrice: z.ZodOptional<z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>>;
}, z.ZodTypeAny, "passthrough">>;
export type ChainMetadata<Ext = object> = z.infer<typeof ChainMetadataSchemaObject> & Ext;
export declare function safeParseChainMetadata(c: ChainMetadata): SafeParseReturnType<ChainMetadata, ChainMetadata>;
export declare function isValidChainMetadata(c: ChainMetadata): boolean;
export declare function getDomainId(chainMetadata: ChainMetadata): number;
export declare function getChainIdNumber(chainMetadata: ChainMetadata): number;
export declare function getReorgPeriod(chainMetadata: ChainMetadata): string | number;
export declare function mergeChainMetadata(base: ChainMetadata, overrides: Partial<ChainMetadata> | undefined): ChainMetadata;
export declare function mergeChainMetadataMap(base: ChainMap<ChainMetadata>, overrides: ChainMap<Partial<ChainMetadata> | undefined> | undefined): ChainMap<ChainMetadata>;
//# sourceMappingURL=chainMetadataTypes.d.ts.map