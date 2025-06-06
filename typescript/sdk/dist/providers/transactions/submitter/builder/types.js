import { z } from 'zod';
import { ZChainName } from '../../../../metadata/customZodTypes.js';
import { TransformerMetadataSchema } from '../../transformer/types.js';
import { SubmitterMetadataSchema } from '../types.js';
export const SubmissionStrategySchema = z.object({
    submitter: SubmitterMetadataSchema,
    transforms: z.array(TransformerMetadataSchema).optional(),
});
export const ChainSubmissionStrategySchema = z.record(ZChainName, SubmissionStrategySchema);
//# sourceMappingURL=types.js.map