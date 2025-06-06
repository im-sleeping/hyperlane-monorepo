import { z } from 'zod';
export declare const EV5InterchainAccountTxTransformerPropsSchema: z.ZodObject<Pick<{
    chain: z.ZodString;
    destination: z.ZodString;
    innerCalls: z.ZodArray<z.ZodObject<{
        to: z.ZodString;
        data: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        data: string;
        to: string;
        value?: string | undefined;
    }, {
        data: string;
        to: string;
        value?: string | undefined;
    }>, "many">;
    config: z.ZodObject<{
        origin: z.ZodString;
        owner: z.ZodString;
        localRouter: z.ZodOptional<z.ZodString>;
        routerOverride: z.ZodOptional<z.ZodString>;
        ismOverride: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        origin: string;
        localRouter?: string | undefined;
        routerOverride?: string | undefined;
        ismOverride?: string | undefined;
    }, {
        owner: string;
        origin: string;
        localRouter?: string | undefined;
        routerOverride?: string | undefined;
        ismOverride?: string | undefined;
    }>;
    hookMetadata: z.ZodOptional<z.ZodString>;
}, "chain" | "config" | "hookMetadata">, "strip", z.ZodTypeAny, {
    chain: string;
    config: {
        owner: string;
        origin: string;
        localRouter?: string | undefined;
        routerOverride?: string | undefined;
        ismOverride?: string | undefined;
    };
    hookMetadata?: string | undefined;
}, {
    chain: string;
    config: {
        owner: string;
        origin: string;
        localRouter?: string | undefined;
        routerOverride?: string | undefined;
        ismOverride?: string | undefined;
    };
    hookMetadata?: string | undefined;
}>;
export type EV5InterchainAccountTxTransformerProps = z.infer<typeof EV5InterchainAccountTxTransformerPropsSchema>;
//# sourceMappingURL=types.d.ts.map