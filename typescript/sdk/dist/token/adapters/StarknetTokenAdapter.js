import { BigNumber } from 'ethers';
import { CairoOption, CairoOptionVariant, num } from 'starknet';
import { ProtocolType, assert, } from '@hyperlane-xyz/utils';
import { BaseStarknetAdapter } from '../../app/MultiProtocolApp.js';
import { getStarknetEtherContract, getStarknetHypERC20CollateralContract, getStarknetHypERC20Contract, } from '../../utils/starknet.js';
import { PROTOCOL_TO_DEFAULT_NATIVE_TOKEN } from '../nativeTokenMetadata.js';
export class StarknetHypSyntheticAdapter extends BaseStarknetAdapter {
    chainName;
    multiProvider;
    addresses;
    contract;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.contract = getStarknetHypERC20Contract(addresses.warpRouter, multiProvider.getStarknetProvider(chainName));
    }
    async getBalance(address) {
        return this.contract.balanceOf(address);
    }
    async getMetadata(_isNft) {
        const [decimals, symbol, name] = await Promise.all([
            this.contract.decimals(),
            this.contract.symbol(),
            this.contract.name(),
        ]);
        return { decimals, symbol, name };
    }
    async isApproveRequired(owner, spender, weiAmountOrId) {
        const allowance = await this.contract.allowance(owner, spender);
        return BigNumber.from(allowance.toString()).lt(BigNumber.from(weiAmountOrId));
    }
    async isRevokeApprovalRequired(_owner, _spender) {
        return false;
    }
    async populateApproveTx({ weiAmountOrId, recipient, }) {
        return this.contract.populateTransaction.approve(recipient, weiAmountOrId);
    }
    async populateTransferTx({ weiAmountOrId, recipient, }) {
        return this.contract.populateTransaction.transfer(recipient, weiAmountOrId);
    }
    async getTotalSupply() {
        return undefined;
    }
    async quoteTransferRemoteGas(_destination) {
        return { amount: 0n };
    }
    async populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }) {
        const nonOption = new CairoOption(CairoOptionVariant.None);
        const transferTx = this.contract.populateTransaction.transfer_remote(destination, recipient, BigInt(weiAmountOrId.toString()), 0n, nonOption, nonOption);
        return {
            ...transferTx,
            value: interchainGas?.amount
                ? BigNumber.from(interchainGas.amount)
                : BigNumber.from(0),
        };
    }
    async getMinimumTransferAmount(_recipient) {
        return 0n;
    }
    async getDomains() {
        return this.contract.domains();
    }
    async getRouterAddress(domain) {
        const routerAddresses = await this.contract.routers(domain);
        return Buffer.from(routerAddresses);
    }
    async getAllRouters() {
        const domains = await this.getDomains();
        const routers = await Promise.all(domains.map((d) => this.getRouterAddress(d)));
        return domains.map((d, i) => ({ domain: d, address: routers[i] }));
    }
    async getBridgedSupply() {
        return undefined;
    }
}
export class StarknetHypCollateralAdapter extends StarknetHypSyntheticAdapter {
    collateralContract;
    wrappedTokenAddress;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.collateralContract = getStarknetHypERC20CollateralContract(addresses.warpRouter, multiProvider.getStarknetProvider(chainName));
    }
    async getWrappedTokenAddress() {
        if (!this.wrappedTokenAddress) {
            this.wrappedTokenAddress = num.toHex64(await this.collateralContract.get_wrapped_token());
        }
        return this.wrappedTokenAddress;
    }
    async getWrappedTokenAdapter() {
        return new StarknetHypSyntheticAdapter(this.chainName, this.multiProvider, {
            warpRouter: await this.getWrappedTokenAddress(),
        });
    }
    async getBalance(address) {
        const adapter = await this.getWrappedTokenAdapter();
        return adapter.getBalance(address);
    }
    getBridgedSupply() {
        return this.getBalance(this.addresses.warpRouter);
    }
    async getMetadata(isNft) {
        const adapter = await this.getWrappedTokenAdapter();
        return adapter.getMetadata(isNft);
    }
    async isApproveRequired(owner, spender, weiAmountOrId) {
        const adapter = await this.getWrappedTokenAdapter();
        return adapter.isApproveRequired(owner, spender, weiAmountOrId);
    }
    async populateApproveTx(params) {
        const adapter = await this.getWrappedTokenAdapter();
        return adapter.populateApproveTx(params);
    }
    async populateTransferTx(params) {
        const adapter = await this.getWrappedTokenAdapter();
        return adapter.populateTransferTx(params);
    }
}
export class StarknetHypNativeAdapter extends StarknetHypSyntheticAdapter {
    collateralContract;
    nativeContract;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.collateralContract = getStarknetHypERC20CollateralContract(addresses.warpRouter, multiProvider.getStarknetProvider(chainName));
        const nativeAddress = multiProvider.getChainMetadata(chainName)?.nativeToken?.denom;
        const tokenAddress = nativeAddress ??
            PROTOCOL_TO_DEFAULT_NATIVE_TOKEN[ProtocolType.Starknet].denom;
        assert(tokenAddress, `Native address not found for chain ${chainName}`);
        this.nativeContract = getStarknetEtherContract(tokenAddress, multiProvider.getStarknetProvider(chainName));
    }
    async getBalance(address) {
        return this.nativeContract.balanceOf(address);
    }
    async isApproveRequired(owner, spender, weiAmountOrId) {
        const allowance = await this.nativeContract.allowance(owner, spender);
        return BigNumber.from(allowance.toString()).lt(BigNumber.from(weiAmountOrId));
    }
    async populateApproveTx({ weiAmountOrId, recipient, }) {
        return this.nativeContract.populateTransaction.approve(recipient, weiAmountOrId);
    }
    async populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }) {
        const nonOption = new CairoOption(CairoOptionVariant.None);
        const transferTx = this.collateralContract.populateTransaction.transfer_remote(destination, recipient, BigInt(weiAmountOrId.toString()), BigInt(weiAmountOrId.toString()), nonOption, nonOption);
        return {
            ...transferTx,
            value: interchainGas?.amount
                ? BigNumber.from(interchainGas.amount)
                : BigNumber.from(0),
        };
    }
}
//# sourceMappingURL=StarknetTokenAdapter.js.map