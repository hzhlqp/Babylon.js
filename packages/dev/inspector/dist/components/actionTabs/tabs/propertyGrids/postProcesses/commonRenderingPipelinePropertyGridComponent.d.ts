import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { PostProcessRenderPipeline } from "core/PostProcesses/RenderPipeline/postProcessRenderPipeline";
import type { GlobalState } from "../../../../globalState";
interface ICommonRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: PostProcessRenderPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CommonRenderingPipelinePropertyGridComponent extends React.Component<ICommonRenderingPipelinePropertyGridComponentProps> {
    constructor(props: ICommonRenderingPipelinePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
