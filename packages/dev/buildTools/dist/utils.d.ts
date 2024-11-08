export declare function populateEnvironment(): void;
export declare function checkDirectorySync(directory: string): void;
export declare function removeDir(path: string): void;
export declare const externalArgs: string[];
export declare const checkArgs: (testArgument: string | string[], checkOnly?: boolean, requiredIfSet?: boolean) => string | boolean;
export declare function copyFile(from: string, to: string, silent?: boolean, checkHash?: boolean): void;
/**
 * This function will copy a folder from one location to another, independent of the OS.
 * @param from directory to copy from
 * @param to directory to copy to
 * @param silent if true, will not log anything
 */
export declare function copyFolder(from: string, to: string, silent?: boolean): void;
export declare const kebabize: (str: string) => string;
export declare const camelize: (s: string) => string;
export declare const debounce: <T extends (...args: any[]) => any>(callback: T, waitFor: number) => (...args: Parameters<T>) => ReturnType<T>;
export declare function findRootDirectory(): string;
export declare const getHashOfFile: (filePath: string) => string;
export declare const getHashOfContent: (content: string) => string;
