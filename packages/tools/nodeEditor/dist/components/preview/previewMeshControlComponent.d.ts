import * as React from "react";
import type { GlobalState } from "../../globalState";
import { PreviewType } from "./previewType";
interface IPreviewMeshControlComponent {
    globalState: GlobalState;
    togglePreviewAreaComponent: () => void;
}
export declare class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
    private _colorInputRef;
    private _filePickerRef;
    private _envPickerRef;
    private _onResetRequiredObserver;
    private _onDropEventObserver;
    private _onRefreshPreviewMeshControlComponentRequiredObserver;
    constructor(props: IPreviewMeshControlComponent);
    componentWillUnmount(): void;
    changeMeshType(newOne: PreviewType): void;
    useCustomMesh(evt: any): void;
    useCustomEnv(evt: any): void;
    onPopUp(): void;
    changeAnimation(): void;
    changeBackground(value: string): void;
    changeBackgroundClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
