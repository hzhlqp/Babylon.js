import type { ViewerConfiguration } from "../configuration/configuration";
import { AbstractViewer } from "./viewer";
import "core/Misc/observable.extensions";
export declare class RenderOnlyViewer extends AbstractViewer {
    containerElement: Element;
    constructor(containerElement: Element, initialConfiguration?: ViewerConfiguration);
    initialize(): Promise<AbstractViewer | this>;
    protected _prepareContainerElement(): void;
}
