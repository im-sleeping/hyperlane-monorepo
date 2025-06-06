import { utils } from 'ethers';
import { Contract, } from 'starknet';
import { ContractType, getCompiledContract, } from '@hyperlane-xyz/starknet-core';
export var StarknetContractName;
(function (StarknetContractName) {
    StarknetContractName["MAILBOX"] = "mailbox";
    StarknetContractName["HYP_ERC20"] = "HypErc20";
    StarknetContractName["HYP_ERC20_COLLATERAL"] = "HypErc20Collateral";
    StarknetContractName["HYP_NATIVE"] = "HypNative";
    StarknetContractName["ETHER"] = "Ether";
    StarknetContractName["MERKLE_TREE_HOOK"] = "merkle_tree_hook";
    StarknetContractName["NOOP_ISM"] = "noop_ism";
    StarknetContractName["HOOK"] = "hook";
    StarknetContractName["PROTOCOL_FEE"] = "protocol_fee";
    StarknetContractName["VALIDATOR_ANNOUNCE"] = "validator_announce";
    StarknetContractName["MESSAGE_RECIPIENT"] = "message_recipient";
    StarknetContractName["DOMAIN_ROUTING_HOOK"] = "domain_routing_hook";
    StarknetContractName["FALLBACK_DOMAIN_ROUTING_HOOK"] = "fallback_domain_routing_hook";
    StarknetContractName["STATIC_AGGREGATION_HOOK"] = "static_aggregation_hook";
})(StarknetContractName || (StarknetContractName = {}));
/**
 * Creates a Starknet contract instance with the given parameters
 */
export function getStarknetContract(contractName, address, providerOrAccount, contractType = ContractType.CONTRACT) {
    const { abi } = getCompiledContract(contractName, contractType);
    return new Contract(abi, address, providerOrAccount);
}
export function getStarknetMailboxContract(address, providerOrAccount) {
    return getStarknetContract(StarknetContractName.MAILBOX, address, providerOrAccount);
}
export function getStarknetHypERC20Contract(address, providerOrAccount) {
    return getStarknetContract(StarknetContractName.HYP_ERC20, address, providerOrAccount, ContractType.TOKEN);
}
export function getStarknetHypERC20CollateralContract(address, providerOrAccount) {
    return getStarknetContract(StarknetContractName.HYP_ERC20_COLLATERAL, address, providerOrAccount, ContractType.TOKEN);
}
export function getStarknetEtherContract(address, providerOrAccount) {
    return getStarknetContract(StarknetContractName.ETHER, address, providerOrAccount, ContractType.TOKEN);
}
const DISPATCH_EVENT = 'contracts::mailbox::mailbox::Dispatch';
const DISPATCH_ID_EVENT = 'contracts::mailbox::mailbox::DispatchId';
export function parseStarknetDispatchEvents(parsedEvents, chainNameResolver) {
    return parsedEvents
        .filter((event) => DISPATCH_EVENT in event)
        .map((dispatchEvent) => {
        const message = dispatchEvent[DISPATCH_EVENT].message;
        const originChain = chainNameResolver(Number(message.origin));
        const destinationChain = chainNameResolver(Number(message.destination));
        return {
            parsed: {
                ...message,
                originChain,
                destinationChain,
            },
            id: parseStarknetDispatchIdEvents(parsedEvents)[0],
            message: message.raw,
        };
    });
}
export function parseStarknetDispatchIdEvents(parsedEvents) {
    return parsedEvents
        .filter((event) => DISPATCH_ID_EVENT in event)
        .map((dispatchEvent) => utils.hexlify(dispatchEvent[DISPATCH_ID_EVENT].id));
}
//# sourceMappingURL=starknet.js.map