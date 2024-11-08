import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { PostProcess } from "core/PostProcesses/postProcess";
import * as React from "react";
interface IPostProcessItemComponentProps {
    postProcess: PostProcess;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class PostProcessItemComponent extends React.Component<IPostProcessItemComponentProps> {
    constructor(props: IPostProcessItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
