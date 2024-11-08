import * as React from "react";
import type { Scene } from "core/scene";
import type { GlobalState } from "../../../globalState";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IGLTFComponentProps {
    scene: Scene;
    globalState: GlobalState;
    lockObject: LockObject;
}
interface IGLTFComponentState {
    showGLTFLoaderOptions: boolean;
    showGLTFExtensionOptions: boolean;
}
export declare class GLTFComponent extends React.Component<IGLTFComponentProps, IGLTFComponentState> {
    private _onValidationResultsUpdatedObserver;
    constructor(props: IGLTFComponentProps);
    openValidationDetails(): void;
    prepareText(singularForm: string, count: number): string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderValidation(): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
