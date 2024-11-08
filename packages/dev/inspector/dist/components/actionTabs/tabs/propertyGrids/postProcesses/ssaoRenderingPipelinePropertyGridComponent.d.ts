import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { SSAORenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline";
import type { GlobalState } from "../../../../globalState";
interface ISSAORenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: SSAORenderingPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SSAORenderingPipelinePropertyGridComponent extends React.Component<ISSAORenderingPipelinePropertyGridComponentProps> {
    constructor(props: ISSAORenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
