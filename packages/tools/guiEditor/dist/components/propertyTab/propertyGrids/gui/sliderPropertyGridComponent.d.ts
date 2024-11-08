import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { Slider } from "gui/2D/controls/sliders/slider";
import type { ImageBasedSlider } from "gui/2D/controls/sliders/imageBasedSlider";
interface ISliderPropertyGridComponentProps {
    sliders: (Slider | ImageBasedSlider)[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
    constructor(props: ISliderPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
