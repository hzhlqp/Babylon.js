import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { SkyMaterial } from "materials/sky/skyMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ISkyMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: SkyMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
/**
 * Property grid component for the SkyMaterial
 */
export declare class SkyMaterialPropertyGridComponent extends React.Component<ISkyMaterialPropertyGridComponentProps> {
    constructor(props: ISkyMaterialPropertyGridComponentProps);
    renderSky(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
