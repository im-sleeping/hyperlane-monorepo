export var ProtocolType;
(function (ProtocolType) {
    ProtocolType["Ethereum"] = "ethereum";
    ProtocolType["Sealevel"] = "sealevel";
    ProtocolType["Cosmos"] = "cosmos";
    ProtocolType["CosmosNative"] = "cosmosnative";
    ProtocolType["Starknet"] = "starknet";
})(ProtocolType || (ProtocolType = {}));
export const ProtocolSmallestUnit = {
    [ProtocolType.Ethereum]: 'wei',
    [ProtocolType.Sealevel]: 'lamports',
    [ProtocolType.Cosmos]: 'uATOM',
    [ProtocolType.CosmosNative]: 'uATOM',
    [ProtocolType.Starknet]: 'fri',
};
export var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["NONE"] = 0] = "NONE";
    MessageStatus[MessageStatus["PROCESSED"] = 1] = "PROCESSED";
})(MessageStatus || (MessageStatus = {}));
//# sourceMappingURL=types.js.map