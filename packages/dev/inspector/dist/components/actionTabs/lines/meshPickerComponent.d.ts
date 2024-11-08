import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../propertyChangedEvent";
import type { Scene } from "core/scene";
interface IMeshPickerComponentProps {
    globalState: GlobalState;
    target: any;
    property: string;
    scene: Scene;
    label: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class MeshPickerComponent extends React.Component<IMeshPickerComponentProps> {
    constructor(props: IMeshPickerComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
