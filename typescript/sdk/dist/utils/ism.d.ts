import { ChainAddresses } from '@hyperlane-xyz/registry';
import { WithAddress } from '@hyperlane-xyz/utils';
/**
 * Extracts the ISM and Hook factory addresses from chain-specific registry addresses
 * @param registryAddresses The registry addresses for a specific chain
 * @returns The extracted ISM and Hook factory addresses
 */
export declare function extractIsmAndHookFactoryAddresses(registryAddresses: ChainAddresses): Record<"staticMerkleRootMultisigIsmFactory" | "staticMessageIdMultisigIsmFactory" | "staticAggregationIsmFactory" | "staticAggregationHookFactory" | "domainRoutingIsmFactory" | "staticMerkleRootWeightedMultisigIsmFactory" | "staticMessageIdWeightedMultisigIsmFactory", string>;
export declare function multisigIsmVerificationCost(m: number, n: number): number;
export declare function normalizeConfig(obj: WithAddress<any>): any;
export declare function sortArraysInConfig(config: any): any;
//# sourceMappingURL=ism.d.ts.map