import { AbstractViewerNavbarButton } from "../viewerTemplatePlugin";
import type { DefaultViewer } from "../../viewer/defaultViewer";
export declare class PrintButtonPlugin extends AbstractViewerNavbarButton {
    private _viewer;
    private _currentModelUrl;
    constructor(_viewer: DefaultViewer);
    onEvent(): void;
    protected static HtmlTemplate: string;
}
