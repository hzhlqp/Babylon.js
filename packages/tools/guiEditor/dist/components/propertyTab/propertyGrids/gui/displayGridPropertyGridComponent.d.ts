import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { DisplayGrid } from "gui/2D/controls/displayGrid";
import type { GlobalState } from "../../../../globalState";
interface IDisplayGridPropertyGridComponentProps {
    displayGrids: DisplayGrid[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class DisplayGridPropertyGridComponent extends React.Component<IDisplayGridPropertyGridComponentProps> {
    constructor(props: IDisplayGridPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
