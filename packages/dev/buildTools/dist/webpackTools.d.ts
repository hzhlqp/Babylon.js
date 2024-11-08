import type ts from "typescript";
import type { BuildType, DevPackageName } from "./packageMapping.js";
import type { RuleSetRule, Configuration } from "webpack";
export declare const externalsFunction: (excludePackages?: string[], type?: BuildType) => ({ context, request }: {
    context: string;
    request: string;
}, callback: (err: Error | null, result?: any) => void) => void;
export declare const getRules: (options?: {
    includeAssets?: boolean | undefined;
    includeCSS?: boolean | undefined;
    sideEffects?: boolean | undefined;
    tsOptions?: {
        [key: string]: any;
        configFile?: string | undefined;
        getCustomTransformers?: ((_program: ts.Program) => Required<Pick<ts.CustomTransformers, "after" | "afterDeclarations">>) | undefined;
    } | undefined;
    resourceType?: "asset/inline" | "asset/resource" | undefined;
    extraRules?: RuleSetRule[] | undefined;
    mode?: "development" | "production" | undefined;
}) => RuleSetRule[];
export declare const commonDevWebpackConfiguration: (env: {
    mode: "development" | "production";
    outputFilename: string;
    dirName: string;
    dirSuffix?: string;
    enableHttps?: boolean;
    enableHotReload?: boolean;
    enableLiveReload?: boolean;
}, devServerConfig?: {
    port: number;
    static?: string[];
    showBuildProgress?: boolean;
}) => {
    mode: string;
    devtool: string;
    devServer: {
        port: number;
        static: string[] | undefined;
        webSocketServer: string | boolean;
        compress: boolean;
        server: string;
        hot: boolean;
        liveReload: boolean;
        headers: {
            "Access-Control-Allow-Origin": string;
        };
        client: {
            overlay: boolean | {
                warnings: boolean;
                errors: boolean;
            };
            logging: string;
            progress: boolean | undefined;
        };
        allowedHosts: string[] | undefined;
    } | undefined;
    output: {
        path: string;
        filename: string;
        clean: boolean;
        devtoolModuleFilenameTemplate: string;
    } | undefined;
};
export declare const commonUMDWebpackConfiguration: (options: {
    entryPoints?: {
        [name: string]: string;
    } | undefined;
    overrideFilename?: string | ((chunk: any) => string) | undefined;
    devPackageName: DevPackageName;
    devPackageAliasPath?: string | undefined;
    mode?: "development" | "production" | undefined;
    namespace?: string | undefined;
    outputPath?: string | undefined;
    alias?: {
        [key: string]: string;
    } | undefined;
    optionalExternalFunctionSkip?: string[] | undefined;
    extendedWebpackConfig?: Partial<Configuration> | undefined;
    es6Mode?: boolean | undefined;
    maxMode?: boolean | undefined;
    extraExternals?: Configuration["externals"];
}) => Configuration;
