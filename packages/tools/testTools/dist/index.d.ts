export declare const getGlobalConfig: (overrideConfig?: {
    root?: string;
    baseUrl?: string;
}) => {
    root: string;
    baseUrl: string;
    snippetUrl: string;
    pgRoot: string;
};
export * from "./utils";
export * from "./visualizationUtils";
export * from "./seleniumTestUtils";
