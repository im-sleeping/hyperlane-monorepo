function formatExplorerUrl({ apiUrl, apiKey }, params) {
    // hack for Blockscout API urls that in the explorer have the `eth-rpc` path set
    // as it will cause requests to fail with a not found error
    const urlObject = new URL(apiUrl.replace('eth-rpc', ''));
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            urlObject.searchParams.append(key, value.toString());
        }
    }
    if (apiKey) {
        urlObject.searchParams.append('apikey', apiKey);
    }
    return urlObject.toString();
}
async function handleEtherscanResponse(response) {
    const body = await response.json();
    const explorerUrl = new URL(response.url);
    if (body.status === '0') {
        throw new Error(`Error while performing request to Etherscan like API at ${explorerUrl.host}: ${body.message} ${body.result}`);
    }
    return body.result;
}
export async function tryGetContractDeploymentTransaction(explorerOptions, { contractAddress }) {
    const options = {
        module: 'contract',
        action: 'getcontractcreation',
        contractaddresses: contractAddress,
    };
    const requestUrl = formatExplorerUrl(explorerOptions, options);
    const response = await fetch(requestUrl);
    const [deploymentTx] = await handleEtherscanResponse(response);
    return deploymentTx;
}
export async function getContractDeploymentTransaction(explorerOptions, requestOptions) {
    const deploymentTx = await tryGetContractDeploymentTransaction(explorerOptions, requestOptions);
    if (!deploymentTx) {
        throw new Error(`No deployment transaction found for contract ${requestOptions.contractAddress}`);
    }
    return deploymentTx;
}
export async function getLogsFromEtherscanLikeExplorerAPI({ apiUrl, apiKey: apikey }, options) {
    const data = {
        module: 'logs',
        action: 'getLogs',
        address: options.address,
        fromBlock: options.fromBlock,
        toBlock: options.toBlock,
        topic0: options.topic0,
    };
    const requestUrl = formatExplorerUrl({ apiUrl, apiKey: apikey }, data);
    const response = await fetch(requestUrl);
    return handleEtherscanResponse(response);
}
//# sourceMappingURL=etherscan.js.map