import { ProtocolType, addressToBytes32, convertToProtocolAddress, isAddressCosmos, } from '@hyperlane-xyz/utils';
import { BaseCosmNativeAdapter } from '../../app/MultiProtocolApp.js';
import { PROTOCOL_TO_DEFAULT_NATIVE_TOKEN } from '../nativeTokenMetadata.js';
const COSMOS_TYPE_URL_SEND = '/cosmos.bank.v1beta1.MsgSend';
class CosmosModuleTokenAdapter extends BaseCosmNativeAdapter {
    chainName;
    multiProvider;
    addresses;
    properties;
    // use getter so Tokens which extend this base class
    // can overwrite this denom
    async getDenom() {
        return this.properties.denom;
    }
    constructor(chainName, multiProvider, addresses, properties) {
        if (!properties.denom) {
            throw new Error('Missing properties for CosmNativeTokenAdapter');
        }
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.properties = properties;
    }
    async getBalance(address) {
        const provider = await this.getProvider();
        const denom = await this.getDenom();
        // if the address is a cosmos address we can simply read the account balance
        // of that address. The address can also be an ETH address format indicating
        // that the balance of a Hyp Token Contract should be returned. In this case
        // we get the token by it's id and return the bridged supply which equals the
        // balance the token has.
        if (isAddressCosmos(address)) {
            const coin = await provider.getBalance(address, denom);
            return BigInt(coin.amount);
        }
        else {
            const { bridged_supply } = await provider.query.warp.BridgedSupply({
                id: address,
            });
            return BigInt(bridged_supply?.amount ?? '0');
        }
    }
    async getMetadata() {
        const token = await this.multiProvider.getNativeToken(this.chainName);
        return {
            symbol: token.symbol,
            name: token.name,
            decimals: token.decimals,
        };
    }
    async getMinimumTransferAmount(_recipient) {
        return 0n;
    }
    async isApproveRequired() {
        return false;
    }
    populateApproveTx(_transferParams) {
        throw new Error('Approve not required for native tokens');
    }
    async isRevokeApprovalRequired(_, __) {
        return false;
    }
    async populateTransferTx(transferParams) {
        const denom = await this.getDenom();
        return {
            typeUrl: COSMOS_TYPE_URL_SEND,
            value: {
                fromAddress: transferParams.fromAccountOwner,
                toAddress: transferParams.recipient,
                amount: [
                    {
                        denom,
                        amount: transferParams.weiAmountOrId.toString(),
                    },
                ],
            },
        };
    }
    async getTotalSupply() {
        const provider = await this.getProvider();
        const denom = await this.getDenom();
        const supply = await provider.query.bank.supplyOf(denom);
        return BigInt(supply.amount);
    }
}
export class CosmNativeHypCollateralAdapter extends CosmosModuleTokenAdapter {
    chainName;
    multiProvider;
    addresses;
    tokenId;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses, {
            denom: PROTOCOL_TO_DEFAULT_NATIVE_TOKEN[ProtocolType.CosmosNative].denom,
        });
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        this.tokenId = addresses.token;
    }
    async getDenom() {
        const provider = await this.getProvider();
        const { token } = await provider.query.warp.Token({ id: this.tokenId });
        return token?.origin_denom ?? '';
    }
    async getDomains() {
        const provider = await this.getProvider();
        const remoteRouters = await provider.query.warp.RemoteRouters({
            id: this.tokenId,
        });
        return remoteRouters.remote_routers.map((router) => router.receiver_domain);
    }
    async getRouterAddress(domain) {
        const provider = await this.getProvider();
        const remoteRouters = await provider.query.warp.RemoteRouters({
            id: this.tokenId,
        });
        const router = remoteRouters.remote_routers.find((router) => router.receiver_domain === domain);
        if (!router) {
            throw new Error(`Router with domain "${domain}" not found`);
        }
        return Buffer.from(router.receiver_contract);
    }
    async getAllRouters() {
        const provider = await this.getProvider();
        const remoteRouters = await provider.query.warp.RemoteRouters({
            id: this.tokenId,
        });
        return remoteRouters.remote_routers.map((router) => ({
            domain: router.receiver_domain,
            address: Buffer.from(router.receiver_contract),
        }));
    }
    async getBridgedSupply() {
        const provider = await this.getProvider();
        const { bridged_supply } = await provider.query.warp.BridgedSupply({
            id: this.tokenId,
        });
        if (!bridged_supply) {
            return undefined;
        }
        return BigInt(bridged_supply.amount);
    }
    async quoteTransferRemoteGas(destination, _sender) {
        const provider = await this.getProvider();
        const { gas_payment } = await provider.query.warp.QuoteRemoteTransfer({
            id: this.tokenId,
            destination_domain: destination.toString(),
        });
        return {
            addressOrDenom: gas_payment[0].denom,
            amount: BigInt(gas_payment[0].amount),
        };
    }
    async populateTransferRemoteTx(params) {
        if (!params.interchainGas) {
            params.interchainGas = await this.quoteTransferRemoteGas(params.destination);
        }
        const provider = await this.getProvider();
        const { remote_routers } = await provider.query.warp.RemoteRouters({
            id: this.tokenId,
        });
        const router = remote_routers.find((router) => router.receiver_domain === params.destination);
        if (!router) {
            throw new Error(`Failed to find remote router for token id and destination: ${this.tokenId},${params.destination}`);
        }
        if (!params.interchainGas.addressOrDenom) {
            throw new Error(`Require denom for max fee, didn't receive and denom in the interchainGas quote`);
        }
        const msg = {
            typeUrl: '/hyperlane.warp.v1.MsgRemoteTransfer',
            value: {
                sender: params.fromAccountOwner,
                recipient: addressToBytes32(convertToProtocolAddress(params.recipient, ProtocolType.Ethereum), ProtocolType.Ethereum),
                amount: params.weiAmountOrId.toString(),
                token_id: this.tokenId,
                destination_domain: params.destination,
                gas_limit: router.gas,
                max_fee: {
                    denom: params.interchainGas.addressOrDenom || '',
                    amount: params.interchainGas.amount.toString(),
                },
            },
        };
        return msg;
    }
}
export class CosmNativeHypSyntheticAdapter extends CosmNativeHypCollateralAdapter {
    async getTokenDenom() {
        return `hyperlane/${this.tokenId}`;
    }
}
//# sourceMappingURL=CosmosModuleTokenAdapter.js.map