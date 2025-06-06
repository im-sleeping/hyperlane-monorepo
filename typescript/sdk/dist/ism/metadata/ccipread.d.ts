import { WithAddress } from '@hyperlane-xyz/utils';
import { HyperlaneCore } from '../../core/HyperlaneCore.js';
import { CCIPReadIsmConfig, IsmType } from '../types.js';
import type { MetadataBuilder, MetadataContext } from './types.js';
export declare class CcipReadMetadataBuilder implements MetadataBuilder {
    readonly type = IsmType.CCIP;
    private core;
    constructor(core: HyperlaneCore);
    build(context: MetadataContext<WithAddress<CCIPReadIsmConfig>>): Promise<string>;
}
//# sourceMappingURL=ccipread.d.ts.map