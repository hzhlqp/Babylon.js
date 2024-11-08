import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { Rectangle } from "gui/2D/controls/rectangle";
import type { GlobalState } from "../../../../globalState";
interface IButtonPropertyGridComponentProps {
    rectangles: Rectangle[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onAddComponent: (newComponent: string) => void;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class ButtonPropertyGridComponent extends React.Component<IButtonPropertyGridComponentProps> {
    constructor(props: IButtonPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
