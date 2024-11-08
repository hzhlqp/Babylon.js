import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { ScrollViewer } from "gui/2D/controls/scrollViewers/scrollViewer";
import type { GlobalState } from "../../../../globalState";
interface IScrollViewerPropertyGridComponentProps {
    scrollViewers: ScrollViewer[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
    constructor(props: IScrollViewerPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
