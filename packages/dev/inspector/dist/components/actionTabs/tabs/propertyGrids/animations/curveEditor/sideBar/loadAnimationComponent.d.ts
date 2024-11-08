import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface ILoadAnimationComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface ILoadAnimationComponentState {
}
export declare class LoadAnimationComponent extends React.Component<ILoadAnimationComponentProps, ILoadAnimationComponentState> {
    private _root;
    private _textInput;
    constructor(props: ILoadAnimationComponentProps);
    loadFromFile(evt: React.ChangeEvent<HTMLInputElement>): void;
    loadFromSnippetServer(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
