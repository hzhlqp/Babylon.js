import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PostProcess } from "core/PostProcesses/postProcess";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IPostProcessPropertyGridComponentProps {
    globalState: GlobalState;
    postProcess: PostProcess;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class PostProcessPropertyGridComponent extends React.Component<IPostProcessPropertyGridComponentProps> {
    constructor(props: IPostProcessPropertyGridComponentProps);
    edit(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
