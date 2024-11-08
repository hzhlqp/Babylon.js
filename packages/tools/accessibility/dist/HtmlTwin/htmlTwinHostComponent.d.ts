import * as React from "react";
import type { HTMLTwinItem } from "./htmlTwinItem";
import type { Scene } from "core/scene";
import type { IHTMLTwinRendererOptions } from "./htmlTwinRenderer";
interface IHTMLTwinHostComponentProps {
    scene: Scene;
    options?: IHTMLTwinRendererOptions;
}
interface IHTMLTwinHostComponentState {
    a11yTreeItems: HTMLTwinItem[];
}
export declare class HTMLTwinHostComponent extends React.Component<IHTMLTwinHostComponentProps, IHTMLTwinHostComponentState> {
    private _options;
    constructor(props: IHTMLTwinHostComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
