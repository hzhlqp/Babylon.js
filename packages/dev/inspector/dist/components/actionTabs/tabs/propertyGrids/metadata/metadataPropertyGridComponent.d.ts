import * as React from "react";
import type { GlobalState } from "inspector/components/globalState";
import "./metadataPropertyGrid.scss";
interface IMetadataComponentProps {
    globalState: GlobalState;
    entity: any;
}
declare enum MetadataTypes {
    UNDEFINED = "undefined",
    NULL = "null",
    STRING = "string",
    OBJECT = "Object",
    JSON = "JSON"
}
/** Metadata Grid Component */
export declare class MetadataGridComponent extends React.Component<IMetadataComponentProps, {
    selectedEntityMetadata: string;
    dirty: boolean;
    prettyJson: boolean;
    preventObjCorruption: boolean;
    metadataPropType: MetadataTypes;
    statusMessage: string | null;
    isValidJson: boolean;
}> {
    private readonly _textAreaHost;
    /**
     * @param props - component props
     */
    constructor(props: IMetadataComponentProps);
    /** @ignorenaming */
    componentDidMount(): void;
    /**
     * @param prevProps - previous component props
     */
    componentDidUpdate(prevProps: Readonly<IMetadataComponentProps>): void;
    /** on entity refresh */
    refreshSelected(): void;
    /**
     * @param disabled - is disabled
     */
    setTextAreaDisabled(disabled: boolean): void;
    /**
     * @returns class name
     */
    getClassName(): string;
    /**
     * Determines the Metadata type
     * @param entity Picked entity
     * @returns MetadataTypes
     */
    getEntityType(entity: any): MetadataTypes;
    /**
     * @param input - any input
     * @returns is string
     */
    isString(input: any): boolean;
    /**
     * @param object - any object
     * @returns is parsable
     */
    parsableJson(object: Object): boolean;
    /**
     * @param string - any string
     * @returns parsable string
     */
    parsableString(string: string): JSON | null;
    /**
     * @param validJson - a valid json
     * @param metadata - any metadata
     * @returns parsed metadata
     */
    parseMetaObject(validJson: boolean, metadata: any): any;
    /**
     * Recurse through an object to check for any Functions, returns False if found at least one
     * @param o Any Object, String or number
     * @returns Boolean
     */
    objectCanSafelyStringify(o: Object | string | number): boolean;
    copyToClipboard(): void;
    /** Safely checks if valid JSON then appends necessary props without overwriting existing */
    populateGltfExtras(): void;
    /** render
     * @returns the component
     */
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
