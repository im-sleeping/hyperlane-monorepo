import { assert } from '@hyperlane-xyz/utils';
export class TokenMetadataMap {
    tokenMetadataMap;
    constructor() {
        this.tokenMetadataMap = new Map();
    }
    set(chain, metadata) {
        this.tokenMetadataMap.set(chain, metadata);
    }
    getDecimals(chain) {
        const config = this.tokenMetadataMap.get(chain);
        if (config)
            return config.decimals;
        return [...this.tokenMetadataMap.values()].find((config) => config?.decimals)?.decimals;
    }
    getMetadataForChain(chain) {
        return this.tokenMetadataMap.get(chain);
    }
    getName(chain) {
        const config = this.tokenMetadataMap.get(chain);
        if (config?.name)
            return config.name;
        for (const [, meta] of this.tokenMetadataMap) {
            if (meta.name)
                return meta.name;
        }
        return undefined;
    }
    getScale(chain) {
        return this.tokenMetadataMap.get(chain)?.scale;
    }
    getSymbol(chain) {
        const symbol = this.tokenMetadataMap.get(chain)?.symbol;
        if (symbol)
            return symbol;
        return this.getDefaultSymbol();
    }
    getDefaultSymbol() {
        for (const [, metadata] of this.tokenMetadataMap) {
            if (metadata.symbol)
                return metadata.symbol;
        }
        throw new Error('No symbol found in token metadata map.');
    }
    areDecimalsUniform() {
        const values = [...this.tokenMetadataMap.values()];
        const [first, ...rest] = values;
        for (const d of rest) {
            if (d.decimals !== first.decimals) {
                return false;
            }
        }
        return true;
    }
    finalize() {
        assert([...this.tokenMetadataMap.values()].every((config) => !!config.decimals), 'All decimals must be defined');
        if (!this.areDecimalsUniform()) {
            const maxDecimals = Math.max(...[...this.tokenMetadataMap.values()].map((config) => config.decimals));
            for (const [chain, config] of this.tokenMetadataMap.entries()) {
                if (config.decimals) {
                    const scale = 10 ** (maxDecimals - config.decimals);
                    assert(config.scale && scale !== config.scale, `Scale is not correct for ${chain}`);
                    config.scale = scale;
                }
            }
        }
    }
}
//# sourceMappingURL=TokenMetadataMap.js.map