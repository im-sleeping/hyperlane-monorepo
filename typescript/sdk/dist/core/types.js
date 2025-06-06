import { z } from 'zod';
import { ProxyFactoryFactoriesSchema } from '../deploy/types.js';
import { HookConfigSchema } from '../hook/types.js';
import { DerivedIcaRouterConfigSchema, IcaRouterConfigSchema, } from '../ica/types.js';
import { IsmConfigSchema } from '../ism/types.js';
import { DeployedOwnableSchema, OwnableSchema } from '../types.js';
export const CoreConfigSchema = OwnableSchema.extend({
    defaultIsm: IsmConfigSchema,
    defaultHook: HookConfigSchema,
    requiredHook: HookConfigSchema,
    // These field are set as optional because the old core config
    // did not have them and we want to maintain backward compatibility
    proxyAdmin: DeployedOwnableSchema.optional(),
    interchainAccountRouter: IcaRouterConfigSchema.optional(),
});
export const DerivedCoreConfigSchema = CoreConfigSchema.merge(z.object({
    interchainAccountRouter: DerivedIcaRouterConfigSchema.optional(),
}));
export const DeployedCoreAddressesSchema = ProxyFactoryFactoriesSchema.extend({
    mailbox: z.string(),
    validatorAnnounce: z.string(),
    proxyAdmin: z.string(),
    testRecipient: z.string(),
    timelockController: z.string().optional(),
    interchainAccountRouter: z.string(),
    interchainAccountIsm: z.string(),
    merkleTreeHook: z.string().optional(),
    interchainGasPaymaster: z.string().optional(),
});
export var CoreViolationType;
(function (CoreViolationType) {
    CoreViolationType["Mailbox"] = "Mailbox";
    CoreViolationType["ConnectionManager"] = "ConnectionManager";
    CoreViolationType["ValidatorAnnounce"] = "ValidatorAnnounce";
})(CoreViolationType || (CoreViolationType = {}));
export var MailboxViolationType;
(function (MailboxViolationType) {
    MailboxViolationType["DefaultIsm"] = "DefaultIsm";
    MailboxViolationType["NotProxied"] = "NotProxied";
})(MailboxViolationType || (MailboxViolationType = {}));
//# sourceMappingURL=types.js.map