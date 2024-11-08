import type { EventCallback, Template } from "./templateManager";
export interface IViewerTemplatePlugin {
    readonly templateName: string;
    readonly eventsToAttach?: Array<string>;
    interactionPredicate(event: EventCallback): boolean;
    onEvent?(event: EventCallback): void;
    addHTMLTemplate?(template: Template): void;
}
export declare abstract class AbstractViewerNavbarButton implements IViewerTemplatePlugin {
    readonly templateName: string;
    readonly eventsToAttach: Array<string>;
    protected _prepend: boolean;
    protected _buttonName: string;
    protected _buttonClass: string;
    protected _htmlTemplate: string;
    constructor(buttonName: string, buttonClass?: string, htmlTemplate?: string);
    interactionPredicate(event: EventCallback): boolean;
    abstract onEvent(event: EventCallback): void;
    addHTMLTemplate(template: Template): void;
    protected _generateHTMLElement(template: Template): Element | DocumentFragment;
}
