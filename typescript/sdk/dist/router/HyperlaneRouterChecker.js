import { ethers } from 'ethers';
import { addressToBytes32, eqAddress, isZeroishAddress, rootLogger, } from '@hyperlane-xyz/utils';
import { HyperlaneAppChecker } from '../deploy/HyperlaneAppChecker.js';
import { EvmIsmReader } from '../ism/EvmIsmReader.js';
import { moduleMatchesConfig } from '../ism/utils.js';
import { ClientViolationType, RouterViolationType, } from './types.js';
export class HyperlaneRouterChecker extends HyperlaneAppChecker {
    ismFactory;
    logger;
    constructor(multiProvider, app, configMap, ismFactory, logger = rootLogger.child({ module: 'HyperlaneRouterChecker' })) {
        super(multiProvider, app, configMap);
        this.ismFactory = ismFactory;
        this.logger = logger;
    }
    async checkChain(chain) {
        await this.checkMailboxClient(chain);
        await this.checkEnrolledRouters(chain);
        await super.checkOwnership(chain, this.configMap[chain].owner, this.configMap[chain].ownerOverrides);
    }
    async checkMailboxClient(chain) {
        const router = this.app.router(this.app.getContracts(chain));
        const config = this.configMap[chain];
        const mailboxAddr = await router.mailbox();
        if (!eqAddress(mailboxAddr, config.mailbox)) {
            this.addViolation({
                chain,
                type: ClientViolationType.Mailbox,
                contract: router,
                actual: mailboxAddr,
                expected: config.mailbox,
            });
        }
        if (config.hook && typeof config.hook === 'string') {
            const hook = await router.hook();
            if (!eqAddress(hook, config.hook)) {
                this.addViolation({
                    chain,
                    type: ClientViolationType.Hook,
                    contract: router,
                    actual: hook,
                    expected: config.hook,
                });
            }
        }
        const actualIsmAddress = await router.interchainSecurityModule();
        const matches = await moduleMatchesConfig(chain, actualIsmAddress, config.interchainSecurityModule ?? ethers.constants.AddressZero, this.multiProvider, this.ismFactory?.chainMap[chain] ?? {}, mailboxAddr);
        if (!matches) {
            const ismReader = new EvmIsmReader(this.multiProvider, chain);
            let actualConfig = ethers.constants.AddressZero;
            if (actualIsmAddress !== ethers.constants.AddressZero) {
                actualConfig = await ismReader.deriveIsmConfig(actualIsmAddress);
            }
            let expectedConfig = config.interchainSecurityModule;
            if (typeof expectedConfig === 'string' &&
                !isZeroishAddress(expectedConfig)) {
                expectedConfig = await ismReader.deriveIsmConfig(expectedConfig);
            }
            if (expectedConfig === undefined) {
                expectedConfig = ethers.constants.AddressZero;
            }
            const violation = {
                chain,
                type: ClientViolationType.InterchainSecurityModule,
                contract: router,
                actual: actualConfig,
                expected: expectedConfig,
                description: `ISM config does not match deployed ISM`,
            };
            this.addViolation(violation);
        }
    }
    async checkEnrolledRouters(chain, expectedRemoteChains = []) {
        const router = this.app.router(this.app.getContracts(chain));
        const actualRemoteChains = await this.app.remoteChains(chain);
        const currentRouters = {};
        const expectedRouters = {};
        const missingRemoteChains = expectedRemoteChains
            .filter((chn) => !actualRemoteChains.includes(chn))
            .sort();
        const misconfiguredRouterDiff = {};
        const missingRouterDomains = [];
        await Promise.all(actualRemoteChains.map(async (remoteChain) => {
            let remoteRouterAddress;
            try {
                remoteRouterAddress = this.app.routerAddress(remoteChain);
            }
            catch {
                // failed to read remote router address from the config
                missingRouterDomains.push(remoteChain);
                return;
            }
            const remoteDomainId = this.multiProvider.getDomainId(remoteChain);
            const actualRouter = await router.routers(remoteDomainId);
            const expectedRouter = addressToBytes32(remoteRouterAddress);
            currentRouters[remoteChain] = actualRouter;
            expectedRouters[remoteChain] = expectedRouter;
            if (actualRouter !== expectedRouter) {
                misconfiguredRouterDiff[remoteChain] = {
                    actual: actualRouter,
                    expected: expectedRouter,
                };
            }
        }));
        const expectedRouterChains = actualRemoteChains.filter((chain) => !missingRouterDomains.includes(chain));
        if (missingRemoteChains.length > 0) {
            const violation = {
                chain,
                type: RouterViolationType.MissingEnrolledRouter,
                contract: router,
                actual: actualRemoteChains.join(', '),
                expected: expectedRemoteChains.join(),
                missingChains: missingRemoteChains,
                description: `Routers for some domains are missing from the router`,
            };
            this.addViolation(violation);
        }
        if (Object.keys(misconfiguredRouterDiff).length > 0) {
            const violation = {
                chain,
                type: RouterViolationType.MisconfiguredEnrolledRouter,
                contract: router,
                actual: currentRouters,
                expected: expectedRouters,
                routerDiff: misconfiguredRouterDiff,
                description: `Routers for some domains are missing or not enrolled correctly`,
            };
            this.addViolation(violation);
        }
        if (missingRouterDomains.length > 0) {
            const violation = {
                chain,
                type: RouterViolationType.MissingRouter,
                contract: router,
                actual: actualRemoteChains.join(','),
                expected: expectedRouterChains.join(','),
                description: `Routers for some domains are missing from the config`,
            };
            this.addViolation(violation);
        }
    }
}
//# sourceMappingURL=HyperlaneRouterChecker.js.map