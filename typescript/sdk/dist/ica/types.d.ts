import { z } from 'zod';
export declare const RemoteIcaRouterConfigSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    address: z.ZodString;
    interchainSecurityModule: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address: string;
    interchainSecurityModule?: string | undefined;
}, {
    address: string;
    interchainSecurityModule?: string | undefined;
}>>;
export declare const IcaRouterConfigSchema: z.ZodObject<{
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
}>;
export type IcaRouterConfig = z.infer<typeof IcaRouterConfigSchema>;
export declare const DerivedIcaRouterConfigSchema: z.ZodObject<{
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
}>;
export type DerivedIcaRouterConfig = z.infer<typeof DerivedIcaRouterConfigSchema>;
//# sourceMappingURL=types.d.ts.map