import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import "core/Materials/material.decalMap";
import "core/Rendering/prePassRendererSceneComponent";
import "core/Rendering/subSurfaceSceneComponent";
interface IPBRMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: PBRMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
/**
 * @internal
 */
export declare class PBRMaterialPropertyGridComponent extends React.Component<IPBRMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable;
    constructor(props: IPBRMaterialPropertyGridComponentProps);
    switchAmbientMode(state: boolean): void;
    renderTextures(onDebugSelectionChangeObservable: Observable<TextureLinkLineComponent>): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
