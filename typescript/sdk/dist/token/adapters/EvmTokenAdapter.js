import { BigNumber } from 'ethers';
import { ERC20__factory, ERC4626__factory, HypERC20Collateral__factory, HypERC20__factory, HypERC4626Collateral__factory, HypERC4626__factory, HypXERC20Lockbox__factory, HypXERC20__factory, IXERC20VS__factory, IXERC20__factory, } from '@hyperlane-xyz/core';
import { addressToByteHexString, addressToBytes32, bytes32ToAddress, strip0x, } from '@hyperlane-xyz/utils';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
// An estimate of the gas amount for a typical EVM token router transferRemote transaction
// Computed by estimating on a few different chains, taking the max, and then adding ~50% padding
export const EVM_TRANSFER_REMOTE_GAS_ESTIMATE = 450000n;
// Interacts with native currencies
export class EvmNativeTokenAdapter extends BaseEvmAdapter {
    async getBalance(address) {
        const balance = await this.getProvider().getBalance(address);
        return BigInt(balance.toString());
    }
    async getMetadata() {
        // TODO get metadata from chainMetadata config
        throw new Error('Metadata not available to native tokens');
    }
    async getMinimumTransferAmount(_recipient) {
        return 0n;
    }
    async isApproveRequired(_owner, _spender, _weiAmountOrId) {
        return false;
    }
    async isRevokeApprovalRequired(_owner, _spender) {
        return false;
    }
    async populateApproveTx(_params) {
        throw new Error('Approve not required for native tokens');
    }
    async populateTransferTx({ weiAmountOrId, recipient, }) {
        const value = BigNumber.from(weiAmountOrId.toString());
        return { value, to: recipient };
    }
    async getTotalSupply() {
        // Not implemented, native tokens don't have an accessible total supply
        return undefined;
    }
}
// Interacts with ERC20/721 contracts
export class EvmTokenAdapter extends EvmNativeTokenAdapter {
    chainName;
    multiProvider;
    addresses;
    contractFactory;
    contract;
    constructor(chainName, multiProvider, addresses, contractFactory = ERC20__factory) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.contractFactory = contractFactory;
        this.contract = contractFactory.connect(addresses.token, this.getProvider());
    }
    async getBalance(address) {
        const balance = await this.contract.balanceOf(address);
        return BigInt(balance.toString());
    }
    async getMetadata(isNft) {
        const [decimals, symbol, name] = await Promise.all([
            isNft ? 0 : this.contract.decimals(),
            this.contract.symbol(),
            this.contract.name(),
        ]);
        return { decimals, symbol, name };
    }
    async isApproveRequired(owner, spender, weiAmountOrId) {
        const allowance = await this.contract.allowance(owner, spender);
        return allowance.lt(weiAmountOrId);
    }
    async isRevokeApprovalRequired(owner, spender) {
        const allowance = await this.contract.allowance(owner, spender);
        return !allowance.isZero();
    }
    populateApproveTx({ weiAmountOrId, recipient, }) {
        return this.contract.populateTransaction.approve(recipient, weiAmountOrId.toString());
    }
    populateTransferTx({ weiAmountOrId, recipient, }) {
        return this.contract.populateTransaction.transfer(recipient, weiAmountOrId.toString());
    }
    async getTotalSupply() {
        const totalSupply = await this.contract.totalSupply();
        return totalSupply.toBigInt();
    }
}
// Interacts with Hyp Synthetic token contracts (aka 'HypTokens')
export class EvmHypSyntheticAdapter extends EvmTokenAdapter {
    chainName;
    multiProvider;
    addresses;
    contractFactory;
    constructor(chainName, multiProvider, addresses, contractFactory = HypERC20__factory) {
        super(chainName, multiProvider, addresses, contractFactory);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.contractFactory = contractFactory;
    }
    async isApproveRequired(_owner, _spender, _weiAmountOrId) {
        return false;
    }
    async isRevokeApprovalRequired(_owner, _spender) {
        return false;
    }
    getDomains() {
        return this.contract.domains();
    }
    async getRouterAddress(domain) {
        const routerAddressesAsBytes32 = await this.contract.routers(domain);
        // Evm addresses will be padded with 12 bytes
        if (routerAddressesAsBytes32.startsWith('0x000000000000000000000000')) {
            return Buffer.from(strip0x(bytes32ToAddress(routerAddressesAsBytes32)), 'hex');
            // Otherwise leave the address unchanged
        }
        else {
            return Buffer.from(strip0x(routerAddressesAsBytes32), 'hex');
        }
    }
    async getAllRouters() {
        const domains = await this.getDomains();
        const routers = await Promise.all(domains.map((d) => this.getRouterAddress(d)));
        return domains.map((d, i) => ({ domain: d, address: routers[i] }));
    }
    getBridgedSupply() {
        return this.getTotalSupply();
    }
    async quoteTransferRemoteGas(destination) {
        const gasPayment = await this.contract.quoteGasPayment(destination);
        // If EVM hyp contracts eventually support alternative IGP tokens,
        // this would need to determine the correct token address
        return { amount: BigInt(gasPayment.toString()) };
    }
    async populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }) {
        if (!interchainGas)
            interchainGas = await this.quoteTransferRemoteGas(destination);
        const recipBytes32 = addressToBytes32(addressToByteHexString(recipient));
        return this.contract.populateTransaction['transferRemote(uint32,bytes32,uint256)'](destination, recipBytes32, weiAmountOrId, {
            value: interchainGas.amount.toString(),
        });
    }
}
// Interacts with HypCollateral contracts
export class EvmHypCollateralAdapter extends EvmHypSyntheticAdapter {
    chainName;
    multiProvider;
    addresses;
    collateralContract;
    wrappedTokenAddress;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.collateralContract = HypERC20Collateral__factory.connect(addresses.token, this.getProvider());
    }
    async getWrappedTokenAddress() {
        if (!this.wrappedTokenAddress) {
            this.wrappedTokenAddress = await this.collateralContract.wrappedToken();
        }
        return this.wrappedTokenAddress;
    }
    async getWrappedTokenAdapter() {
        return new EvmTokenAdapter(this.chainName, this.multiProvider, {
            token: await this.getWrappedTokenAddress(),
        });
    }
    getBridgedSupply() {
        return this.getBalance(this.addresses.token);
    }
    getMetadata(isNft) {
        return this.getWrappedTokenAdapter().then((t) => t.getMetadata(isNft));
    }
    isApproveRequired(owner, spender, weiAmountOrId) {
        return this.getWrappedTokenAdapter().then((t) => t.isApproveRequired(owner, spender, weiAmountOrId));
    }
    async isRevokeApprovalRequired(owner, spender) {
        const collateral = await this.getWrappedTokenAdapter();
        return collateral.isRevokeApprovalRequired(owner, spender);
    }
    populateApproveTx(params) {
        return this.getWrappedTokenAdapter().then((t) => t.populateApproveTx(params));
    }
    populateTransferTx(params) {
        return this.getWrappedTokenAdapter().then((t) => t.populateTransferTx(params));
    }
}
export class EvmHypCollateralFiatAdapter extends EvmHypCollateralAdapter {
    /**
     * Note this may be inaccurate, as this returns the total supply
     * of the fiat token, which may be used by other bridges.
     * However this is the best we can do with a simple view call.
     */
    async getBridgedSupply() {
        const wrapped = await this.getWrappedTokenAdapter();
        return wrapped.getTotalSupply();
    }
}
export class EvmHypRebaseCollateralAdapter extends EvmHypCollateralAdapter {
    chainName;
    multiProvider;
    addresses;
    collateralContract;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.collateralContract = HypERC4626Collateral__factory.connect(addresses.token, this.getProvider());
    }
    async getBridgedSupply() {
        const vault = ERC4626__factory.connect(await this.collateralContract.vault(), this.getProvider());
        const balance = await vault.balanceOf(this.addresses.token);
        return balance.toBigInt();
    }
}
export class EvmHypSyntheticRebaseAdapter extends EvmHypSyntheticAdapter {
    chainName;
    multiProvider;
    addresses;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses, HypERC4626__factory);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
    }
    async getBridgedSupply() {
        const totalShares = await this.contract.totalShares();
        return totalShares.toBigInt();
    }
}
class BaseEvmHypXERC20Adapter extends EvmHypCollateralAdapter {
    chainName;
    multiProvider;
    addresses;
    hypXERC20;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.hypXERC20 = HypXERC20__factory.connect(addresses.token, this.getProvider());
    }
    async getXERC20() {
        const xerc20Addr = await this.hypXERC20.wrappedToken();
        return this.connectXERC20(xerc20Addr);
    }
    async getBridgedSupply() {
        const xerc20 = await this.getXERC20();
        // Both IXERC20 and IXERC20VS have totalSupply, name, etc. if they extend ERC20
        const totalSupply = await xerc20.totalSupply();
        return totalSupply.toBigInt();
    }
    async getMintLimit() {
        const xerc20 = await this.getXERC20();
        const limit = await xerc20.mintingCurrentLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getMintMaxLimit() {
        const xerc20 = await this.getXERC20();
        const limit = await xerc20.mintingMaxLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getBurnLimit() {
        const xerc20 = await this.getXERC20();
        const limit = await xerc20.burningCurrentLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getBurnMaxLimit() {
        const xerc20 = await this.getXERC20();
        const limit = await xerc20.burningMaxLimitOf(this.contract.address);
        return limit.toBigInt();
    }
}
class BaseEvmHypXERC20LockboxAdapter extends EvmHypCollateralAdapter {
    chainName;
    multiProvider;
    addresses;
    hypXERC20Lockbox;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.hypXERC20Lockbox = HypXERC20Lockbox__factory.connect(addresses.token, this.getProvider());
    }
    /**
     * Note this may be inaccurate, as this returns the balance
     * of the lockbox contract, which may be used by other bridges.
     * However this is the best we can do with a simple view call.
     */
    async getBridgedSupply() {
        const lockboxAddress = await this.hypXERC20Lockbox.lockbox();
        return this.getBalance(lockboxAddress);
    }
    async getXERC20() {
        const xERC20Addr = await this.hypXERC20Lockbox.xERC20();
        return this.connectXERC20(xERC20Addr);
    }
    async getMintLimit() {
        const xERC20 = await this.getXERC20();
        const limit = await xERC20.mintingCurrentLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getMintMaxLimit() {
        const xERC20 = await this.getXERC20();
        const limit = await xERC20.mintingMaxLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getBurnLimit() {
        const xERC20 = await this.getXERC20();
        const limit = await xERC20.burningCurrentLimitOf(this.contract.address);
        return limit.toBigInt();
    }
    async getBurnMaxLimit() {
        const xERC20 = await this.getXERC20();
        const limit = await xERC20.burningMaxLimitOf(this.contract.address);
        return limit.toBigInt();
    }
}
// Interacts with HypXERC20Lockbox contracts
export class EvmHypXERC20LockboxAdapter extends BaseEvmHypXERC20LockboxAdapter {
    connectXERC20(xERC20Addr) {
        return IXERC20__factory.connect(xERC20Addr, this.getProvider());
    }
}
export class EvmHypVSXERC20LockboxAdapter extends BaseEvmHypXERC20LockboxAdapter {
    connectXERC20(xERC20Addr) {
        return IXERC20VS__factory.connect(xERC20Addr, this.getProvider());
    }
    // If you need to expose rate-limiting calls or other VS-specific logic:
    async getRateLimits() {
        const xERC20 = await this.getXERC20();
        const rateLimits = await xERC20.rateLimits(this.contract.address);
        return {
            rateLimitPerSecond: BigInt(rateLimits.rateLimitPerSecond.toString()),
            bufferCap: BigInt(rateLimits.bufferCap.toString()),
            lastBufferUsedTime: Number(rateLimits.lastBufferUsedTime),
            bufferStored: BigInt(rateLimits.bufferStored.toString()),
            midPoint: BigInt(rateLimits.midPoint.toString()),
        };
    }
    async populateSetBufferCapTx(newBufferCap) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.setBufferCap(this.addresses.token, newBufferCap);
    }
    async populateSetRateLimitPerSecondTx(newRateLimitPerSecond) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.setRateLimitPerSecond(this.addresses.token, newRateLimitPerSecond);
    }
    async populateAddBridgeTx(bufferCap, rateLimitPerSecond) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.addBridge({
            bufferCap,
            rateLimitPerSecond,
            bridge: this.addresses.token,
        });
    }
}
// Interacts with HypXERC20 contracts
export class EvmHypXERC20Adapter extends BaseEvmHypXERC20Adapter {
    connectXERC20(xerc20Addr) {
        return IXERC20__factory.connect(xerc20Addr, this.getProvider());
    }
}
export class EvmHypVSXERC20Adapter extends BaseEvmHypXERC20Adapter {
    connectXERC20(xerc20Addr) {
        return IXERC20VS__factory.connect(xerc20Addr, this.getProvider());
    }
    async getRateLimits() {
        const xERC20 = await this.getXERC20();
        const rateLimits = await xERC20.rateLimits(this.contract.address);
        return {
            rateLimitPerSecond: BigInt(rateLimits.rateLimitPerSecond.toString()),
            bufferCap: BigInt(rateLimits.bufferCap.toString()),
            lastBufferUsedTime: Number(rateLimits.lastBufferUsedTime),
            bufferStored: BigInt(rateLimits.bufferStored.toString()),
            midPoint: BigInt(rateLimits.midPoint.toString()),
        };
    }
    async populateSetBufferCapTx(newBufferCap) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.setBufferCap(this.addresses.token, newBufferCap);
    }
    async populateSetRateLimitPerSecondTx(newRateLimitPerSecond) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.setRateLimitPerSecond(this.addresses.token, newRateLimitPerSecond);
    }
    async populateAddBridgeTx(bufferCap, rateLimitPerSecond) {
        const xERC20 = await this.getXERC20();
        return xERC20.populateTransaction.addBridge({
            bufferCap,
            rateLimitPerSecond,
            bridge: this.addresses.token,
        });
    }
}
// Interacts HypNative contracts
export class EvmHypNativeAdapter extends EvmHypCollateralAdapter {
    async isApproveRequired() {
        return false;
    }
    async isRevokeApprovalRequired(_owner, _spender) {
        return false;
    }
    async populateTransferRemoteTx({ weiAmountOrId, destination, recipient, interchainGas, }) {
        if (!interchainGas)
            interchainGas = await this.quoteTransferRemoteGas(destination);
        let txValue = undefined;
        const { addressOrDenom: igpAddressOrDenom, amount: igpAmount } = interchainGas;
        // If the igp token is native Eth
        if (!igpAddressOrDenom) {
            txValue = igpAmount + BigInt(weiAmountOrId);
        }
        else {
            txValue = igpAmount;
        }
        const recipBytes32 = addressToBytes32(addressToByteHexString(recipient));
        return this.contract.populateTransaction['transferRemote(uint32,bytes32,uint256)'](destination, recipBytes32, weiAmountOrId, { value: txValue?.toString() });
    }
}
export class EvmXERC20VSAdapter extends EvmTokenAdapter {
    chainName;
    multiProvider;
    addresses;
    xERC20VS;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.xERC20VS = IXERC20VS__factory.connect(addresses.token, this.getProvider());
    }
    async getRateLimits(bridge) {
        const result = await this.xERC20VS.rateLimits(bridge);
        const rateLimits = {
            rateLimitPerSecond: BigInt(result.rateLimitPerSecond.toString()),
            bufferCap: BigInt(result.bufferCap.toString()),
            lastBufferUsedTime: Number(result.lastBufferUsedTime),
            bufferStored: BigInt(result.bufferStored.toString()),
            midPoint: BigInt(result.midPoint.toString()),
        };
        return rateLimits;
    }
    // remove bridge
    async populateRemoveBridgeTx(bridge) {
        return this.xERC20VS.populateTransaction.removeBridge(bridge);
    }
    async populateSetBufferCapTx(bridge, newBufferCap) {
        return this.xERC20VS.populateTransaction.setBufferCap(bridge, newBufferCap.toString());
    }
    async populateSetRateLimitPerSecondTx(bridge, newRateLimitPerSecond) {
        return this.xERC20VS.populateTransaction.setRateLimitPerSecond(bridge, newRateLimitPerSecond.toString());
    }
    async populateAddBridgeTx(bufferCap, rateLimitPerSecond, bridge) {
        return this.xERC20VS.populateTransaction.addBridge({
            bufferCap: bufferCap.toString(),
            rateLimitPerSecond: rateLimitPerSecond.toString(),
            bridge,
        });
    }
}
//# sourceMappingURL=EvmTokenAdapter.js.map