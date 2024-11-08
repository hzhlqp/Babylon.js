import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StackPanel } from "gui/2D/controls/stackPanel";
import type { GlobalState } from "../../../../globalState";
interface IStackPanelPropertyGridComponentProps {
    stackPanels: StackPanel[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
    constructor(props: IStackPanelPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
