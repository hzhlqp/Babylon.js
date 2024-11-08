import * as React from "react";
import type { Nullable } from "core/types";
import type { Observable } from "core/Misc/observable";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../../components/globalState";
interface ITexturePropertyGridComponentProps {
    texture: BaseTexture;
    lockObject: LockObject;
    globalState: GlobalState;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
interface ITexturePropertyGridComponentState {
    isTextureEditorOpen: boolean;
    textureEditing: Nullable<BaseTexture>;
}
export declare class TexturePropertyGridComponent extends React.Component<ITexturePropertyGridComponentProps, ITexturePropertyGridComponentState> {
    private _adtInstrumentation;
    private _popoutWindowRef;
    private _textureLineRef;
    private _textureInspectorSize;
    constructor(props: ITexturePropertyGridComponentProps);
    componentWillUnmount(): void;
    updateTexture(file: File): void;
    openTextureEditor(): void;
    onOpenTextureEditor(): void;
    onCloseTextureEditor(callback?: {
        (): void;
    }): void;
    forceRefresh(): void;
    findTextureFormat(format: number): {
        label: string;
        normalizable: number;
        value: number;
        hideType?: undefined;
        compressed?: undefined;
    } | {
        label: string;
        normalizable: number;
        hideType: boolean;
        value: number;
        compressed?: undefined;
    } | {
        label: string;
        normalizable: number;
        compressed: boolean;
        value: number;
        hideType?: undefined;
    } | null;
    findTextureType(type: number): {
        label: string;
        normalizable: number;
        value: number;
    } | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
