import * as React from "react";
import type { GlobalState } from "../../globalState";
interface IPreviewMeshControlComponent {
    globalState: GlobalState;
    togglePreviewAreaComponent: () => void;
}
export declare class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
    private _colorInputRef;
    private _onResetRequiredObserver;
    private _onRefreshPreviewMeshControlComponentRequiredObserver;
    constructor(props: IPreviewMeshControlComponent);
    componentWillUnmount(): void;
    onPopUp(): void;
    changeAnimation(): void;
    changeBackground(value: string): void;
    changeBackgroundClick(): void;
    frame(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
