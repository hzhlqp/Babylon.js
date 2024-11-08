import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import { Control } from "gui/2D/controls/control";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { IInspectableOptions } from "core/Misc/iInspectable";
import type { GlobalState } from "../../../../globalState";
interface ICommonControlPropertyGridComponentProps {
    controls: Control[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    hideDimensions?: boolean;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
interface ICommonControlPropertyGridComponentState {
    fontFamilyOptions: IInspectableOptions[];
}
export declare class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps, ICommonControlPropertyGridComponentState> {
    private _onPropertyChangedObserver;
    private _onFontsParsedObserver;
    private _onControlVisibilityChangedObservers;
    constructor(props: ICommonControlPropertyGridComponentProps);
    componentWillMount(): void;
    private _checkFontsInLayout;
    private _addFont;
    private _getTransformedReferenceCoordinate;
    private _updateAlignment;
    private _checkAndUpdateValues;
    private _addOrUpdateMetadata;
    private _removeFromMetadata;
    private _getCommonPropertyKeys;
    private _markChildrenAsDirty;
    componentWillUnmount(): void;
    _filterFontDuplicates(array: {
        label: string;
        value: string;
        id: string;
    }[]): {
        label: string;
        value: string;
        id: string;
    }[];
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
