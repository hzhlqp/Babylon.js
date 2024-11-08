import { TSDocConfigFile } from "@microsoft/tsdoc-config";
export declare class ConfigCache {
    private static _CachedConfigs;
    /**
     * Node.js equivalent of performance.now().
     * @returns A high-resolution timestamp in milliseconds.
     */
    private static _GetTimeInMs;
    static GetForSourceFile(sourceFilePath: string): TSDocConfigFile;
}
