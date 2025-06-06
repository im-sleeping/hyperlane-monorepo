import { AccountInterface, Contract, ParsedEvents, ProviderInterface } from 'starknet';
import { ContractType } from '@hyperlane-xyz/starknet-core';
import { DispatchedMessage } from '../core/types.js';
export declare enum StarknetContractName {
    MAILBOX = "mailbox",
    HYP_ERC20 = "HypErc20",
    HYP_ERC20_COLLATERAL = "HypErc20Collateral",
    HYP_NATIVE = "HypNative",
    ETHER = "Ether",
    MERKLE_TREE_HOOK = "merkle_tree_hook",
    NOOP_ISM = "noop_ism",
    HOOK = "hook",
    PROTOCOL_FEE = "protocol_fee",
    VALIDATOR_ANNOUNCE = "validator_announce",
    MESSAGE_RECIPIENT = "message_recipient",
    DOMAIN_ROUTING_HOOK = "domain_routing_hook",
    FALLBACK_DOMAIN_ROUTING_HOOK = "fallback_domain_routing_hook",
    STATIC_AGGREGATION_HOOK = "static_aggregation_hook"
}
/**
 * Creates a Starknet contract instance with the given parameters
 */
export declare function getStarknetContract(contractName: string, address: string, providerOrAccount?: ProviderInterface | AccountInterface, contractType?: ContractType): Contract;
export declare function getStarknetMailboxContract(address: string, providerOrAccount?: ProviderInterface | AccountInterface): Contract;
export declare function getStarknetHypERC20Contract(address: string, providerOrAccount?: ProviderInterface | AccountInterface): Contract;
export declare function getStarknetHypERC20CollateralContract(address: string, providerOrAccount?: ProviderInterface | AccountInterface): Contract;
export declare function getStarknetEtherContract(address: string, providerOrAccount?: ProviderInterface | AccountInterface): Contract;
export declare function parseStarknetDispatchEvents(parsedEvents: ParsedEvents, chainNameResolver: (domain: number) => string | undefined): DispatchedMessage[];
export declare function parseStarknetDispatchIdEvents(parsedEvents: ParsedEvents): string[];
//# sourceMappingURL=starknet.d.ts.map