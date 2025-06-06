/**
 * The types defined here are the source of truth for chain metadata.
 * ANY CHANGES HERE NEED TO BE REFLECTED IN HYPERLANE-BASE CONFIG PARSING.
 */
import { z } from 'zod';
import { ModuleType } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../types.js';
import { HyperlaneDeploymentArtifacts } from './deploymentArtifacts.js';
export declare enum RpcConsensusType {
    Single = "single",
    Fallback = "fallback",
    Quorum = "quorum"
}
export declare enum AgentLogLevel {
    Off = "off",
    Error = "error",
    Warn = "warn",
    Info = "info",
    Debug = "debug",
    Trace = "trace"
}
export declare enum AgentLogFormat {
    Json = "json",
    Compact = "compact",
    Full = "full",
    Pretty = "pretty"
}
export declare enum AgentIndexMode {
    Block = "block",
    Sequence = "sequence"
}
export declare enum AgentSignerKeyType {
    Aws = "aws",
    Hex = "hexKey",
    Node = "node",
    Cosmos = "cosmosKey"
}
export declare enum AgentSealevelPriorityFeeOracleType {
    Helius = "helius",
    Constant = "constant"
}
export declare enum AgentSealevelHeliusFeeLevel {
    Recommended = "recommended",
    Min = "min",
    Low = "low",
    Medium = "medium",
    High = "high",
    VeryHigh = "veryHigh",
    UnsafeMax = "unsafeMax"
}
export declare enum AgentSealevelTransactionSubmitterType {
    Rpc = "rpc",
    Jito = "jito"
}
declare const AgentSignerHexKeySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
    type?: AgentSignerKeyType.Hex | undefined;
}, {
    key: string;
    type?: AgentSignerKeyType.Hex | undefined;
}>;
declare const AgentSignerAwsKeySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
    id: z.ZodString;
    region: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    region: string;
    type?: AgentSignerKeyType.Aws | undefined;
}, {
    id: string;
    region: string;
    type?: AgentSignerKeyType.Aws | undefined;
}>;
declare const AgentSignerNodeSchema: z.ZodObject<{
    type: z.ZodLiteral<AgentSignerKeyType.Node>;
}, "strip", z.ZodTypeAny, {
    type: AgentSignerKeyType.Node;
}, {
    type: AgentSignerKeyType.Node;
}>;
declare const AgentSignerSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key: string;
    type?: AgentSignerKeyType.Hex | undefined;
}, {
    key: string;
    type?: AgentSignerKeyType.Hex | undefined;
}>, z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
    id: z.ZodString;
    region: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    region: string;
    type?: AgentSignerKeyType.Aws | undefined;
}, {
    id: string;
    region: string;
    type?: AgentSignerKeyType.Aws | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
    prefix: z.ZodString;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: AgentSignerKeyType.Cosmos;
    key: string;
    prefix: string;
}, {
    type: AgentSignerKeyType.Cosmos;
    key: string;
    prefix: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<AgentSignerKeyType.Node>;
}, "strip", z.ZodTypeAny, {
    type: AgentSignerKeyType.Node;
}, {
    type: AgentSignerKeyType.Node;
}>]>;
export type AgentSignerHexKey = z.infer<typeof AgentSignerHexKeySchema>;
export type AgentSignerAwsKey = z.infer<typeof AgentSignerAwsKeySchema>;
export type AgentSignerCosmosKey = z.infer<typeof AgentSignerNodeSchema>;
export type AgentSignerNode = z.infer<typeof AgentSignerNodeSchema>;
export type AgentSigner = z.infer<typeof AgentSignerSchema>;
declare const AgentCosmosChainMetadataSchema: z.ZodObject<{
    canonicalAsset: z.ZodString;
    gasPrice: z.ZodObject<{
        denom: z.ZodString;
        amount: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        denom: string;
        amount: string;
    }, {
        denom: string;
        amount: string;
    }>;
    contractAddressBytes: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gasPrice: {
        denom: string;
        amount: string;
    };
    canonicalAsset: string;
    contractAddressBytes: number;
}, {
    gasPrice: {
        denom: string;
        amount: string;
    };
    canonicalAsset: string;
    contractAddressBytes: number;
}>;
export type AgentCosmosGasPrice = z.infer<typeof AgentCosmosChainMetadataSchema>['gasPrice'];
declare const AgentSealevelChainMetadataSchema: z.ZodObject<{
    priorityFeeOracle: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
        url: z.ZodString;
        feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    }, {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
        fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    }, {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    }>]>>;
    transactionSubmitter: z.ZodOptional<z.ZodObject<{
        type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    }, {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}, {
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}>;
export type AgentSealevelChainMetadata = z.infer<typeof AgentSealevelChainMetadataSchema>;
export type AgentSealevelPriorityFeeOracle = AgentSealevelChainMetadata['priorityFeeOracle'];
export type AgentSealevelTransactionSubmitter = AgentSealevelChainMetadata['transactionSubmitter'];
export declare const AgentChainMetadataSchema: z.ZodEffects<z.ZodObject<{
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
    merkleTreeHook: z.ZodString;
    interchainGasPaymaster: z.ZodString;
    name: z.ZodString;
    availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Disabled>;
        reasons: z.ZodArray<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainDisabledReason>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    }, {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Live>;
    }, "strip", z.ZodTypeAny, {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    }, {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    }>]>>;
    bech32Prefix: z.ZodOptional<z.ZodString>;
    blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
        family: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ExplorerFamily>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
    }, {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
        chunk: z.ZodOptional<z.ZodNumber>;
        mode: z.ZodOptional<z.ZodNativeEnum<typeof AgentIndexMode>>;
    }, "strip", z.ZodTypeAny, {
        from?: number | undefined;
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
    }, {
        from?: number | undefined;
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
    }>>;
    isTestnet: z.ZodOptional<z.ZodBoolean>;
    logoURI: z.ZodOptional<z.ZodString>;
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
    technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainTechnicalStack>>;
    transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    signer: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>>;
    mailbox: z.ZodString;
    interchainSecurityModule: z.ZodOptional<z.ZodString>;
    validatorAnnounce: z.ZodString;
    canonicalAsset: z.ZodOptional<z.ZodString>;
    contractAddressBytes: z.ZodOptional<z.ZodNumber>;
    customRpcUrls: z.ZodOptional<z.ZodString>;
    rpcConsensusType: z.ZodOptional<z.ZodNativeEnum<typeof RpcConsensusType>>;
    priorityFeeOracle: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
        url: z.ZodString;
        feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    }, {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
        fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    }, {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    }>]>>>;
    transactionSubmitter: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    }, {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    merkleTreeHook: string;
    interchainGasPaymaster: string;
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
    mailbox: string;
    validatorAnnounce: string;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
    availability?: {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    } | {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
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
    technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    signer?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    interchainSecurityModule?: string | undefined;
    canonicalAsset?: string | undefined;
    contractAddressBytes?: number | undefined;
    customRpcUrls?: string | undefined;
    rpcConsensusType?: RpcConsensusType | undefined;
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}, {
    merkleTreeHook: string;
    interchainGasPaymaster: string;
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
    mailbox: string;
    validatorAnnounce: string;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
    availability?: {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    } | {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
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
    technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    signer?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    interchainSecurityModule?: string | undefined;
    canonicalAsset?: string | undefined;
    contractAddressBytes?: number | undefined;
    customRpcUrls?: string | undefined;
    rpcConsensusType?: RpcConsensusType | undefined;
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}>, {
    merkleTreeHook: string;
    interchainGasPaymaster: string;
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
    mailbox: string;
    validatorAnnounce: string;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
    availability?: {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    } | {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
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
    technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    signer?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    interchainSecurityModule?: string | undefined;
    canonicalAsset?: string | undefined;
    contractAddressBytes?: number | undefined;
    customRpcUrls?: string | undefined;
    rpcConsensusType?: RpcConsensusType | undefined;
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}, {
    merkleTreeHook: string;
    interchainGasPaymaster: string;
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
    mailbox: string;
    validatorAnnounce: string;
    gasPrice?: {
        denom: string;
        amount: string;
    } | undefined;
    availability?: {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
        reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
    } | {
        status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
    } | undefined;
    bech32Prefix?: string | undefined;
    blockExplorers?: {
        name: string;
        url: string;
        apiUrl: string;
        apiKey?: string | undefined;
        family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
        chunk?: number | undefined;
        mode?: AgentIndexMode | undefined;
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
    technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
    transactionOverrides?: Record<string, any> | undefined;
    signer?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    interchainSecurityModule?: string | undefined;
    canonicalAsset?: string | undefined;
    contractAddressBytes?: number | undefined;
    customRpcUrls?: string | undefined;
    rpcConsensusType?: RpcConsensusType | undefined;
    priorityFeeOracle?: {
        type: AgentSealevelPriorityFeeOracleType.Helius;
        url: string;
        feeLevel: AgentSealevelHeliusFeeLevel;
    } | {
        type: AgentSealevelPriorityFeeOracleType.Constant;
        fee: string | number;
    } | undefined;
    transactionSubmitter?: {
        type: AgentSealevelTransactionSubmitterType;
        url?: string | undefined;
    } | undefined;
}>;
export type AgentChainMetadata = z.infer<typeof AgentChainMetadataSchema>;
export declare const AgentConfigSchema: z.ZodObject<{
    metricsPort: z.ZodOptional<z.ZodNumber>;
    chains: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
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
        merkleTreeHook: z.ZodString;
        interchainGasPaymaster: z.ZodString;
        name: z.ZodString;
        availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Disabled>;
            reasons: z.ZodArray<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainDisabledReason>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }>, z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Live>;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }>]>>;
        bech32Prefix: z.ZodOptional<z.ZodString>;
        blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            apiUrl: z.ZodString;
            apiKey: z.ZodOptional<z.ZodString>;
            family: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ExplorerFamily>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
        }, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk: z.ZodOptional<z.ZodNumber>;
            mode: z.ZodOptional<z.ZodNativeEnum<typeof AgentIndexMode>>;
        }, "strip", z.ZodTypeAny, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }>>;
        isTestnet: z.ZodOptional<z.ZodBoolean>;
        logoURI: z.ZodOptional<z.ZodString>;
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
        technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainTechnicalStack>>;
        transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        signer: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }>, z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
            id: z.ZodString;
            region: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
            prefix: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Node>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Node;
        }, {
            type: AgentSignerKeyType.Node;
        }>]>>;
        mailbox: z.ZodString;
        interchainSecurityModule: z.ZodOptional<z.ZodString>;
        validatorAnnounce: z.ZodString;
        canonicalAsset: z.ZodOptional<z.ZodString>;
        contractAddressBytes: z.ZodOptional<z.ZodNumber>;
        customRpcUrls: z.ZodOptional<z.ZodString>;
        rpcConsensusType: z.ZodOptional<z.ZodNativeEnum<typeof RpcConsensusType>>;
        priorityFeeOracle: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
            url: z.ZodString;
            feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
            fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }>]>>>;
        transactionSubmitter: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>;
    defaultSigner: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>>;
    log: z.ZodOptional<z.ZodObject<{
        format: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogFormat>>;
        level: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogLevel>>;
    }, "strip", z.ZodTypeAny, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
}, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
}>;
export declare enum GasPaymentEnforcementPolicyType {
    None = "none",
    Minimum = "minimum",
    OnChainFeeQuoting = "onChainFeeQuoting"
}
declare const GasPaymentEnforcementSchema: z.ZodUnion<[z.ZodObject<{
    matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
        messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }>, "many">>;
    type: z.ZodOptional<z.ZodLiteral<GasPaymentEnforcementPolicyType.None>>;
}, "strip", z.ZodTypeAny, {
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    type?: GasPaymentEnforcementPolicyType.None | undefined;
}, {
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    type?: GasPaymentEnforcementPolicyType.None | undefined;
}>, z.ZodObject<{
    matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
        messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }>, "many">>;
    type: z.ZodOptional<z.ZodLiteral<GasPaymentEnforcementPolicyType.Minimum>>;
    payment: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    payment: string | number;
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
}, {
    payment: string | number;
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
}>, z.ZodObject<{
    matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
        messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }>, "many">>;
    type: z.ZodLiteral<GasPaymentEnforcementPolicyType.OnChainFeeQuoting>;
    gasFraction: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    gasFraction?: string | undefined;
}, {
    type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
    matchingList?: {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    gasFraction?: string | undefined;
}>]>;
export type GasPaymentEnforcement = z.infer<typeof GasPaymentEnforcementSchema>;
export declare enum IsmCachePolicy {
    MessageSpecific = "messageSpecific",
    IsmSpecific = "ismSpecific"
}
export declare enum IsmCacheSelectorType {
    DefaultIsm = "defaultIsm",
    AppContext = "appContext"
}
declare const IsmCacheConfigSchema: z.ZodObject<{
    selector: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<IsmCacheSelectorType.DefaultIsm>;
    }, "strip", z.ZodTypeAny, {
        type: IsmCacheSelectorType.DefaultIsm;
    }, {
        type: IsmCacheSelectorType.DefaultIsm;
    }>, z.ZodObject<{
        type: z.ZodLiteral<IsmCacheSelectorType.AppContext>;
        context: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: IsmCacheSelectorType.AppContext;
        context: string;
    }, {
        type: IsmCacheSelectorType.AppContext;
        context: string;
    }>]>;
    moduleTypes: z.ZodArray<z.ZodNativeEnum<typeof ModuleType>, "many">;
    chains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cachePolicy: z.ZodNativeEnum<typeof IsmCachePolicy>;
}, "strip", z.ZodTypeAny, {
    selector: {
        type: IsmCacheSelectorType.DefaultIsm;
    } | {
        type: IsmCacheSelectorType.AppContext;
        context: string;
    };
    moduleTypes: ModuleType[];
    cachePolicy: IsmCachePolicy;
    chains?: string[] | undefined;
}, {
    selector: {
        type: IsmCacheSelectorType.DefaultIsm;
    } | {
        type: IsmCacheSelectorType.AppContext;
        context: string;
    };
    moduleTypes: ModuleType[];
    cachePolicy: IsmCachePolicy;
    chains?: string[] | undefined;
}>;
export type IsmCacheConfig = z.infer<typeof IsmCacheConfigSchema>;
export declare const RelayerAgentConfigSchema: z.ZodObject<{
    metricsPort: z.ZodOptional<z.ZodNumber>;
    chains: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
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
        merkleTreeHook: z.ZodString;
        interchainGasPaymaster: z.ZodString;
        name: z.ZodString;
        availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Disabled>;
            reasons: z.ZodArray<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainDisabledReason>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }>, z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Live>;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }>]>>;
        bech32Prefix: z.ZodOptional<z.ZodString>;
        blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            apiUrl: z.ZodString;
            apiKey: z.ZodOptional<z.ZodString>;
            family: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ExplorerFamily>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
        }, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk: z.ZodOptional<z.ZodNumber>;
            mode: z.ZodOptional<z.ZodNativeEnum<typeof AgentIndexMode>>;
        }, "strip", z.ZodTypeAny, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }>>;
        isTestnet: z.ZodOptional<z.ZodBoolean>;
        logoURI: z.ZodOptional<z.ZodString>;
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
        technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainTechnicalStack>>;
        transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        signer: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }>, z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
            id: z.ZodString;
            region: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
            prefix: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Node>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Node;
        }, {
            type: AgentSignerKeyType.Node;
        }>]>>;
        mailbox: z.ZodString;
        interchainSecurityModule: z.ZodOptional<z.ZodString>;
        validatorAnnounce: z.ZodString;
        canonicalAsset: z.ZodOptional<z.ZodString>;
        contractAddressBytes: z.ZodOptional<z.ZodNumber>;
        customRpcUrls: z.ZodOptional<z.ZodString>;
        rpcConsensusType: z.ZodOptional<z.ZodNativeEnum<typeof RpcConsensusType>>;
        priorityFeeOracle: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
            url: z.ZodString;
            feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
            fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }>]>>>;
        transactionSubmitter: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>;
    defaultSigner: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>>;
    log: z.ZodOptional<z.ZodObject<{
        format: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogFormat>>;
        level: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogLevel>>;
    }, "strip", z.ZodTypeAny, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }>>;
    db: z.ZodOptional<z.ZodString>;
    relayChains: z.ZodString;
    gasPaymentEnforcement: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodObject<{
        matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
            messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }>, "many">>;
        type: z.ZodOptional<z.ZodLiteral<GasPaymentEnforcementPolicyType.None>>;
    }, "strip", z.ZodTypeAny, {
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.None | undefined;
    }, {
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.None | undefined;
    }>, z.ZodObject<{
        matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
            messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }>, "many">>;
        type: z.ZodOptional<z.ZodLiteral<GasPaymentEnforcementPolicyType.Minimum>>;
        payment: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        payment: string | number;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
    }, {
        payment: string | number;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
    }>, z.ZodObject<{
        matchingList: z.ZodOptional<z.ZodArray<z.ZodObject<{
            messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }>, "many">>;
        type: z.ZodLiteral<GasPaymentEnforcementPolicyType.OnChainFeeQuoting>;
        gasFraction: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        gasFraction?: string | undefined;
    }, {
        type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        gasFraction?: string | undefined;
    }>]>, "many">, z.ZodString]>>;
    whitelist: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }>, "many">, z.ZodString]>>;
    blacklist: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
        recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }, {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }>, "many">, z.ZodString]>>;
    addressBlacklist: z.ZodOptional<z.ZodString>;
    transactionGasLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    skipTransactionGasLimitFor: z.ZodOptional<z.ZodString>;
    allowLocalCheckpointSyncers: z.ZodOptional<z.ZodBoolean>;
    metricAppContexts: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        matchingList: z.ZodArray<z.ZodObject<{
            messageId: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            originDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            senderAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            destinationDomain: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodNumber, z.ZodArray<z.ZodNumber, "atleastone">]>>;
            recipientAddress: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"*">, z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }, {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        matchingList: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[];
    }, {
        name: string;
        matchingList: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[];
    }>, "many">, z.ZodString]>>;
    ismCacheConfigs: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        selector: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<IsmCacheSelectorType.DefaultIsm>;
        }, "strip", z.ZodTypeAny, {
            type: IsmCacheSelectorType.DefaultIsm;
        }, {
            type: IsmCacheSelectorType.DefaultIsm;
        }>, z.ZodObject<{
            type: z.ZodLiteral<IsmCacheSelectorType.AppContext>;
            context: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        }, {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        }>]>;
        moduleTypes: z.ZodArray<z.ZodNativeEnum<typeof ModuleType>, "many">;
        chains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        cachePolicy: z.ZodNativeEnum<typeof IsmCachePolicy>;
    }, "strip", z.ZodTypeAny, {
        selector: {
            type: IsmCacheSelectorType.DefaultIsm;
        } | {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        };
        moduleTypes: ModuleType[];
        cachePolicy: IsmCachePolicy;
        chains?: string[] | undefined;
    }, {
        selector: {
            type: IsmCacheSelectorType.DefaultIsm;
        } | {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        };
        moduleTypes: ModuleType[];
        cachePolicy: IsmCachePolicy;
        chains?: string[] | undefined;
    }>, "many">, z.ZodString]>>;
    allowContractCallCaching: z.ZodOptional<z.ZodBoolean>;
    txIdIndexingEnabled: z.ZodOptional<z.ZodBoolean>;
    igpIndexingEnabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    relayChains: string;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
    db?: string | undefined;
    gasPaymentEnforcement?: string | ({
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.None | undefined;
    } | {
        payment: string | number;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
    } | {
        type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        gasFraction?: string | undefined;
    })[] | undefined;
    whitelist?: string | {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    blacklist?: string | {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    addressBlacklist?: string | undefined;
    transactionGasLimit?: string | number | undefined;
    skipTransactionGasLimitFor?: string | undefined;
    allowLocalCheckpointSyncers?: boolean | undefined;
    metricAppContexts?: string | {
        name: string;
        matchingList: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[];
    }[] | undefined;
    ismCacheConfigs?: string | {
        selector: {
            type: IsmCacheSelectorType.DefaultIsm;
        } | {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        };
        moduleTypes: ModuleType[];
        cachePolicy: IsmCachePolicy;
        chains?: string[] | undefined;
    }[] | undefined;
    allowContractCallCaching?: boolean | undefined;
    txIdIndexingEnabled?: boolean | undefined;
    igpIndexingEnabled?: boolean | undefined;
}, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    relayChains: string;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
    db?: string | undefined;
    gasPaymentEnforcement?: string | ({
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.None | undefined;
    } | {
        payment: string | number;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        type?: GasPaymentEnforcementPolicyType.Minimum | undefined;
    } | {
        type: GasPaymentEnforcementPolicyType.OnChainFeeQuoting;
        matchingList?: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[] | undefined;
        gasFraction?: string | undefined;
    })[] | undefined;
    whitelist?: string | {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    blacklist?: string | {
        messageId?: string | string[] | undefined;
        originDomain?: number | "*" | [number, ...number[]] | undefined;
        senderAddress?: string | string[] | undefined;
        destinationDomain?: number | "*" | [number, ...number[]] | undefined;
        recipientAddress?: string | string[] | undefined;
    }[] | undefined;
    addressBlacklist?: string | undefined;
    transactionGasLimit?: string | number | undefined;
    skipTransactionGasLimitFor?: string | undefined;
    allowLocalCheckpointSyncers?: boolean | undefined;
    metricAppContexts?: string | {
        name: string;
        matchingList: {
            messageId?: string | string[] | undefined;
            originDomain?: number | "*" | [number, ...number[]] | undefined;
            senderAddress?: string | string[] | undefined;
            destinationDomain?: number | "*" | [number, ...number[]] | undefined;
            recipientAddress?: string | string[] | undefined;
        }[];
    }[] | undefined;
    ismCacheConfigs?: string | {
        selector: {
            type: IsmCacheSelectorType.DefaultIsm;
        } | {
            type: IsmCacheSelectorType.AppContext;
            context: string;
        };
        moduleTypes: ModuleType[];
        cachePolicy: IsmCachePolicy;
        chains?: string[] | undefined;
    }[] | undefined;
    allowContractCallCaching?: boolean | undefined;
    txIdIndexingEnabled?: boolean | undefined;
    igpIndexingEnabled?: boolean | undefined;
}>;
export type RelayerConfig = z.infer<typeof RelayerAgentConfigSchema>;
export declare const ScraperAgentConfigSchema: z.ZodObject<{
    metricsPort: z.ZodOptional<z.ZodNumber>;
    chains: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
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
        merkleTreeHook: z.ZodString;
        interchainGasPaymaster: z.ZodString;
        name: z.ZodString;
        availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Disabled>;
            reasons: z.ZodArray<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainDisabledReason>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }>, z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Live>;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }>]>>;
        bech32Prefix: z.ZodOptional<z.ZodString>;
        blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            apiUrl: z.ZodString;
            apiKey: z.ZodOptional<z.ZodString>;
            family: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ExplorerFamily>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
        }, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk: z.ZodOptional<z.ZodNumber>;
            mode: z.ZodOptional<z.ZodNativeEnum<typeof AgentIndexMode>>;
        }, "strip", z.ZodTypeAny, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }>>;
        isTestnet: z.ZodOptional<z.ZodBoolean>;
        logoURI: z.ZodOptional<z.ZodString>;
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
        technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainTechnicalStack>>;
        transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        signer: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }>, z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
            id: z.ZodString;
            region: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
            prefix: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Node>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Node;
        }, {
            type: AgentSignerKeyType.Node;
        }>]>>;
        mailbox: z.ZodString;
        interchainSecurityModule: z.ZodOptional<z.ZodString>;
        validatorAnnounce: z.ZodString;
        canonicalAsset: z.ZodOptional<z.ZodString>;
        contractAddressBytes: z.ZodOptional<z.ZodNumber>;
        customRpcUrls: z.ZodOptional<z.ZodString>;
        rpcConsensusType: z.ZodOptional<z.ZodNativeEnum<typeof RpcConsensusType>>;
        priorityFeeOracle: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
            url: z.ZodString;
            feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
            fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }>]>>>;
        transactionSubmitter: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>;
    defaultSigner: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>>;
    log: z.ZodOptional<z.ZodObject<{
        format: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogFormat>>;
        level: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogLevel>>;
    }, "strip", z.ZodTypeAny, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }>>;
    db: z.ZodString;
    chainsToScrape: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    db: string;
    chainsToScrape: string;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
}, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    db: string;
    chainsToScrape: string;
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
}>;
export type ScraperConfig = z.infer<typeof ScraperAgentConfigSchema>;
export declare const ValidatorAgentConfigSchema: z.ZodObject<{
    metricsPort: z.ZodOptional<z.ZodNumber>;
    chains: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodObject<{
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
        merkleTreeHook: z.ZodString;
        interchainGasPaymaster: z.ZodString;
        name: z.ZodString;
        availability: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Disabled>;
            reasons: z.ZodArray<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainDisabledReason>, "many">;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        }>, z.ZodObject<{
            status: z.ZodLiteral<import("@hyperlane-xyz/sdk").ChainStatus.Live>;
        }, "strip", z.ZodTypeAny, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }, {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        }>]>>;
        bech32Prefix: z.ZodOptional<z.ZodString>;
        blockExplorers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            apiUrl: z.ZodString;
            apiKey: z.ZodOptional<z.ZodString>;
            family: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ExplorerFamily>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
        }, {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk: z.ZodOptional<z.ZodNumber>;
            mode: z.ZodOptional<z.ZodNativeEnum<typeof AgentIndexMode>>;
        }, "strip", z.ZodTypeAny, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }, {
            from?: number | undefined;
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
        }>>;
        isTestnet: z.ZodOptional<z.ZodBoolean>;
        logoURI: z.ZodOptional<z.ZodString>;
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
        technicalStack: z.ZodOptional<z.ZodNativeEnum<typeof import("@hyperlane-xyz/sdk").ChainTechnicalStack>>;
        transactionOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        signer: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }, {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        }>, z.ZodObject<{
            type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
            id: z.ZodString;
            region: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }, {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
            prefix: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }, {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSignerKeyType.Node>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSignerKeyType.Node;
        }, {
            type: AgentSignerKeyType.Node;
        }>]>>;
        mailbox: z.ZodString;
        interchainSecurityModule: z.ZodOptional<z.ZodString>;
        validatorAnnounce: z.ZodString;
        canonicalAsset: z.ZodOptional<z.ZodString>;
        contractAddressBytes: z.ZodOptional<z.ZodNumber>;
        customRpcUrls: z.ZodOptional<z.ZodString>;
        rpcConsensusType: z.ZodOptional<z.ZodNativeEnum<typeof RpcConsensusType>>;
        priorityFeeOracle: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Helius>;
            url: z.ZodString;
            feeLevel: z.ZodNativeEnum<typeof AgentSealevelHeliusFeeLevel>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        }>, z.ZodObject<{
            type: z.ZodLiteral<AgentSealevelPriorityFeeOracleType.Constant>;
            fee: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }, {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        }>]>>>;
        transactionSubmitter: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            type: z.ZodNativeEnum<typeof AgentSealevelTransactionSubmitterType>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }, {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>, Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>>;
    defaultSigner: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>>;
    log: z.ZodOptional<z.ZodObject<{
        format: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogFormat>>;
        level: z.ZodOptional<z.ZodNativeEnum<typeof AgentLogLevel>>;
    }, "strip", z.ZodTypeAny, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }, {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    }>>;
    db: z.ZodOptional<z.ZodString>;
    originChainName: z.ZodString;
    validator: z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Hex>>;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }, {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    }>, z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<AgentSignerKeyType.Aws>>;
        id: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }, {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Cosmos>;
        prefix: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }, {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<AgentSignerKeyType.Node>;
    }, "strip", z.ZodTypeAny, {
        type: AgentSignerKeyType.Node;
    }, {
        type: AgentSignerKeyType.Node;
    }>]>;
    checkpointSyncer: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"localStorage">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "localStorage";
    }, {
        path: string;
        type: "localStorage";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"s3">;
        bucket: z.ZodString;
        region: z.ZodString;
        folder: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "s3";
        region: string;
        bucket: string;
        folder?: string | undefined;
    }, {
        type: "s3";
        region: string;
        bucket: string;
        folder?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"gcs">;
        bucket: z.ZodString;
        folder: z.ZodOptional<z.ZodString>;
        service_account_key: z.ZodOptional<z.ZodString>;
        user_secrets: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "gcs";
        bucket: string;
        folder?: string | undefined;
        service_account_key?: string | undefined;
        user_secrets?: string | undefined;
    }, {
        type: "gcs";
        bucket: string;
        folder?: string | undefined;
        service_account_key?: string | undefined;
        user_secrets?: string | undefined;
    }>]>;
    interval: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    originChainName: string;
    validator: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | ({
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } & {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }) | ({
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } & {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    });
    checkpointSyncer: {
        path: string;
        type: "localStorage";
    } | {
        type: "s3";
        region: string;
        bucket: string;
        folder?: string | undefined;
    } | {
        type: "gcs";
        bucket: string;
        folder?: string | undefined;
        service_account_key?: string | undefined;
        user_secrets?: string | undefined;
    };
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
    db?: string | undefined;
    interval?: number | undefined;
}, {
    chains: Record<string, {
        merkleTreeHook: string;
        interchainGasPaymaster: string;
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
        mailbox: string;
        validatorAnnounce: string;
        gasPrice?: {
            denom: string;
            amount: string;
        } | undefined;
        availability?: {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Disabled;
            reasons: import("@hyperlane-xyz/sdk").ChainDisabledReason[];
        } | {
            status: import("@hyperlane-xyz/sdk").ChainStatus.Live;
        } | undefined;
        bech32Prefix?: string | undefined;
        blockExplorers?: {
            name: string;
            url: string;
            apiUrl: string;
            apiKey?: string | undefined;
            family?: import("@hyperlane-xyz/sdk").ExplorerFamily | undefined;
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
            chunk?: number | undefined;
            mode?: AgentIndexMode | undefined;
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
        technicalStack?: import("@hyperlane-xyz/sdk").ChainTechnicalStack | undefined;
        transactionOverrides?: Record<string, any> | undefined;
        signer?: {
            key: string;
            type?: AgentSignerKeyType.Hex | undefined;
        } | {
            id: string;
            region: string;
            type?: AgentSignerKeyType.Aws | undefined;
        } | {
            type: AgentSignerKeyType.Cosmos;
            key: string;
            prefix: string;
        } | {
            type: AgentSignerKeyType.Node;
        } | undefined;
        interchainSecurityModule?: string | undefined;
        canonicalAsset?: string | undefined;
        contractAddressBytes?: number | undefined;
        customRpcUrls?: string | undefined;
        rpcConsensusType?: RpcConsensusType | undefined;
        priorityFeeOracle?: {
            type: AgentSealevelPriorityFeeOracleType.Helius;
            url: string;
            feeLevel: AgentSealevelHeliusFeeLevel;
        } | {
            type: AgentSealevelPriorityFeeOracleType.Constant;
            fee: string | number;
        } | undefined;
        transactionSubmitter?: {
            type: AgentSealevelTransactionSubmitterType;
            url?: string | undefined;
        } | undefined;
    }>;
    originChainName: string;
    validator: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | ({
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } & {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    }) | ({
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } & {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    });
    checkpointSyncer: {
        path: string;
        type: "localStorage";
    } | {
        type: "s3";
        region: string;
        bucket: string;
        folder?: string | undefined;
    } | {
        type: "gcs";
        bucket: string;
        folder?: string | undefined;
        service_account_key?: string | undefined;
        user_secrets?: string | undefined;
    };
    metricsPort?: number | undefined;
    defaultSigner?: {
        key: string;
        type?: AgentSignerKeyType.Hex | undefined;
    } | {
        id: string;
        region: string;
        type?: AgentSignerKeyType.Aws | undefined;
    } | {
        type: AgentSignerKeyType.Cosmos;
        key: string;
        prefix: string;
    } | {
        type: AgentSignerKeyType.Node;
    } | undefined;
    log?: {
        format?: AgentLogFormat | undefined;
        level?: AgentLogLevel | undefined;
    } | undefined;
    db?: string | undefined;
    interval?: number | undefined;
}>;
export type ValidatorConfig = z.infer<typeof ValidatorAgentConfigSchema>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;
export declare function buildAgentConfig(chains: ChainName[], multiProvider: MultiProvider, addresses: ChainMap<HyperlaneDeploymentArtifacts>, startBlocks: ChainMap<number | undefined>, additionalConfig?: ChainMap<any>): AgentConfig;
export {};
//# sourceMappingURL=agentConfig.d.ts.map