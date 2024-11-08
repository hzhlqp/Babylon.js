import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { DefaultRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IDefaultRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: DefaultRenderingPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class DefaultRenderingPipelinePropertyGridComponent extends React.Component<IDefaultRenderingPipelinePropertyGridComponentProps> {
    constructor(props: IDefaultRenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
