import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { Control } from "gui/2D/controls/control";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import "./propertyTab.scss";
interface IPropertyTabComponentProps {
    globalState: GlobalState;
}
export declare class PropertyTabComponent extends React.Component<IPropertyTabComponentProps> {
    private _onBuiltObserver;
    private _timerIntervalId;
    private _lockObject;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    load(file: File): void;
    /**
     * Read loaded file
     * @param file
     */
    loadControl(file: File): void;
    save(saveCallback: () => void): void;
    saveLocally: () => void;
    /**
     * Save the selected control as Json with file name of guiControl
     */
    saveSelectedControlLocally: () => void;
    saveToSnippetServerHelper: (content: string, adt: AdvancedDynamicTexture) => Promise<string>;
    saveToSnippetServer: () => Promise<void>;
    loadFromSnippet(): void;
    renderNode(nodes: Control[]): import("react/jsx-runtime").JSX.Element;
    /**
     * returns the class name of a list of controls if they share a class, or an empty string if not
     * @param nodes the list of controls to check
     * @returns the class name of a list of controls if they share a class, or an empty string if not
     */
    getControlsCommonClassName(nodes: Control[]): string;
    renderProperties(nodes: Control[]): import("react/jsx-runtime").JSX.Element | undefined;
    renderControlIcon(nodes: Control[]): string;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
