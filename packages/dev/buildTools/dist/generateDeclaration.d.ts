import type { BuildType, DevPackageName } from "./packageMapping.js";
export interface IGenerateDeclarationConfig {
    devPackageName: DevPackageName;
    outputDirectory?: string;
    externals?: {
        [key: string]: string;
    };
    hiddenConsts?: string[];
    namedExportPathsToExclude?: string;
    filename?: string;
    declarationLibs: string[];
    buildType?: BuildType;
    addToDocumentation?: boolean;
    initDocumentation?: boolean;
    fileFilterRegex?: string;
}
export declare function generateCombinedDeclaration(declarationFiles: string[], config: IGenerateDeclarationConfig, looseDeclarations?: string[], buildType?: BuildType): {
    output: string;
    namespaceDeclaration: string;
    looseDeclarationsString: string;
};
export declare function generateDeclaration(): void;
