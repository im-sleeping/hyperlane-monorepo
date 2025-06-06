import { ChainAddresses } from '@hyperlane-xyz/registry';
import { HyperlaneContractsMap } from '../contracts/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { HypERC20Factories, HypERC721Factories } from '../token/contracts.js';
import { WarpRouteDeployConfigMailboxRequired } from '../token/types.js';
import { ChainMap } from '../types.js';
export declare function executeWarpDeploy(multiProvider: MultiProvider, warpDeployConfig: WarpRouteDeployConfigMailboxRequired, registryAddresses: ChainMap<ChainAddresses>, apiKeys: ChainMap<string>): Promise<HyperlaneContractsMap<HypERC20Factories | HypERC721Factories>>;
//# sourceMappingURL=warp.d.ts.map