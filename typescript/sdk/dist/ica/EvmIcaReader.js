import { InterchainAccountRouter__factory, Ownable__factory, } from '@hyperlane-xyz/core';
import { isZeroishAddress } from '@hyperlane-xyz/utils';
import { proxyAdmin } from '../deploy/proxy.js';
import { DerivedIcaRouterConfigSchema, } from './types.js';
export class EvmIcaRouterReader {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async deriveConfig(address) {
        const icaRouterInstance = InterchainAccountRouter__factory.connect(address, this.provider);
        const owner = await icaRouterInstance.owner();
        const proxyAddress = await proxyAdmin(this.provider, address);
        const proxyAdminInstance = Ownable__factory.connect(proxyAddress, this.provider);
        const [proxyAdminOwner, knownDomains, mailboxAddress] = await Promise.all([
            proxyAdminInstance.owner(),
            icaRouterInstance.domains(),
            icaRouterInstance.mailbox(),
        ]);
        const remoteRouters = await this.deriveRemoteRoutersConfig(icaRouterInstance, knownDomains);
        const rawConfig = {
            owner,
            address,
            mailbox: mailboxAddress,
            proxyAdmin: {
                address: proxyAddress,
                owner: proxyAdminOwner,
            },
            remoteIcaRouters: remoteRouters,
        };
        return DerivedIcaRouterConfigSchema.parse(rawConfig);
    }
    async deriveRemoteRoutersConfig(icaRouterInstance, knownDomains) {
        const remoteIcaRoutersConfig = await Promise.all(knownDomains.map((domainId) => {
            return Promise.all([
                icaRouterInstance.routers(domainId),
                icaRouterInstance.isms(domainId),
            ]);
        }));
        const res = {};
        return knownDomains.reduce((acc, curr, idx) => {
            const remoteRouter = remoteIcaRoutersConfig[idx][0];
            const ism = remoteIcaRoutersConfig[idx][1];
            acc[curr.toString()] = {
                address: remoteRouter,
                interchainSecurityModule: isZeroishAddress(ism) ? undefined : ism,
            };
            return acc;
        }, res);
    }
}
//# sourceMappingURL=EvmIcaReader.js.map