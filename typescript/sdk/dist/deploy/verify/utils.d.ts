import { ethers, utils } from 'ethers';
import { ZKSyncArtifact } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../../types.js';
import { ContractVerificationInput } from './types.js';
export declare function formatFunctionArguments(fragment: utils.Fragment, args: any[]): any;
export declare function getConstructorArguments(contract: ethers.Contract, bytecode: string): any;
export declare function buildVerificationInput(name: string, address: string, constructorArguments: string, isProxy?: boolean, expectedimplementation?: string): ContractVerificationInput;
export declare function getContractVerificationInput({ name, contract, bytecode, isProxy, expectedimplementation, }: {
    name: string;
    contract: ethers.Contract;
    bytecode: string;
    isProxy?: boolean;
    expectedimplementation?: Address;
}): ContractVerificationInput;
export declare function getContractVerificationInputForZKSync({ name, contract, constructorArgs, artifact, isProxy, expectedimplementation, }: {
    name: string;
    contract: ethers.Contract;
    constructorArgs: any[];
    artifact: ZKSyncArtifact;
    isProxy?: boolean;
    expectedimplementation?: Address;
}): Promise<ContractVerificationInput>;
export declare function encodeArguments(abi: any, constructorArgs: any[]): string;
/**
 * Check if the artifact should be added to the verification inputs.
 * @param verificationInputs - The verification inputs for the chain.
 * @param chain - The chain to check.
 * @param artifact - The artifact to check.
 * @returns
 */
export declare function shouldAddVerificationInput(verificationInputs: ChainMap<ContractVerificationInput[]>, chain: ChainName, artifact: ContractVerificationInput): boolean;
/**
 * @notice Defines verification delay times for different blockchain explorer families.
 * @dev This constant object associates explorer families with specific delay times (in milliseconds)
 */
export declare const FamilyVerificationDelay: {
    readonly etherscan: 40000;
};
/** Retrieves the constructor args using their respective Explorer and/or RPC (eth_getTransactionByHash)
 */
export declare function getConstructorArgumentsApi({ chainName, contractAddress, bytecode, multiProvider, }: {
    bytecode: string;
    chainName: string;
    contractAddress: string;
    multiProvider: MultiProvider;
}): Promise<string>;
export declare function getEtherscanConstructorArgs({ bytecode, chainName, contractAddress, multiProvider, }: {
    bytecode: string;
    chainName: string;
    contractAddress: Address;
    multiProvider: MultiProvider;
}): Promise<string>;
export declare function getZKSyncConstructorArgs({ chainName, contractAddress, multiProvider, }: {
    chainName: string;
    contractAddress: Address;
    multiProvider: MultiProvider;
}): Promise<string>;
export declare function getBlockScoutConstructorArgs({ chainName, contractAddress, multiProvider, }: {
    chainName: string;
    contractAddress: Address;
    multiProvider: MultiProvider;
}): Promise<string>;
export declare function getProxyAndAdminInput({ chainName, multiProvider, proxyAddress, }: {
    chainName: string;
    multiProvider: MultiProvider;
    proxyAddress: Address;
}): Promise<{
    proxyAdminInput: ContractVerificationInput;
    transparentUpgradeableProxyInput: ContractVerificationInput;
}>;
export declare function getImplementationInput({ bytecode, chainName, contractName, implementationAddress, multiProvider, }: {
    bytecode: string;
    chainName: string;
    contractName: string;
    implementationAddress: Address;
    multiProvider: MultiProvider;
}): Promise<ContractVerificationInput>;
//# sourceMappingURL=utils.d.ts.map