import { ERC20, Ownable, TokenRouter } from '@hyperlane-xyz/core';
import { ProxiedRouterChecker } from '../router/ProxiedRouterChecker.js';
import { ProxiedFactories } from '../router/types.js';
import { ChainName } from '../types.js';
import { HypERC20App } from './app.js';
import { HypERC20Factories } from './contracts.js';
import { HypTokenRouterConfig } from './types.js';
export declare class HypERC20Checker extends ProxiedRouterChecker<HypERC20Factories & ProxiedFactories, HypERC20App, HypTokenRouterConfig> {
    checkChain(chain: ChainName): Promise<void>;
    ownables(chain: ChainName): Promise<{
        [key: string]: Ownable;
    }>;
    checkToken(chain: ChainName): Promise<void>;
    private cachedAllActualDecimals;
    getEvmActualDecimals(): Promise<Record<ChainName, number>>;
    getActualDecimals(chain: ChainName, hypToken: TokenRouter): Promise<number>;
    getCollateralToken(chain: ChainName): Promise<ERC20>;
    checkDecimalConsistency(chain: ChainName, hypToken: TokenRouter, chainDecimals: Record<ChainName, number | undefined>, decimalType: string, nonEmpty: boolean): void;
}
//# sourceMappingURL=checker.d.ts.map