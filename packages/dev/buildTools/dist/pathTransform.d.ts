import * as ts from "typescript";
import type { BuildType } from "./packageMapping.js";
/**
 * Transform the source location to the right location according to build type.
 * Used mainly for publishing and generating LTS versions.
 * The idea is to convert 'import { Something } from "location/something";' to 'import { Something } from "package/something";'
 * @param location the source's location
 * @param options the transformer options
 * @param sourceFilename the optional source filename
 * @returns the new location
 */
export declare const transformPackageLocation: (location: string, options: ITransformerOptions, sourceFilename?: string) => string | undefined;
type TransformerNode = ts.Bundle | ts.SourceFile;
/**
 * Options to pass for the transform function
 */
interface ITransformerOptions {
    /**
     * can be lts, esm, umd and es6
     */
    buildType: BuildType;
    /**
     * the current package being processed. Whether abstract (core, gui) or concrete (@babylonjs/core, babylonjs and so on)
     */
    basePackage: string;
    /**
     * do not return full path but only the package
     */
    packageOnly: boolean;
    /**
     * Should we append ".js" to the end of the import
     * can either be a boolean or the actual extension to add (like ".mjs")
     */
    appendJS?: boolean | string;
    keepDev?: boolean;
}
export default function transformer(_program: ts.Program, options: ITransformerOptions): <T extends TransformerNode>(context: ts.TransformationContext) => ts.Transformer<T>;
export declare const storeTsLib: () => void;
export {};
