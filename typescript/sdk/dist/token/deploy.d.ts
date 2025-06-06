import { GasRouter } from '@hyperlane-xyz/core';
import { HyperlaneContracts } from '../contracts/types.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { HyperlaneIsmFactory } from '../ism/HyperlaneIsmFactory.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { GasRouterDeployer } from '../router/GasRouterDeployer.js';
import { ChainName } from '../types.js';
import { TokenMetadataMap } from './TokenMetadataMap.js';
import { HypERC20Factories, HypERC721Factories, TokenFactories } from './contracts.js';
import { HypTokenRouterConfig, WarpRouteDeployConfig, WarpRouteDeployConfigMailboxRequired } from './types.js';
declare abstract class TokenDeployer<Factories extends TokenFactories> extends GasRouterDeployer<HypTokenRouterConfig, Factories> {
    constructor(multiProvider: MultiProvider, factories: Factories, loggerName: string, ismFactory?: HyperlaneIsmFactory, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    constructorArgs(_: ChainName, config: HypTokenRouterConfig): Promise<any>;
    initializeArgs(chain: ChainName, config: HypTokenRouterConfig): Promise<any>;
    static deriveTokenMetadata(multiProvider: MultiProvider, configMap: WarpRouteDeployConfig): Promise<TokenMetadataMap>;
    deploy(configMap: WarpRouteDeployConfigMailboxRequired): Promise<import("../contracts/types.js").HyperlaneContractsMap<Factories & import("../contracts/types.js").HyperlaneFactories & {
        proxyAdmin: import("@hyperlane-xyz/core").ProxyAdmin__factory;
        timelockController: import("@hyperlane-xyz/core").TimelockController__factory;
    }>>;
}
export declare class HypERC20Deployer extends TokenDeployer<HypERC20Factories> {
    constructor(multiProvider: MultiProvider, ismFactory?: HyperlaneIsmFactory, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    router(contracts: HyperlaneContracts<HypERC20Factories>): GasRouter;
    routerContractKey(config: HypTokenRouterConfig): keyof HypERC20Factories;
    routerContractName(config: HypTokenRouterConfig): string;
}
export declare class HypERC721Deployer extends TokenDeployer<HypERC721Factories> {
    constructor(multiProvider: MultiProvider, ismFactory?: HyperlaneIsmFactory, contractVerifier?: ContractVerifier);
    router(contracts: HyperlaneContracts<HypERC721Factories>): GasRouter;
    routerContractKey(config: HypTokenRouterConfig): keyof HypERC721Factories;
    routerContractName(config: HypTokenRouterConfig): string;
}
export {};
//# sourceMappingURL=deploy.d.ts.map