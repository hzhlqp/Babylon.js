import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { SSRRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssrRenderingPipeline";
import type { GlobalState } from "../../../../globalState";
interface ISSRRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: SSRRenderingPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SSRRenderingPipelinePropertyGridComponent extends React.Component<ISSRRenderingPipelinePropertyGridComponentProps> {
    constructor(props: ISSRRenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
