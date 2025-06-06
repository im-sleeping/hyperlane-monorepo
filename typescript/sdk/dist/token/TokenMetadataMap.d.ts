import { TokenMetadata } from './types.js';
export declare class TokenMetadataMap {
    private tokenMetadataMap;
    constructor();
    set(chain: string, metadata: TokenMetadata): void;
    getDecimals(chain: string): number | undefined;
    getMetadataForChain(chain: string): TokenMetadata | undefined;
    getName(chain: string): string | undefined;
    getScale(chain: string): number | undefined;
    getSymbol(chain: string): string;
    getDefaultSymbol(): string;
    areDecimalsUniform(): boolean;
    finalize(): void;
}
//# sourceMappingURL=TokenMetadataMap.d.ts.map