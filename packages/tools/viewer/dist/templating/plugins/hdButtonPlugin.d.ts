import { AbstractViewerNavbarButton } from "../viewerTemplatePlugin";
import type { DefaultViewer } from "../../viewer/defaultViewer";
import type { EventCallback } from "../templateManager";
export declare class HDButtonPlugin extends AbstractViewerNavbarButton {
    private _viewer;
    constructor(_viewer: DefaultViewer);
    onEvent(event: EventCallback): void;
    protected static HtmlTemplate: string;
}
