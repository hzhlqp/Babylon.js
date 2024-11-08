import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { ImageBasedSlider } from "gui/2D/controls/sliders/imageBasedSlider";
import type { GlobalState } from "../../../../globalState";
interface IImageBasedSliderPropertyGridComponentProps {
    imageBasedSliders: ImageBasedSlider[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
    constructor(props: IImageBasedSliderPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
