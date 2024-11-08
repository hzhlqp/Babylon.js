import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { Slider } from "gui/2D/controls/sliders/slider";
import type { GlobalState } from "../../../../globalState";
interface ISliderGenericPropertyGridComponentProps {
    sliders: Slider[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class SliderGenericPropertyGridComponent extends React.Component<ISliderGenericPropertyGridComponentProps> {
    constructor(props: ISliderGenericPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
