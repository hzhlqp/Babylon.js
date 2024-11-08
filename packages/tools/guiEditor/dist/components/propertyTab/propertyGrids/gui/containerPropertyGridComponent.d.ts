import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { Container } from "gui/2D/controls/container";
interface IContainerPropertyGridComponentProps {
    containers: Container[];
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ContainerPropertyGridComponent extends React.Component<IContainerPropertyGridComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
