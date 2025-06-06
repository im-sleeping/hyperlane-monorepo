import { z } from 'zod';
import { Address, WithAddress } from '@hyperlane-xyz/utils';
import { ChainMap, OwnableConfig } from '../types.js';
export declare enum OnchainHookType {
    UNUSED = 0,
    ROUTING = 1,
    AGGREGATION = 2,
    MERKLE_TREE = 3,
    INTERCHAIN_GAS_PAYMASTER = 4,
    FALLBACK_ROUTING = 5,
    ID_AUTH_ISM = 6,
    PAUSABLE = 7,
    PROTOCOL_FEE = 8,
    LAYER_ZERO_V1 = 9,
    RATE_LIMITED = 10,
    ARB_L2_TO_L1 = 11,
    OP_L2_TO_L1 = 12,
    MAILBOX_DEFAULT_HOOK = 13,
    AMOUNT_ROUTING = 14
}
export declare enum HookType {
    CUSTOM = "custom",
    MERKLE_TREE = "merkleTreeHook",
    INTERCHAIN_GAS_PAYMASTER = "interchainGasPaymaster",
    AGGREGATION = "aggregationHook",
    PROTOCOL_FEE = "protocolFee",
    OP_STACK = "opStackHook",
    ROUTING = "domainRoutingHook",
    FALLBACK_ROUTING = "fallbackRoutingHook",
    AMOUNT_ROUTING = "amountRoutingHook",
    PAUSABLE = "pausableHook",
    ARB_L2_TO_L1 = "arbL2ToL1Hook",
    MAILBOX_DEFAULT = "defaultHook",
    CCIP = "ccipHook"
}
export declare const HookTypeToContractNameMap: Record<Exclude<HookType, HookType.CUSTOM>, string>;
export type MerkleTreeHookConfig = z.infer<typeof MerkleTreeSchema>;
export type IgpHookConfig = z.infer<typeof IgpSchema>;
export type ProtocolFeeHookConfig = z.infer<typeof ProtocolFeeSchema>;
export type PausableHookConfig = z.infer<typeof PausableHookSchema>;
export type OpStackHookConfig = z.infer<typeof OpStackHookSchema>;
export type ArbL2ToL1HookConfig = z.infer<typeof ArbL2ToL1HookSchema>;
export type MailboxDefaultHookConfig = z.infer<typeof MailboxDefaultHookSchema>;
export type CCIPHookConfig = z.infer<typeof CCIPHookSchema>;
export type AggregationHookConfig = {
    type: HookType.AGGREGATION;
    hooks: Array<HookConfig>;
};
export type RoutingHookConfig = OwnableConfig & {
    domains: ChainMap<HookConfig>;
};
export type DomainRoutingHookConfig = RoutingHookConfig & {
    type: HookType.ROUTING;
};
export type FallbackRoutingHookConfig = RoutingHookConfig & {
    type: HookType.FALLBACK_ROUTING;
    fallback: HookConfig;
};
export type AmountRoutingHookConfig = {
    type: HookType.AMOUNT_ROUTING;
    threshold: number;
    lowerHook: HookConfig;
    upperHook: HookConfig;
};
export type HookConfig = z.infer<typeof HookConfigSchema>;
export type DerivedHookConfig = WithAddress<Exclude<HookConfig, Address>>;
export declare const MUTABLE_HOOK_TYPE: HookType[];
export declare const ProtocolFeeSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
    beneficiary: z.ZodString;
    maxProtocolFee: z.ZodString;
    protocolFee: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.PROTOCOL_FEE;
    owner: string;
    protocolFee: string;
    beneficiary: string;
    maxProtocolFee: string;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.PROTOCOL_FEE;
    owner: string;
    protocolFee: string;
    beneficiary: string;
    maxProtocolFee: string;
    ownerOverrides?: Record<string, string> | undefined;
}>;
export declare const MerkleTreeSchema: z.ZodObject<{
    type: z.ZodLiteral<HookType.MERKLE_TREE>;
}, "strip", z.ZodTypeAny, {
    type: HookType.MERKLE_TREE;
}, {
    type: HookType.MERKLE_TREE;
}>;
export declare const PausableHookSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    paused: z.ZodBoolean;
    type: z.ZodLiteral<HookType.PAUSABLE>;
}, "strip", z.ZodTypeAny, {
    type: HookType.PAUSABLE;
    owner: string;
    paused: boolean;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.PAUSABLE;
    owner: string;
    paused: boolean;
    ownerOverrides?: Record<string, string> | undefined;
}>;
export declare const MailboxDefaultHookSchema: z.ZodObject<{
    type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
}, "strip", z.ZodTypeAny, {
    type: HookType.MAILBOX_DEFAULT;
}, {
    type: HookType.MAILBOX_DEFAULT;
}>;
export declare const OpStackHookSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.OP_STACK>;
    nativeBridge: z.ZodString;
    destinationChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.OP_STACK;
    owner: string;
    nativeBridge: string;
    destinationChain: string;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.OP_STACK;
    owner: string;
    nativeBridge: string;
    destinationChain: string;
    ownerOverrides?: Record<string, string> | undefined;
}>;
export declare const ArbL2ToL1HookSchema: z.ZodObject<{
    type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
    arbSys: z.ZodString;
    bridge: z.ZodOptional<z.ZodString>;
    destinationChain: z.ZodString;
    childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
}, "strip", z.ZodTypeAny, {
    type: HookType.ARB_L2_TO_L1;
    destinationChain: string;
    arbSys: string;
    bridge?: string | undefined;
    childHook?: any;
}, {
    type: HookType.ARB_L2_TO_L1;
    destinationChain: string;
    arbSys: string;
    bridge?: string | undefined;
    childHook?: any;
}>;
export declare const IgpSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
    type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
}>;
export declare const DomainRoutingHookConfigSchema: z.ZodSchema<DomainRoutingHookConfig>;
export declare const FallbackRoutingHookConfigSchema: z.ZodSchema<FallbackRoutingHookConfig>;
export declare const AmountRoutingHookConfigSchema: z.ZodSchema<AmountRoutingHookConfig>;
export declare const AggregationHookConfigSchema: z.ZodSchema<AggregationHookConfig>;
export declare const CCIPHookSchema: z.ZodObject<{
    type: z.ZodLiteral<HookType.CCIP>;
    destinationChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.CCIP;
    destinationChain: string;
}, {
    type: HookType.CCIP;
    destinationChain: string;
}>;
export declare const HookConfigSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
    beneficiary: z.ZodString;
    maxProtocolFee: z.ZodString;
    protocolFee: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.PROTOCOL_FEE;
    owner: string;
    protocolFee: string;
    beneficiary: string;
    maxProtocolFee: string;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.PROTOCOL_FEE;
    owner: string;
    protocolFee: string;
    beneficiary: string;
    maxProtocolFee: string;
    ownerOverrides?: Record<string, string> | undefined;
}>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    paused: z.ZodBoolean;
    type: z.ZodLiteral<HookType.PAUSABLE>;
}, "strip", z.ZodTypeAny, {
    type: HookType.PAUSABLE;
    owner: string;
    paused: boolean;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.PAUSABLE;
    owner: string;
    paused: boolean;
    ownerOverrides?: Record<string, string> | undefined;
}>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.OP_STACK>;
    nativeBridge: z.ZodString;
    destinationChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.OP_STACK;
    owner: string;
    nativeBridge: string;
    destinationChain: string;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    type: HookType.OP_STACK;
    owner: string;
    nativeBridge: string;
    destinationChain: string;
    ownerOverrides?: Record<string, string> | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<HookType.MERKLE_TREE>;
}, "strip", z.ZodTypeAny, {
    type: HookType.MERKLE_TREE;
}, {
    type: HookType.MERKLE_TREE;
}>, z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
    type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
}>, z.ZodType<DomainRoutingHookConfig, z.ZodTypeDef, DomainRoutingHookConfig>, z.ZodType<FallbackRoutingHookConfig, z.ZodTypeDef, FallbackRoutingHookConfig>, z.ZodType<AmountRoutingHookConfig, z.ZodTypeDef, AmountRoutingHookConfig>, z.ZodType<AggregationHookConfig, z.ZodTypeDef, AggregationHookConfig>, z.ZodObject<{
    type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
    arbSys: z.ZodString;
    bridge: z.ZodOptional<z.ZodString>;
    destinationChain: z.ZodString;
    childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
}, "strip", z.ZodTypeAny, {
    type: HookType.ARB_L2_TO_L1;
    destinationChain: string;
    arbSys: string;
    bridge?: string | undefined;
    childHook?: any;
}, {
    type: HookType.ARB_L2_TO_L1;
    destinationChain: string;
    arbSys: string;
    bridge?: string | undefined;
    childHook?: any;
}>, z.ZodObject<{
    type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
}, "strip", z.ZodTypeAny, {
    type: HookType.MAILBOX_DEFAULT;
}, {
    type: HookType.MAILBOX_DEFAULT;
}>, z.ZodObject<{
    type: z.ZodLiteral<HookType.CCIP>;
    destinationChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: HookType.CCIP;
    destinationChain: string;
}, {
    type: HookType.CCIP;
    destinationChain: string;
}>]>;
export declare const HooksConfigSchema: z.ZodObject<{
    default: z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }>, z.ZodType<DomainRoutingHookConfig, z.ZodTypeDef, DomainRoutingHookConfig>, z.ZodType<FallbackRoutingHookConfig, z.ZodTypeDef, FallbackRoutingHookConfig>, z.ZodType<AmountRoutingHookConfig, z.ZodTypeDef, AmountRoutingHookConfig>, z.ZodType<AggregationHookConfig, z.ZodTypeDef, AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>;
    required: z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }>, z.ZodType<DomainRoutingHookConfig, z.ZodTypeDef, DomainRoutingHookConfig>, z.ZodType<FallbackRoutingHookConfig, z.ZodTypeDef, FallbackRoutingHookConfig>, z.ZodType<AmountRoutingHookConfig, z.ZodTypeDef, AmountRoutingHookConfig>, z.ZodType<AggregationHookConfig, z.ZodTypeDef, AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>;
}, "strip", z.ZodTypeAny, {
    default: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string);
    required: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string);
}, {
    default: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string) | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string);
    required: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string) | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string);
}>;
export type HooksConfig = z.infer<typeof HooksConfigSchema>;
export declare const HooksConfigMapSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    default: z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }>, z.ZodType<DomainRoutingHookConfig, z.ZodTypeDef, DomainRoutingHookConfig>, z.ZodType<FallbackRoutingHookConfig, z.ZodTypeDef, FallbackRoutingHookConfig>, z.ZodType<AmountRoutingHookConfig, z.ZodTypeDef, AmountRoutingHookConfig>, z.ZodType<AggregationHookConfig, z.ZodTypeDef, AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>;
    required: z.ZodUnion<[z.ZodString, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.PROTOCOL_FEE>;
        beneficiary: z.ZodString;
        maxProtocolFee: z.ZodString;
        protocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        paused: z.ZodBoolean;
        type: z.ZodLiteral<HookType.PAUSABLE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.OP_STACK>;
        nativeBridge: z.ZodString;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }, {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MERKLE_TREE>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MERKLE_TREE;
    }, {
        type: HookType.MERKLE_TREE;
    }>, z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        type: z.ZodLiteral<HookType.INTERCHAIN_GAS_PAYMASTER>;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }>, z.ZodType<DomainRoutingHookConfig, z.ZodTypeDef, DomainRoutingHookConfig>, z.ZodType<FallbackRoutingHookConfig, z.ZodTypeDef, FallbackRoutingHookConfig>, z.ZodType<AmountRoutingHookConfig, z.ZodTypeDef, AmountRoutingHookConfig>, z.ZodType<AggregationHookConfig, z.ZodTypeDef, AggregationHookConfig>, z.ZodObject<{
        type: z.ZodLiteral<HookType.ARB_L2_TO_L1>;
        arbSys: z.ZodString;
        bridge: z.ZodOptional<z.ZodString>;
        destinationChain: z.ZodString;
        childHook: z.ZodLazy<z.ZodType<any, z.ZodTypeDef, any>>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }, {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.MAILBOX_DEFAULT>;
    }, "strip", z.ZodTypeAny, {
        type: HookType.MAILBOX_DEFAULT;
    }, {
        type: HookType.MAILBOX_DEFAULT;
    }>, z.ZodObject<{
        type: z.ZodLiteral<HookType.CCIP>;
        destinationChain: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: HookType.CCIP;
        destinationChain: string;
    }, {
        type: HookType.CCIP;
        destinationChain: string;
    }>]>;
}, "strip", z.ZodTypeAny, {
    default: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string);
    required: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string);
}, {
    default: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string) | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string);
    required: string | {
        type: HookType.MERKLE_TREE;
    } | {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } | {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } | {
        type: HookType.MAILBOX_DEFAULT;
    } | {
        type: HookType.CCIP;
        destinationChain: string;
    } | AmountRoutingHookConfig | AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (string & AmountRoutingHookConfig) | (string & AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: ChainMap<HookConfig>;
    } & {
        type: HookType.FALLBACK_ROUTING;
        fallback: HookConfig;
    }) | (AmountRoutingHookConfig & string) | (AggregationHookConfig & string) | (string & {
        type: HookType.MERKLE_TREE;
    }) | (string & {
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    }) | (string & {
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: HookType.MERKLE_TREE;
    } & string) | ({
        type: HookType.INTERCHAIN_GAS_PAYMASTER;
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
    } & string) | ({
        type: HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: HookType.CCIP;
        destinationChain: string;
    } & string);
}>>;
export type HooksConfigMap = z.infer<typeof HooksConfigMapSchema>;
//# sourceMappingURL=types.d.ts.map