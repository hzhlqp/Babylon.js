import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PostProcessRenderPipeline } from "core/PostProcesses/RenderPipeline/postProcessRenderPipeline";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: PostProcessRenderPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class RenderingPipelinePropertyGridComponent extends React.Component<IRenderingPipelinePropertyGridComponentProps> {
    constructor(props: IRenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
