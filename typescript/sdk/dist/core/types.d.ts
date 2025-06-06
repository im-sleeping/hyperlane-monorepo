import { z } from 'zod';
import type { Mailbox } from '@hyperlane-xyz/core';
import type { Address, ParsedMessage } from '@hyperlane-xyz/utils';
import type { UpgradeConfig } from '../deploy/proxy.js';
import type { CheckerViolation } from '../deploy/types.js';
import type { IsmConfig } from '../ism/types.js';
import type { ChainName } from '../types.js';
export declare const CoreConfigSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    defaultIsm: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    defaultHook: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    requiredHook: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    interchainAccountRouter: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        mailbox: z.ZodString;
        proxyAdmin: z.ZodObject<{
            address: z.ZodOptional<z.ZodString>;
            owner: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            owner: string;
            address?: string | undefined;
        }, {
            owner: string;
            address?: string | undefined;
        }>;
        remoteIcaRouters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            address: z.ZodString;
            interchainSecurityModule: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        proxyAdmin: {
            owner: string;
            address?: string | undefined;
        };
        mailbox: string;
        remoteIcaRouters?: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }> | undefined;
    }, {
        owner: string;
        proxyAdmin: {
            owner: string;
            address?: string | undefined;
        };
        mailbox: string;
        remoteIcaRouters?: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    defaultHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string);
    defaultIsm: string | ({
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
    } | import("../ism/types.js").IcaRoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | (string & {
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | (string & {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }) | (string & {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | (string & {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }) | (string & import("../ism/types.js").IcaRoutingIsmConfig) | (string & {
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | (string & {
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (string & import("../ism/types.js").AggregationIsmConfig) | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    } & string) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } & string) | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    } & string) | ({
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } & string) | (import("../ism/types.js").IcaRoutingIsmConfig & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    } & string) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (import("../ism/types.js").AggregationIsmConfig & string);
    requiredHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string);
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    interchainAccountRouter?: {
        owner: string;
        proxyAdmin: {
            owner: string;
            address?: string | undefined;
        };
        mailbox: string;
        remoteIcaRouters?: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }> | undefined;
    } | undefined;
}, {
    owner: string;
    defaultHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string) | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string);
    defaultIsm: string | ({
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
    } | import("../ism/types.js").IcaRoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | (string & import("../ism/types.js").IcaRoutingIsmConfig) | (string & {
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | (string & {
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (string & import("../ism/types.js").AggregationIsmConfig) | (import("../ism/types.js").IcaRoutingIsmConfig & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    } & string) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (import("../ism/types.js").AggregationIsmConfig & string) | (string & {
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | (string & {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }) | (string & {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | (string & {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }) | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    } & string) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } & string) | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    } & string) | ({
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } & string);
    requiredHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string) | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string);
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    interchainAccountRouter?: {
        owner: string;
        proxyAdmin: {
            owner: string;
            address?: string | undefined;
        };
        mailbox: string;
        remoteIcaRouters?: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }> | undefined;
    } | undefined;
}>;
export declare const DerivedCoreConfigSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    defaultHook: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    proxyAdmin: z.ZodOptional<z.ZodObject<{
        owner: z.ZodString;
        ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }, {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    }>>;
    defaultIsm: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    requiredHook: z.ZodUnion<[z.ZodString, z.ZodObject<{
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
    }>]>;
    interchainAccountRouter: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        owner: z.ZodString;
        mailbox: z.ZodString;
        proxyAdmin: z.ZodObject<{
            owner: z.ZodString;
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            owner: string;
            address: string;
        }, {
            owner: string;
            address: string;
        }>;
        remoteIcaRouters: z.ZodRecord<z.ZodString, z.ZodObject<{
            address: z.ZodString;
            interchainSecurityModule: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        owner: string;
        address: string;
        proxyAdmin: {
            owner: string;
            address: string;
        };
        mailbox: string;
        remoteIcaRouters: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>;
    }, {
        owner: string;
        address: string;
        proxyAdmin: {
            owner: string;
            address: string;
        };
        mailbox: string;
        remoteIcaRouters: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>;
    }>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    defaultHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string);
    defaultIsm: string | ({
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
    } | import("../ism/types.js").IcaRoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | (string & {
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | (string & {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }) | (string & {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | (string & {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }) | (string & import("../ism/types.js").IcaRoutingIsmConfig) | (string & {
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | (string & {
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (string & import("../ism/types.js").AggregationIsmConfig) | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    } & string) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } & string) | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    } & string) | ({
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } & string) | (import("../ism/types.js").IcaRoutingIsmConfig & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    } & string) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (import("../ism/types.js").AggregationIsmConfig & string);
    requiredHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string);
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    interchainAccountRouter?: {
        owner: string;
        address: string;
        proxyAdmin: {
            owner: string;
            address: string;
        };
        mailbox: string;
        remoteIcaRouters: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>;
    } | undefined;
}, {
    owner: string;
    defaultHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string) | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string);
    defaultIsm: string | ({
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
    } | import("../ism/types.js").IcaRoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig | (string & import("../ism/types.js").IcaRoutingIsmConfig) | (string & {
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | (string & {
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (string & import("../ism/types.js").AggregationIsmConfig) | (import("../ism/types.js").IcaRoutingIsmConfig & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ROUTING | import("../ism/types.js").IsmType.FALLBACK_ROUTING;
    } & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig>;
    }) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    } & string) | ({
        type: import("../ism/types.js").IsmType.AMOUNT_ROUTING;
    } & {
        lowerIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        upperIsm: string | ({
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
        } | import("../ism/types.js").RoutingIsmConfig | import("../ism/types.js").AggregationIsmConfig;
        threshold: number;
    }) | (import("../ism/types.js").AggregationIsmConfig & string) | (string & {
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    }) | (string & {
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TEST_ISM;
    }) | (string & {
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    }) | (string & {
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    }) | (string & {
        type: import("../ism/types.js").IsmType.CCIP_READ;
    }) | ({
        validators: string[];
        threshold: number;
    } & {
        type: import("../ism/types.js").IsmType.MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.MESSAGE_ID_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.STORAGE_MESSAGE_ID_MULTISIG;
    } & string) | ({
        validators: {
            signingAddress: string;
            weight: number;
        }[];
        thresholdWeight: number;
    } & {
        type: import("../ism/types.js").IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | import("../ism/types.js").IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TEST_ISM;
    } & string) | ({
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        type: import("../ism/types.js").IsmType.PAUSABLE;
    } & string) | ({
        type: import("../ism/types.js").IsmType.OP_STACK;
        origin: string;
        nativeBridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.TRUSTED_RELAYER;
        relayer: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP;
        originChain: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.ARB_L2_TO_L1;
        bridge: string;
    } & string) | ({
        type: import("../ism/types.js").IsmType.CCIP_READ;
    } & string);
    requiredHook: string | {
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
    } | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | (string & {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (string & import("../hook/types.js").AmountRoutingHookConfig) | (string & import("../hook/types.js").AggregationHookConfig) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.ROUTING;
    }) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    } & string) | ({
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & {
        domains: import("../types.js").ChainMap<string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig>;
    } & {
        type: import("../hook/types.js").HookType.FALLBACK_ROUTING;
        fallback: string | {
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
        } | import("../hook/types.js").DomainRoutingHookConfig | import("../hook/types.js").FallbackRoutingHookConfig | import("../hook/types.js").AmountRoutingHookConfig | import("../hook/types.js").AggregationHookConfig;
    }) | (import("../hook/types.js").AmountRoutingHookConfig & string) | (import("../hook/types.js").AggregationHookConfig & string) | (string & {
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    }) | (string & {
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
    }) | (string & {
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    }) | (string & {
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    }) | (string & {
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    }) | (string & {
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    }) | ({
        type: import("../hook/types.js").HookType.MERKLE_TREE;
    } & string) | ({
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
    } & string) | ({
        type: import("../hook/types.js").HookType.PROTOCOL_FEE;
        owner: string;
        protocolFee: string;
        beneficiary: string;
        maxProtocolFee: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.PAUSABLE;
        owner: string;
        paused: boolean;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.OP_STACK;
        owner: string;
        nativeBridge: string;
        destinationChain: string;
        ownerOverrides?: Record<string, string> | undefined;
    } & string) | ({
        type: import("../hook/types.js").HookType.ARB_L2_TO_L1;
        destinationChain: string;
        arbSys: string;
        bridge?: string | undefined;
        childHook?: any;
    } & string) | ({
        type: import("../hook/types.js").HookType.MAILBOX_DEFAULT;
    } & string) | ({
        type: import("../hook/types.js").HookType.CCIP;
        destinationChain: string;
    } & string);
    ownerOverrides?: Record<string, string> | undefined;
    proxyAdmin?: {
        owner: string;
        ownerOverrides?: Record<string, string> | undefined;
        address?: string | undefined;
    } | undefined;
    interchainAccountRouter?: {
        owner: string;
        address: string;
        proxyAdmin: {
            owner: string;
            address: string;
        };
        mailbox: string;
        remoteIcaRouters: Record<string, {
            address: string;
            interchainSecurityModule?: string | undefined;
        }>;
    } | undefined;
}>;
export declare const DeployedCoreAddressesSchema: z.ZodObject<{
    staticMerkleRootMultisigIsmFactory: z.ZodString;
    staticMessageIdMultisigIsmFactory: z.ZodString;
    staticAggregationIsmFactory: z.ZodString;
    staticAggregationHookFactory: z.ZodString;
    domainRoutingIsmFactory: z.ZodString;
    staticMerkleRootWeightedMultisigIsmFactory: z.ZodString;
    staticMessageIdWeightedMultisigIsmFactory: z.ZodString;
    mailbox: z.ZodString;
    validatorAnnounce: z.ZodString;
    proxyAdmin: z.ZodString;
    testRecipient: z.ZodString;
    timelockController: z.ZodOptional<z.ZodString>;
    interchainAccountRouter: z.ZodString;
    interchainAccountIsm: z.ZodString;
    merkleTreeHook: z.ZodOptional<z.ZodString>;
    interchainGasPaymaster: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    proxyAdmin: string;
    staticMerkleRootMultisigIsmFactory: string;
    staticMessageIdMultisigIsmFactory: string;
    staticAggregationIsmFactory: string;
    staticAggregationHookFactory: string;
    domainRoutingIsmFactory: string;
    staticMerkleRootWeightedMultisigIsmFactory: string;
    staticMessageIdWeightedMultisigIsmFactory: string;
    mailbox: string;
    interchainAccountRouter: string;
    validatorAnnounce: string;
    testRecipient: string;
    interchainAccountIsm: string;
    timelockController?: string | undefined;
    merkleTreeHook?: string | undefined;
    interchainGasPaymaster?: string | undefined;
}, {
    proxyAdmin: string;
    staticMerkleRootMultisigIsmFactory: string;
    staticMessageIdMultisigIsmFactory: string;
    staticAggregationIsmFactory: string;
    staticAggregationHookFactory: string;
    domainRoutingIsmFactory: string;
    staticMerkleRootWeightedMultisigIsmFactory: string;
    staticMessageIdWeightedMultisigIsmFactory: string;
    mailbox: string;
    interchainAccountRouter: string;
    validatorAnnounce: string;
    testRecipient: string;
    interchainAccountIsm: string;
    timelockController?: string | undefined;
    merkleTreeHook?: string | undefined;
    interchainGasPaymaster?: string | undefined;
}>;
export type DeployedCoreAddresses = z.infer<typeof DeployedCoreAddressesSchema>;
export type CoreConfig = z.infer<typeof CoreConfigSchema> & {
    remove?: boolean;
    upgrade?: UpgradeConfig;
};
export type DerivedCoreConfig = z.infer<typeof DerivedCoreConfigSchema>;
export declare enum CoreViolationType {
    Mailbox = "Mailbox",
    ConnectionManager = "ConnectionManager",
    ValidatorAnnounce = "ValidatorAnnounce"
}
export declare enum MailboxViolationType {
    DefaultIsm = "DefaultIsm",
    NotProxied = "NotProxied"
}
export interface MailboxViolation extends CheckerViolation {
    type: CoreViolationType.Mailbox;
    subType: MailboxViolationType;
    contract: Mailbox;
}
export interface MailboxMultisigIsmViolation extends MailboxViolation {
    actual: Address;
    expected: IsmConfig;
}
export interface ValidatorAnnounceViolation extends CheckerViolation {
    type: CoreViolationType.ValidatorAnnounce;
    chain: ChainName;
    validator: Address;
    actual: boolean;
    expected: boolean;
}
export type DispatchedMessage = {
    id: string;
    message: string;
    parsed: ParsedMessage;
};
//# sourceMappingURL=types.d.ts.map