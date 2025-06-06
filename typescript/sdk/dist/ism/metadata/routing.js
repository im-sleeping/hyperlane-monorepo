import { DefaultFallbackRoutingIsm__factory, InterchainAccountIsm__factory, } from '@hyperlane-xyz/core';
import { assert } from '@hyperlane-xyz/utils';
import { EvmIsmReader } from '../EvmIsmReader.js';
import { IsmType, } from '../types.js';
import { decodeIsmMetadata } from './decode.js';
export class RoutingMetadataBuilder {
    baseMetadataBuilder;
    constructor(baseMetadataBuilder) {
        this.baseMetadataBuilder = baseMetadataBuilder;
    }
    async build(context, maxDepth = 10) {
        const originChain = this.baseMetadataBuilder.multiProvider.getChainName(context.message.parsed.origin);
        const originContext = {
            ...context,
            ism: context.ism.domains[originChain],
        };
        return this.baseMetadataBuilder.build(originContext, maxDepth - 1);
    }
    static decode(metadata, context) {
        // TODO: this is a naive implementation, we should support domain ID keys
        assert(context.message.parsed.originChain, 'originChain is required');
        const ism = context.ism.domains[context.message.parsed.originChain];
        const originMetadata = typeof ism === 'string'
            ? metadata
            : decodeIsmMetadata(metadata, {
                ...context,
                ism: ism,
            });
        return {
            type: IsmType.ROUTING,
            origin: context.message.parsed.originChain,
            metadata: originMetadata,
        };
    }
}
export class DefaultFallbackRoutingMetadataBuilder extends RoutingMetadataBuilder {
    async build(context, maxDepth = 10) {
        const originChain = this.baseMetadataBuilder.multiProvider.getChainName(context.message.parsed.origin);
        const isRouted = context.ism.type === IsmType.ICA_ROUTING ||
            context.ism.type === IsmType.AMOUNT_ROUTING
            ? false
            : !!context.ism.domains[originChain];
        // If the chain is routed then we are 100% sure that the ism is not an ICA ISM
        if (isRouted && context.ism.type !== IsmType.ICA_ROUTING) {
            return super.build(
            // Typescript is not clever enough to understand that after the conditional check
            // the ism type will be of the same expected type
            context, maxDepth);
        }
        if (context.ism.type !== IsmType.FALLBACK_ROUTING &&
            context.ism.type !== IsmType.ICA_ROUTING &&
            context.ism.type !== IsmType.AMOUNT_ROUTING) {
            throw new Error(`Origin domain ${originChain} is not enrolled in DomainRoutingIsm`);
        }
        const destinationProvider = this.baseMetadataBuilder.multiProvider.getProvider(context.message.parsed.destination);
        let ismAddress;
        if (context.ism.type === IsmType.ICA_ROUTING) {
            const icaFallbackRoutingIsm = InterchainAccountIsm__factory.connect(context.ism.address, destinationProvider);
            ismAddress = await icaFallbackRoutingIsm.route(context.message.message);
        }
        else if (context.ism.type === IsmType.AMOUNT_ROUTING) {
            const amountFallbackRoutingIsm = DefaultFallbackRoutingIsm__factory.connect(context.ism.address, destinationProvider);
            ismAddress = await amountFallbackRoutingIsm.route(context.message.message);
        }
        else {
            const fallbackIsm = DefaultFallbackRoutingIsm__factory.connect(context.ism.address, destinationProvider);
            ismAddress = await fallbackIsm.module(context.message.parsed.origin);
        }
        const ismReader = new EvmIsmReader(this.baseMetadataBuilder.multiProvider, context.message.parsed.destination);
        const defaultIsmConfig = await ismReader.deriveIsmConfig(ismAddress);
        const originContext = {
            ...context,
            ism: defaultIsmConfig,
        };
        return this.baseMetadataBuilder.build(originContext, maxDepth - 1);
    }
}
//# sourceMappingURL=routing.js.map