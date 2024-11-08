import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { PostProcessRenderPipeline } from "core/PostProcesses/RenderPipeline/postProcessRenderPipeline";
import * as React from "react";
interface IRenderPipelineItemComponenttProps {
    renderPipeline: PostProcessRenderPipeline;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class RenderingPipelineItemComponent extends React.Component<IRenderPipelineItemComponenttProps> {
    constructor(props: IRenderPipelineItemComponenttProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
