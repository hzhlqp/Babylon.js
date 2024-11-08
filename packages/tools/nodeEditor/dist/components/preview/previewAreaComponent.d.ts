import * as React from "react";
import type { GlobalState } from "../../globalState";
interface IPreviewAreaComponentProps {
    globalState: GlobalState;
    width: number;
}
export declare class PreviewAreaComponent extends React.Component<IPreviewAreaComponentProps, {
    isLoading: boolean;
}> {
    private _onIsLoadingChangedObserver;
    private _onResetRequiredObserver;
    constructor(props: IPreviewAreaComponentProps);
    componentWillUnmount(): void;
    changeBackFaceCulling(value: boolean): void;
    changeDepthPrePass(value: boolean): void;
    _onPointerOverCanvas: () => void;
    _onPointerOutCanvas: () => void;
    changeParticleSystemBlendMode(newOne: number): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
