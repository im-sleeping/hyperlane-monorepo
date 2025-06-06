import { BigNumber } from 'ethers';
import { ERC20__factory, IXERC20Lockbox__factory, Ownable__factory, ProxyAdmin__factory, } from '@hyperlane-xyz/core';
import { eqAddress, objMap } from '@hyperlane-xyz/utils';
import { filterOwnableContracts } from '../contracts/contracts.js';
import { isProxy, proxyAdmin } from '../deploy/proxy.js';
import { ProxiedRouterChecker } from '../router/ProxiedRouterChecker.js';
import { TokenType } from './config.js';
import { isCollateralTokenConfig, isNativeTokenConfig, isSyntheticTokenConfig, isXERC20TokenConfig, } from './types.js';
export class HypERC20Checker extends ProxiedRouterChecker {
    async checkChain(chain) {
        let expectedChains;
        expectedChains = Object.keys(this.configMap);
        const thisChainConfig = this.configMap[chain];
        if (thisChainConfig?.remoteRouters) {
            expectedChains = Object.keys(thisChainConfig.remoteRouters).map((remoteRouterChain) => this.multiProvider.getChainName(remoteRouterChain));
        }
        expectedChains = expectedChains
            .filter((remoteRouterChain) => remoteRouterChain !== chain)
            .sort();
        await super.checkChain(chain, expectedChains);
        await this.checkToken(chain);
    }
    async ownables(chain) {
        const contracts = this.app.getContracts(chain);
        const expectedConfig = this.configMap[chain];
        // This is used to trigger checks for collateralProxyAdmin or collateralToken
        const hasCollateralProxyOverrides = expectedConfig.ownerOverrides?.collateralProxyAdmin ||
            expectedConfig.ownerOverrides?.collateralToken;
        if ((isCollateralTokenConfig(this.configMap[chain]) ||
            isXERC20TokenConfig(this.configMap[chain])) &&
            hasCollateralProxyOverrides) {
            let collateralToken = await this.getCollateralToken(chain);
            const provider = this.multiProvider.getProvider(chain);
            // XERC20s are Ownable
            if (expectedConfig.type === TokenType.XERC20Lockbox) {
                const lockbox = IXERC20Lockbox__factory.connect(expectedConfig.token, provider);
                collateralToken = ERC20__factory.connect(await lockbox.callStatic['XERC20()'](), provider);
                contracts['collateralToken'] = Ownable__factory.connect(collateralToken.address, provider);
            }
            if (expectedConfig.type === TokenType.XERC20) {
                contracts['collateralToken'] = Ownable__factory.connect(collateralToken.address, provider);
            }
            if (await isProxy(provider, collateralToken.address)) {
                const admin = await proxyAdmin(provider, collateralToken.address);
                contracts['collateralProxyAdmin'] = ProxyAdmin__factory.connect(admin, provider);
            }
        }
        return filterOwnableContracts(contracts);
    }
    async checkToken(chain) {
        const checkERC20 = async (token, config) => {
            const checks = [
                { method: 'symbol', violationType: 'TokenSymbolMismatch' },
                { method: 'name', violationType: 'TokenNameMismatch' },
                { method: 'decimals', violationType: 'TokenDecimalsMismatch' },
            ];
            for (const check of checks) {
                const actual = await token[check.method]();
                const expected = config[check.method];
                if (expected !== undefined && actual !== expected) {
                    const violation = {
                        type: check.violationType,
                        chain,
                        expected,
                        actual,
                        tokenAddress: token.address,
                    };
                    this.addViolation(violation);
                }
            }
        };
        const expectedConfig = this.configMap[chain];
        const hypToken = this.app.router(this.app.getContracts(chain));
        // Check if configured token type matches actual token type
        if (isNativeTokenConfig(expectedConfig)) {
            try {
                await this.multiProvider.estimateGas(chain, {
                    to: hypToken.address,
                    from: await this.multiProvider.getSignerAddress(chain),
                    value: BigNumber.from(1),
                });
            }
            catch {
                const violation = {
                    type: 'deployed token not payable',
                    chain,
                    expected: 'true',
                    actual: 'false',
                    tokenAddress: hypToken.address,
                };
                this.addViolation(violation);
            }
        }
        else if (isSyntheticTokenConfig(expectedConfig)) {
            await checkERC20(hypToken, expectedConfig);
        }
        else if (isCollateralTokenConfig(expectedConfig) ||
            isXERC20TokenConfig(expectedConfig)) {
            const collateralToken = await this.getCollateralToken(chain);
            const actualToken = await hypToken.wrappedToken();
            if (!eqAddress(collateralToken.address, actualToken)) {
                const violation = {
                    type: 'CollateralTokenMismatch',
                    chain,
                    expected: collateralToken.address,
                    actual: actualToken,
                    tokenAddress: hypToken.address,
                };
                this.addViolation(violation);
            }
        }
        // Check all actual decimals are consistent, this should be done after checking the token type to avoid 'decimal()' calls to non collateral token that would fail
        const actualChainDecimals = await this.getEvmActualDecimals();
        this.checkDecimalConsistency(chain, hypToken, actualChainDecimals, 'actual', true);
        // Check all config decimals are consistent as well
        const configDecimals = objMap(this.configMap, (_chain, config) => config.decimals);
        this.checkDecimalConsistency(chain, hypToken, configDecimals, 'config', false);
    }
    cachedAllActualDecimals = undefined;
    async getEvmActualDecimals() {
        if (this.cachedAllActualDecimals) {
            return this.cachedAllActualDecimals;
        }
        const entries = await Promise.all(this.getEvmChains().map(async (chain) => {
            const token = this.app.router(this.app.getContracts(chain));
            return [chain, await this.getActualDecimals(chain, token)];
        }));
        this.cachedAllActualDecimals = Object.fromEntries(entries);
        return this.cachedAllActualDecimals;
    }
    async getActualDecimals(chain, hypToken) {
        const expectedConfig = this.configMap[chain];
        let decimals = undefined;
        if (isNativeTokenConfig(expectedConfig)) {
            decimals =
                this.multiProvider.getChainMetadata(chain).nativeToken?.decimals;
        }
        else if (isSyntheticTokenConfig(expectedConfig)) {
            decimals = await hypToken.decimals();
        }
        else if (isCollateralTokenConfig(expectedConfig) ||
            isXERC20TokenConfig(expectedConfig)) {
            const collateralToken = await this.getCollateralToken(chain);
            decimals = await collateralToken.decimals();
        }
        if (decimals === undefined) {
            throw new Error('Actual decimals not found');
        }
        return decimals;
    }
    async getCollateralToken(chain) {
        const expectedConfig = this.configMap[chain];
        let collateralToken = undefined;
        if (isCollateralTokenConfig(expectedConfig) ||
            isXERC20TokenConfig(expectedConfig)) {
            const provider = this.multiProvider.getProvider(chain);
            if (expectedConfig.type === TokenType.XERC20Lockbox) {
                const collateralTokenAddress = await IXERC20Lockbox__factory.connect(expectedConfig.token, provider).callStatic.ERC20();
                collateralToken = ERC20__factory.connect(collateralTokenAddress, provider);
            }
            else {
                collateralToken = ERC20__factory.connect(expectedConfig.token, provider);
            }
        }
        if (!collateralToken) {
            throw new Error('Collateral token not found');
        }
        return collateralToken;
    }
    checkDecimalConsistency(chain, hypToken, chainDecimals, decimalType, nonEmpty) {
        const uniqueChainDecimals = new Set(Object.values(chainDecimals).filter((decimals) => !!decimals));
        if (uniqueChainDecimals.size > 1 ||
            (nonEmpty && uniqueChainDecimals.size === 0)) {
            const violation = {
                type: 'TokenDecimalsMismatch',
                chain,
                expected: `${nonEmpty ? 'non-empty and ' : ''}consistent ${decimalType} decimals`,
                actual: JSON.stringify(chainDecimals),
                tokenAddress: hypToken.address,
            };
            this.addViolation(violation);
        }
    }
}
//# sourceMappingURL=checker.js.map