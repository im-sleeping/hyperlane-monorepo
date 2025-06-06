import { z } from 'zod';
import { TxSubmitterType } from './TxSubmitterTypes.js';
export declare const SubmitterMetadataSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    chain: z.ZodString;
    userAddress: z.ZodOptional<z.ZodString>;
    privateKey: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<TxSubmitterType.JSON_RPC>;
}, "strip", z.ZodTypeAny, {
    type: TxSubmitterType.JSON_RPC;
    chain: string;
    userAddress?: string | undefined;
    privateKey?: string | undefined;
}, {
    type: TxSubmitterType.JSON_RPC;
    chain: string;
    userAddress?: string | undefined;
    privateKey?: string | undefined;
}>, z.ZodObject<{
    chain: z.ZodString;
    privateKey: z.ZodOptional<z.ZodString>;
    userAddress: z.ZodString;
    type: z.ZodLiteral<TxSubmitterType.IMPERSONATED_ACCOUNT>;
}, "strip", z.ZodTypeAny, {
    type: TxSubmitterType.IMPERSONATED_ACCOUNT;
    chain: string;
    userAddress: string;
    privateKey?: string | undefined;
}, {
    type: TxSubmitterType.IMPERSONATED_ACCOUNT;
    chain: string;
    userAddress: string;
    privateKey?: string | undefined;
}>, z.ZodObject<{
    chain: z.ZodString;
    safeAddress: z.ZodString;
    type: z.ZodLiteral<TxSubmitterType.GNOSIS_SAFE>;
}, "strip", z.ZodTypeAny, {
    type: TxSubmitterType.GNOSIS_SAFE;
    chain: string;
    safeAddress: string;
}, {
    type: TxSubmitterType.GNOSIS_SAFE;
    chain: string;
    safeAddress: string;
}>, z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    chain: z.ZodString;
    safeAddress: z.ZodString;
    type: z.ZodLiteral<TxSubmitterType.GNOSIS_TX_BUILDER>;
}, "strip", z.ZodTypeAny, {
    type: TxSubmitterType.GNOSIS_TX_BUILDER;
    version: string;
    chain: string;
    safeAddress: string;
}, {
    type: TxSubmitterType.GNOSIS_TX_BUILDER;
    chain: string;
    safeAddress: string;
    version?: string | undefined;
}>]>;
export type SubmitterMetadata = z.infer<typeof SubmitterMetadataSchema>;
//# sourceMappingURL=types.d.ts.map