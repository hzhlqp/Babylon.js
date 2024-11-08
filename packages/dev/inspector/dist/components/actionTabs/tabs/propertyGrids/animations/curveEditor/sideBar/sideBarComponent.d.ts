import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import "../scss/sideBar.scss";
interface ISideBarComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface ISideBarComponentState {
    mode: Mode;
}
declare enum Mode {
    Edit = 0,
    Add = 1,
    Load = 2,
    Save = 3
}
export declare class SideBarComponent extends React.Component<ISideBarComponentProps, ISideBarComponentState> {
    constructor(props: ISideBarComponentProps);
    private _onAddAnimation;
    private _onLoadAnimation;
    private _onSaveAnimation;
    private _onEditAnimation;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
