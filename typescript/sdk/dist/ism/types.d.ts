import { z } from 'zod';
import { ArbL2ToL1Ism, CCIPIsm, IAggregationIsm, ICcipReadIsm, IInterchainSecurityModule, IMultisigIsm, IRoutingIsm, IStaticWeightedMultisigIsm, OPStackIsm, PausableIsm, TestIsm, TrustedRelayerIsm } from '@hyperlane-xyz/core';
import type { Address, Domain, ValueOf, WithAddress } from '@hyperlane-xyz/utils';
import { ChainMap, OwnableConfig } from '../types.js';
export declare enum ModuleType {
    UNUSED = 0,
    ROUTING = 1,
    AGGREGATION = 2,
    LEGACY_MULTISIG = 3,// DEPRECATED
    MERKLE_ROOT_MULTISIG = 4,
    MESSAGE_ID_MULTISIG = 5,
    NULL = 6,
    CCIP_READ = 7,
    ARB_L2_TO_L1 = 8,
    WEIGHTED_MERKLE_ROOT_MULTISIG = 9,
    WEIGHTED_MESSAGE_ID_MULTISIG = 10
}
export declare enum IsmType {
    CUSTOM = "custom",
    OP_STACK = "opStackIsm",
    ROUTING = "domainRoutingIsm",
    FALLBACK_ROUTING = "defaultFallbackRoutingIsm",
    ICA_ROUTING = "icaRoutingIsm",
    AMOUNT_ROUTING = "amountRoutingIsm",
    AGGREGATION = "staticAggregationIsm",
    STORAGE_AGGREGATION = "storageAggregationIsm",
    MERKLE_ROOT_MULTISIG = "merkleRootMultisigIsm",
    MESSAGE_ID_MULTISIG = "messageIdMultisigIsm",
    STORAGE_MERKLE_ROOT_MULTISIG = "storageMerkleRootMultisigIsm",
    STORAGE_MESSAGE_ID_MULTISIG = "storageMessageIdMultisigIsm",
    TEST_ISM = "testIsm",
    PAUSABLE = "pausableIsm",
    TRUSTED_RELAYER = "trustedRelayerIsm",
    ARB_L2_TO_L1 = "arbL2ToL1Ism",
    WEIGHTED_MERKLE_ROOT_MULTISIG = "weightedMerkleRootMultisigIsm",
    WEIGHTED_MESSAGE_ID_MULTISIG = "weightedMessageIdMultisigIsm",
    CCIP = "ccipIsm",
    CCIP_READ = "ccipReadIsm"
}
export declare const MUTABLE_ISM_TYPE: IsmType[];
/**
 * @notice Statically deployed ISM types
 * @dev ISM types with immutable config embedded in contract bytecode via MetaProxy
 */
export declare const STATIC_ISM_TYPES: IsmType[];
export declare function ismTypeToModuleType(ismType: IsmType): ModuleType;
export type ValidatorConfig = {
    address: Address;
    alias: string;
};
export type MultisigConfig = {
    validators: Array<ValidatorConfig>;
    threshold: number;
};
export type MultisigIsmConfig = z.infer<typeof MultisigIsmConfigSchema>;
export type WeightedMultisigIsmConfig = z.infer<typeof WeightedMultisigIsmConfigSchema>;
export type TestIsmConfig = z.infer<typeof TestIsmConfigSchema>;
export type PausableIsmConfig = z.infer<typeof PausableIsmConfigSchema>;
export type OpStackIsmConfig = z.infer<typeof OpStackIsmConfigSchema>;
export type TrustedRelayerIsmConfig = z.infer<typeof TrustedRelayerIsmConfigSchema>;
export type CCIPIsmConfig = z.infer<typeof CCIPIsmConfigSchema>;
export type ArbL2ToL1IsmConfig = z.infer<typeof ArbL2ToL1IsmConfigSchema>;
export type CCIPReadIsmConfig = z.infer<typeof CCIPReadIsmConfigSchema>;
export type NullIsmConfig = TestIsmConfig | PausableIsmConfig | OpStackIsmConfig | TrustedRelayerIsmConfig | CCIPIsmConfig;
type BaseRoutingIsmConfig<T extends IsmType.ROUTING | IsmType.FALLBACK_ROUTING | IsmType.ICA_ROUTING | IsmType.AMOUNT_ROUTING> = {
    type: T;
};
export type DomainRoutingIsmConfig = BaseRoutingIsmConfig<IsmType.ROUTING | IsmType.FALLBACK_ROUTING> & OwnableConfig & {
    domains: ChainMap<IsmConfig>;
};
export type IcaRoutingIsmConfig = BaseRoutingIsmConfig<IsmType.ICA_ROUTING>;
export type AmountRoutingIsmConfig = BaseRoutingIsmConfig<IsmType.AMOUNT_ROUTING> & {
    lowerIsm: IsmConfig;
    upperIsm: IsmConfig;
    threshold: number;
};
export type RoutingIsmConfig = IcaRoutingIsmConfig | DomainRoutingIsmConfig | AmountRoutingIsmConfig;
export type AggregationIsmConfig = {
    type: IsmType.AGGREGATION | IsmType.STORAGE_AGGREGATION;
    modules: Array<IsmConfig>;
    threshold: number;
};
export type IsmConfig = z.infer<typeof IsmConfigSchema>;
export type DerivedIsmConfig = WithAddress<Exclude<IsmConfig, Address>>;
export type DeployedIsmType = {
    [IsmType.CUSTOM]: IInterchainSecurityModule;
    [IsmType.ROUTING]: IRoutingIsm;
    [IsmType.FALLBACK_ROUTING]: IRoutingIsm;
    [IsmType.ICA_ROUTING]: IRoutingIsm;
    [IsmType.AMOUNT_ROUTING]: IRoutingIsm;
    [IsmType.AGGREGATION]: IAggregationIsm;
    [IsmType.STORAGE_AGGREGATION]: IAggregationIsm;
    [IsmType.MERKLE_ROOT_MULTISIG]: IMultisigIsm;
    [IsmType.MESSAGE_ID_MULTISIG]: IMultisigIsm;
    [IsmType.STORAGE_MERKLE_ROOT_MULTISIG]: IMultisigIsm;
    [IsmType.STORAGE_MESSAGE_ID_MULTISIG]: IMultisigIsm;
    [IsmType.OP_STACK]: OPStackIsm;
    [IsmType.TEST_ISM]: TestIsm;
    [IsmType.PAUSABLE]: PausableIsm;
    [IsmType.TRUSTED_RELAYER]: TrustedRelayerIsm;
    [IsmType.CCIP]: CCIPIsm;
    [IsmType.ARB_L2_TO_L1]: ArbL2ToL1Ism;
    [IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG]: IStaticWeightedMultisigIsm;
    [IsmType.WEIGHTED_MESSAGE_ID_MULTISIG]: IStaticWeightedMultisigIsm;
    [IsmType.CCIP_READ]: ICcipReadIsm;
};
export type DeployedIsm = ValueOf<DeployedIsmType>;
export type RoutingIsmDelta = {
    domainsToUnenroll: Domain[];
    domainsToEnroll: Domain[];
    owner?: Address;
    mailbox?: Address;
};
export declare const TestIsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.TEST_ISM>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.TEST_ISM;
}, {
    type: IsmType.TEST_ISM;
}>;
export declare const MultisigConfigSchema: z.ZodObject<{
    validators: z.ZodArray<z.ZodString, "many">;
    threshold: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    validators: string[];
    threshold: number;
}, {
    validators: string[];
    threshold: number;
}>;
export declare const WeightedMultisigConfigSchema: z.ZodObject<{
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
}>;
export declare const TrustedRelayerIsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
    relayer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.TRUSTED_RELAYER;
    relayer: string;
}, {
    type: IsmType.TRUSTED_RELAYER;
    relayer: string;
}>;
export declare const CCIPIsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.CCIP>;
    originChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.CCIP;
    originChain: string;
}, {
    type: IsmType.CCIP;
    originChain: string;
}>;
export declare const OpStackIsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.OP_STACK>;
    origin: z.ZodString;
    nativeBridge: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.OP_STACK;
    origin: string;
    nativeBridge: string;
}, {
    type: IsmType.OP_STACK;
    origin: string;
    nativeBridge: string;
}>;
export declare const ArbL2ToL1IsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
    bridge: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.ARB_L2_TO_L1;
    bridge: string;
}, {
    type: IsmType.ARB_L2_TO_L1;
    bridge: string;
}>;
export declare const CCIPReadIsmConfigSchema: z.ZodObject<{
    type: z.ZodLiteral<IsmType.CCIP_READ>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.CCIP_READ;
}, {
    type: IsmType.CCIP_READ;
}>;
export declare const PausableIsmConfigSchema: z.ZodIntersection<z.ZodObject<{
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
    type: z.ZodLiteral<IsmType.PAUSABLE>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.PAUSABLE;
}, {
    type: IsmType.PAUSABLE;
}>>;
export declare const MultisigIsmConfigSchema: z.ZodIntersection<z.ZodObject<{
    validators: z.ZodArray<z.ZodString, "many">;
    threshold: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    validators: string[];
    threshold: number;
}, {
    validators: string[];
    threshold: number;
}>, z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
}, {
    type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
}>>;
export declare const WeightedMultisigIsmConfigSchema: z.ZodIntersection<z.ZodObject<{
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
    type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
}, {
    type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
}>>;
export declare const RoutingIsmConfigSchema: z.ZodSchema<RoutingIsmConfig>;
export declare const AggregationIsmConfigSchema: z.ZodSchema<AggregationIsmConfig>;
export declare const IsmConfigSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    type: z.ZodLiteral<IsmType.TEST_ISM>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.TEST_ISM;
}, {
    type: IsmType.TEST_ISM;
}>, z.ZodObject<{
    type: z.ZodLiteral<IsmType.OP_STACK>;
    origin: z.ZodString;
    nativeBridge: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.OP_STACK;
    origin: string;
    nativeBridge: string;
}, {
    type: IsmType.OP_STACK;
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
    type: z.ZodLiteral<IsmType.PAUSABLE>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.PAUSABLE;
}, {
    type: IsmType.PAUSABLE;
}>>, z.ZodObject<{
    type: z.ZodLiteral<IsmType.TRUSTED_RELAYER>;
    relayer: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.TRUSTED_RELAYER;
    relayer: string;
}, {
    type: IsmType.TRUSTED_RELAYER;
    relayer: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<IsmType.CCIP>;
    originChain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.CCIP;
    originChain: string;
}, {
    type: IsmType.CCIP;
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
    type: z.ZodUnion<[z.ZodLiteral<IsmType.MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.MESSAGE_ID_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.STORAGE_MESSAGE_ID_MULTISIG>]>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
}, {
    type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG | IsmType.STORAGE_MERKLE_ROOT_MULTISIG | IsmType.STORAGE_MESSAGE_ID_MULTISIG;
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
    type: z.ZodUnion<[z.ZodLiteral<IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG>, z.ZodLiteral<IsmType.WEIGHTED_MESSAGE_ID_MULTISIG>]>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
}, {
    type: IsmType.WEIGHTED_MERKLE_ROOT_MULTISIG | IsmType.WEIGHTED_MESSAGE_ID_MULTISIG;
}>>, z.ZodType<RoutingIsmConfig, z.ZodTypeDef, RoutingIsmConfig>, z.ZodType<AggregationIsmConfig, z.ZodTypeDef, AggregationIsmConfig>, z.ZodObject<{
    type: z.ZodLiteral<IsmType.ARB_L2_TO_L1>;
    bridge: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: IsmType.ARB_L2_TO_L1;
    bridge: string;
}, {
    type: IsmType.ARB_L2_TO_L1;
    bridge: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<IsmType.CCIP_READ>;
}, "strip", z.ZodTypeAny, {
    type: IsmType.CCIP_READ;
}, {
    type: IsmType.CCIP_READ;
}>]>;
export {};
//# sourceMappingURL=types.d.ts.map