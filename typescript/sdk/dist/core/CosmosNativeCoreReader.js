import { rootLogger } from '@hyperlane-xyz/utils';
import { CosmosNativeHookReader } from '../hook/CosmosNativeHookReader.js';
import { CosmosNativeIsmReader } from '../ism/CosmosNativeIsmReader.js';
export class CosmosNativeCoreReader {
    multiProvider;
    signer;
    logger = rootLogger.child({
        module: 'CosmosNativeCoreReader',
    });
    ismReader;
    hookReader;
    constructor(multiProvider, signer) {
        this.multiProvider = multiProvider;
        this.signer = signer;
        this.ismReader = new CosmosNativeIsmReader(this.multiProvider, this.signer);
        this.hookReader = new CosmosNativeHookReader(this.multiProvider, this.signer);
    }
    async deriveCoreConfig(mailboxAddress) {
        const { mailbox } = await this.signer.query.core.Mailbox({
            id: mailboxAddress,
        });
        if (!mailbox) {
            throw new Error(`Mailbox not found for address ${mailboxAddress}`);
        }
        return {
            owner: mailbox.owner,
            defaultIsm: await this.ismReader.deriveIsmConfig(mailbox.default_ism),
            defaultHook: await this.hookReader.deriveHookConfig(mailbox.default_hook),
            requiredHook: await this.hookReader.deriveHookConfig(mailbox.required_hook),
        };
    }
}
//# sourceMappingURL=CosmosNativeCoreReader.js.map