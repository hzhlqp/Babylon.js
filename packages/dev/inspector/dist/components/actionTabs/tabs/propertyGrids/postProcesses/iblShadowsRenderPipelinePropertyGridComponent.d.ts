import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { IblShadowsRenderPipeline } from "core/Rendering/IBLShadows/iblShadowsRenderPipeline";
import type { GlobalState } from "../../../../globalState";
interface IIblShadowsRenderPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: IblShadowsRenderPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class IblShadowsRenderPipelinePropertyGridComponent extends React.Component<IIblShadowsRenderPipelinePropertyGridComponentProps> {
    constructor(props: IIblShadowsRenderPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
