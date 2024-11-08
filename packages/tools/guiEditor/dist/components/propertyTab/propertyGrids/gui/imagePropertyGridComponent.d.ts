import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { Image } from "gui/2D/controls/image";
import type { GlobalState } from "../../../../globalState";
interface IImagePropertyGridComponentProps {
    images: Image[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export declare class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
    private _observers;
    constructor(props: IImagePropertyGridComponentProps);
    shouldComponentUpdate(nextProps: IImagePropertyGridComponentProps): boolean;
    updateObservers(oldImages: Image[], newImages: Image[]): void;
    componentWillUnmount(): void;
    toggleAnimations(on: boolean): void;
    getMaxCells(): number;
    updateCellSize(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
