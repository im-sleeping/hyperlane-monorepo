import { GetCallRemoteSettingsSchema } from '../../../../middleware/account/types.js';
export const EV5InterchainAccountTxTransformerPropsSchema = GetCallRemoteSettingsSchema.pick({
    chain: true,
    config: true,
    hookMetadata: true,
});
//# sourceMappingURL=types.js.map