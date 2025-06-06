export declare const importRestrictionsPlugin: {
    name: string;
    rules: {
        'no-restricted-imports-from-exports': import("eslint").Rule.RuleModule;
    };
};
export declare const sortYamlArraysPlugin: {
    name: string;
    rules: {
        'sort-yaml-arrays': {
            meta: {
                type: string;
                docs: {
                    description: string;
                    category: string;
                    recommended: boolean;
                    url: null;
                };
                fixable: string;
                schema: {
                    type: string;
                    properties: {
                        arrays: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    path: {
                                        type: string;
                                    };
                                    sortKey: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                    additionalProperties: boolean;
                }[];
            };
            create(context: import("eslint").Rule.RuleContext): {
                Program(node: import("eslint").Rule.Node): void;
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map