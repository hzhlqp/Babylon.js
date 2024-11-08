import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { SSAO2RenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssao2RenderingPipeline";
import type { GlobalState } from "../../../../globalState";
interface ISSAO2RenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: SSAO2RenderingPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SSAO2RenderingPipelinePropertyGridComponent extends React.Component<ISSAO2RenderingPipelinePropertyGridComponentProps> {
    constructor(props: ISSAO2RenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
