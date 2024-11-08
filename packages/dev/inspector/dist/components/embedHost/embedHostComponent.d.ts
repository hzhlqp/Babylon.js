import * as React from "react";
import type { Scene } from "core/scene";
import type { GlobalState } from "../../components/globalState";
import type { IExplorerExtensibilityGroup, DebugLayerTab, IExplorerAdditionalNode } from "core/Debug/debugLayer";
import "./embedHost.scss";
interface IEmbedHostComponentProps {
    scene: Scene;
    globalState: GlobalState;
    popupMode: boolean;
    noClose?: boolean;
    noExpand?: boolean;
    onClose: () => void;
    onPopup: () => void;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    additionalNodes?: IExplorerAdditionalNode[];
    initialTab?: DebugLayerTab;
}
export declare class EmbedHostComponent extends React.Component<IEmbedHostComponentProps> {
    private _once;
    private _splitRef;
    private _topPartRef;
    private _bottomPartRef;
    constructor(props: IEmbedHostComponentProps);
    componentDidMount(): void;
    renderContent(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
