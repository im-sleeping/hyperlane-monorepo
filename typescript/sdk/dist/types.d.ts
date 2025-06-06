import type { ethers } from 'ethers';
import { z } from 'zod';
import type { Domain } from '@hyperlane-xyz/utils';
export type ChainName = string;
export type ChainMap<Value> = Record<ChainName, Value>;
export type ChainNameOrId = ChainName | Domain;
export type Connection = ethers.providers.Provider | ethers.Signer;
export declare const OwnableSchema: z.ZodObject<{
    owner: z.ZodString;
    ownerOverrides: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
}, {
    owner: string;
    ownerOverrides?: Record<string, string> | undefined;
}>;
export type OwnableConfig = z.infer<typeof OwnableSchema>;
export declare const DeployedOwnableSchema: z.ZodObject<{
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
}>;
export type DeployedOwnableConfig = z.infer<typeof DeployedOwnableSchema>;
export declare const DerivedOwnableSchema: z.ZodObject<{
    owner: z.ZodString;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    owner: string;
    address: string;
}, {
    owner: string;
    address: string;
}>;
export type DerivedOwnableConfig = z.infer<typeof DerivedOwnableSchema>;
export declare const PausableSchema: z.ZodObject<{
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
}>;
export type PausableConfig = z.infer<typeof PausableSchema>;
//# sourceMappingURL=types.d.ts.map