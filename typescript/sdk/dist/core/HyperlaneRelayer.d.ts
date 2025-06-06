import { ethers, providers } from 'ethers';
import { Logger } from 'pino';
import { z } from 'zod';
import { Address, ParsedMessage } from '@hyperlane-xyz/utils';
import { DerivedHookConfig } from '../hook/types.js';
import { BaseMetadataBuilder } from '../ism/metadata/builder.js';
import { DerivedIsmConfig } from '../ism/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../types.js';
import { HyperlaneCore } from './HyperlaneCore.js';
import { DispatchedMessage } from './types.js';
export declare const RelayerCacheSchema: z.ZodObject<{
    hook: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<import("../hook/types.js").HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<import("../hook/types.js").HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<import("../hook/types.js").HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../hook/types.js").HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }, {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<import("../hook/types.js").HookType.INTERCHAIN_GAS_PAYMASTER>;
        beneficiary: z.ZodString;
        oracleKey: z.ZodString;
        overhead: z.ZodRecord<z.ZodString, z.ZodNumber>;
        oracleConfig: z.ZodRecord<z.ZodString, z.ZodObject<{
            gasPrice: z.ZodString;
            tokenExchangeRate: z.ZodString;
            tokenDecimals: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: import("../hook/types.js").HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodType<import("../hook/types.js").DomainRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").DomainRoutingHookConfig>, z.ZodType<import("../hook/types.js").FallbackRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").FallbackRoutingHookConfig>, z.ZodType<import("../hook/types.js").AmountRoutingHookConfig, z.ZodTypeDef, import("../hook/types.js").AmountRoutingHookConfig>, z.ZodType<import("../hook/types.js").AggregationHookConfig, z.ZodTypeDef, import("../hook/types.js").AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<import("../hook/types.js").HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../hook/types.js").HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }, {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../hook/types.js").HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }, {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }>]>, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>>;
    ism: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodIntersection<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.TEST_ISM>;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }, {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.OP_STACK>;
        origin: z.ZodString;
        nativeBridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }, {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }>, z.ZodIntersection<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }, {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }>>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.TRUSTED_RELAYER>;
        relayer: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }, {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.CCIP>;
        originChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }, {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodString, "many">;
        threshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: string[];
        threshold: number;
    }, {
        validators: string[];
        threshold: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }, {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }>>, z.ZodIntersection<z.ZodObject<{
        validators: z.ZodArray<z.ZodObject<{
            signingAddress: z.ZodString;
            weight: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            signingAddress: string;
            weight: number;
        }, {
            signingAddress: string;
            weight: number;
        }>, "many">;
        thresholdWeight: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }, {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    }>, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }, {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }>>, z.ZodType<import("../ism/types.js").RoutingIsmConfig, z.ZodTypeDef, import("../ism/types.js").RoutingIsmConfig>, z.ZodType<import("../ism/types.js").AggregationIsmConfig, z.ZodTypeDef, import("../ism/types.js").AggregationIsmConfig>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.ARB_L2_TO_L1>;
        bridge: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }, {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<import("../ism/types.js").IsmType.CCIP_READ>;
    }, "strip", z.ZodTypeAny, {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }, {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }>]>, z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>>>>;
    backlog: z.ZodArray<z.ZodObject<{
        attempts: z.ZodNumber;
        lastAttempt: z.ZodNumber;
        message: z.ZodString;
        dispatchTx: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        dispatchTx: string;
        attempts: number;
        lastAttempt: number;
    }, {
        message: string;
        dispatchTx: string;
        attempts: number;
        lastAttempt: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    hook: Record<string, Record<string, (string | {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } | {
        type: import("../hook/types.js").HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } | {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig) & {
        address: string;
    }>>;
    ism: Record<string, Record<string, (string | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } | {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig) & {
        address: string;
    }>>;
    backlog: {
        message: string;
        dispatchTx: string;
        attempts: number;
        lastAttempt: number;
    }[];
}, {
    hook: Record<string, Record<string, (string | {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } | {
        type: import("../hook/types.js").HookType.INTERCHAIN_GAS_PAYMASTER;
        owner: string;
        beneficiary: string;
        oracleKey: string;
        overhead: Record<string, number>;
        oracleConfig: Record<string, {
            gasPrice: string;
            tokenExchangeRate: string;
            tokenDecimals?: number | undefined;
        }>;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } | {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig) & {
        address: string;
    }>>;
    ism: Record<string, Record<string, (string | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } | {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } | {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } | {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } | {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig) & {
        address: string;
    }>>;
    backlog: {
        message: string;
        dispatchTx: string;
        attempts: number;
        lastAttempt: number;
    }[];
}>;
type RelayerCache = z.infer<typeof RelayerCacheSchema>;
type MessageWhitelist = ChainMap<Set<Address>>;
export declare function messageMatchesWhitelist(whitelist: MessageWhitelist, message: ParsedMessage): boolean;
export declare class HyperlaneRelayer {
    protected multiProvider: MultiProvider;
    protected metadataBuilder: BaseMetadataBuilder;
    protected readonly core: HyperlaneCore;
    protected readonly retryTimeout: number;
    protected readonly whitelist: ChainMap<Set<Address>> | undefined;
    backlog: RelayerCache['backlog'];
    cache: RelayerCache | undefined;
    protected stopRelayingHandler: ((chains?: ChainName[]) => void) | undefined;
    readonly logger: Logger;
    constructor({ core, caching, retryTimeout, whitelist, }: {
        core: HyperlaneCore;
        caching?: boolean;
        retryTimeout?: number;
        whitelist?: ChainMap<Address[]>;
    });
    getHookConfig(chain: ChainName, hook: Address, messageContext?: DispatchedMessage): Promise<DerivedHookConfig>;
    getIsmConfig(chain: ChainName, ism: Address, messageContext?: DispatchedMessage): Promise<DerivedIsmConfig>;
    getSenderHookConfig(message: DispatchedMessage): Promise<DerivedHookConfig>;
    getRecipientIsmConfig(message: DispatchedMessage): Promise<DerivedIsmConfig>;
    relayAll(dispatchTx: providers.TransactionReceipt, messages?: DispatchedMessage[]): Promise<ChainMap<ethers.ContractReceipt[]>>;
    relayMessage(dispatchTx: providers.TransactionReceipt, messageIndex?: number, message?: DispatchedMessage): Promise<ethers.ContractReceipt>;
    hydrate(cache: RelayerCache): void;
    hydrateDefaults(): Promise<void>;
    protected flushBacklog(): Promise<void>;
    protected whitelistChains(): string[] | undefined;
    start(): void;
    stop(): void;
}
export {};
//# sourceMappingURL=HyperlaneRelayer.d.ts.map