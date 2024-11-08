import * as React from "react";
import type { Scene } from "core/scene";
import { DebugLayerTab } from "core/Debug/debugLayer";
import type { GlobalState } from "../../components/globalState";
import "./actionTabs.scss";
interface IActionTabsComponentProps {
    scene?: Scene;
    noCommands?: boolean;
    noHeader?: boolean;
    noExpand?: boolean;
    noClose?: boolean;
    popupMode?: boolean;
    onPopup?: () => void;
    onClose?: () => void;
    globalState?: GlobalState;
    initialTab?: DebugLayerTab;
}
export declare class ActionTabsComponent extends React.Component<IActionTabsComponentProps, {
    selectedEntity: any;
    selectedIndex: number;
}> {
    private _onSelectionChangeObserver;
    private _onTabChangedObserver;
    private _once;
    constructor(props: IActionTabsComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    changeSelectedTab(index: number): void;
    renderContent(): import("react/jsx-runtime").JSX.Element | null;
    onClose(): void;
    onPopup(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
