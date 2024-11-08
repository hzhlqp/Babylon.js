import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface ISaveAnimationComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface ISaveAnimationComponentState {
}
export declare class SaveAnimationComponent extends React.Component<ISaveAnimationComponentProps, ISaveAnimationComponentState> {
    private _selectedAnimations;
    private _root;
    constructor(props: ISaveAnimationComponentProps);
    private _getJson;
    saveToSnippetServer(): void;
    saveToFile(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
