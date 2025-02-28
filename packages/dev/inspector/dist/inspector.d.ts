import * as React from "react";
import type { IInspectorOptions } from "core/Debug/debugLayer";
import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { PropertyChangedEvent } from "./components/propertyChangedEvent";
import type { IPopupComponentProps } from "./components/popupComponent";
export interface IPersistentPopupConfiguration {
    props: IPopupComponentProps;
    children: React.ReactNode;
    closeWhenSceneExplorerCloses?: boolean;
    closeWhenActionTabsCloses?: boolean;
}
export declare class Inspector {
    private static _SceneExplorerHost;
    private static _ActionTabsHost;
    private static _EmbedHost;
    private static _NewCanvasContainer;
    private static _PersistentPopupHost;
    private static _SceneExplorerWindow;
    private static _ActionTabsWindow;
    private static _EmbedHostWindow;
    private static _Scene;
    private static _OpenedPane;
    private static _OnBeforeRenderObserver;
    private static _OnSceneExplorerClosedObserver;
    private static _OnActionTabsClosedObserver;
    static OnSelectionChangeObservable: Observable<any>;
    static OnPropertyChangedObservable: Observable<PropertyChangedEvent>;
    private static _GlobalState;
    static MarkLineContainerTitleForHighlighting(title: string): void;
    static MarkMultipleLineContainerTitlesForHighlighting(titles: string[]): void;
    private static _CopyStyles;
    private static _SceneExplorerOptions;
    private static _InspectorOptions;
    private static _EmbedOptions;
    static PopupEmbed(): void;
    static PopupSceneExplorer(): void;
    static PopupInspector(): void;
    private static _CreateSceneExplorer;
    private static _CreateActionTabs;
    private static _CreateEmbedHost;
    static _CreatePopup(title: string, windowVariableName: string, width?: number, height?: number, lateBinding?: boolean): HTMLDivElement | null;
    static get IsVisible(): boolean;
    static EarlyAttachToLoader(): void;
    static Show(scene: Scene, userOptions: Partial<IInspectorOptions>): void;
    static _SetNewScene(scene: Scene): void;
    static _CreateCanvasContainer(parentControl: HTMLElement): void;
    private static _DestroyCanvasContainer;
    private static _Cleanup;
    private static _RemoveElementFromDOM;
    static Hide(): void;
    static _CreatePersistentPopup(config: IPersistentPopupConfiguration, hostElement: HTMLElement): void;
    static _ClosePersistentPopup(): void;
}
