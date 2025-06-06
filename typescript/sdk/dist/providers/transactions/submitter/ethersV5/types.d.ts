import { z } from 'zod';
export declare const EV5GnosisSafeTxSubmitterPropsSchema: z.ZodObject<{
    chain: z.ZodString;
    safeAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chain: string;
    safeAddress: string;
}, {
    chain: string;
    safeAddress: string;
}>;
export type EV5GnosisSafeTxSubmitterProps = z.infer<typeof EV5GnosisSafeTxSubmitterPropsSchema>;
export declare const EV5GnosisSafeTxBuilderPropsSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    chain: z.ZodString;
    safeAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: string;
    chain: string;
    safeAddress: string;
}, {
    chain: string;
    safeAddress: string;
    version?: string | undefined;
}>;
export type EV5GnosisSafeTxBuilderProps = z.infer<typeof EV5GnosisSafeTxBuilderPropsSchema>;
export declare const EV5JsonRpcTxSubmitterPropsSchema: z.ZodObject<{
    chain: z.ZodString;
    userAddress: z.ZodOptional<z.ZodString>;
    privateKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chain: string;
    userAddress?: string | undefined;
    privateKey?: string | undefined;
}, {
    chain: string;
    userAddress?: string | undefined;
    privateKey?: string | undefined;
}>;
export type EV5JsonRpcTxSubmitterProps = z.infer<typeof EV5JsonRpcTxSubmitterPropsSchema>;
export declare const EV5ImpersonatedAccountTxSubmitterPropsSchema: z.ZodObject<{
    chain: z.ZodString;
    privateKey: z.ZodOptional<z.ZodString>;
    userAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chain: string;
    userAddress: string;
    privateKey?: string | undefined;
}, {
    chain: string;
    userAddress: string;
    privateKey?: string | undefined;
}>;
export type EV5ImpersonatedAccountTxSubmitterProps = z.infer<typeof EV5ImpersonatedAccountTxSubmitterPropsSchema>;
//# sourceMappingURL=types.d.ts.map