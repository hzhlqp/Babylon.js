import { Observable } from "core/Misc/observable";
import type { AbstractViewer } from "./viewer";
/**
 * The viewer manager is the container for all viewers currently registered on this page.
 * It is possible to have more than one viewer on a single page.
 */
export declare class ViewerManager {
    private _viewers;
    /**
     * A callback that will be triggered when a new viewer was added
     */
    onViewerAdded: (viewer: AbstractViewer) => void;
    /**
     * Will notify when a new viewer was added
     */
    onViewerAddedObservable: Observable<AbstractViewer>;
    /**
     * Will notify when a viewer was removed (disposed)
     */
    onViewerRemovedObservable: Observable<string>;
    constructor();
    /**
     * Adding a new viewer to the viewer manager and start tracking it.
     * @param viewer the viewer to add
     */
    addViewer(viewer: AbstractViewer): void;
    /**
     * remove a viewer from the viewer manager
     * @param viewer the viewer to remove
     */
    removeViewer(viewer: AbstractViewer): void;
    /**
     * Get a viewer by its baseId (if the container element has an ID, it is the this is. if not, a random id was assigned)
     * @param id the id of the HTMl element (or the viewer's, if none provided)
     * @returns the viewer associated with the given id (if found)
     */
    getViewerById(id: string): AbstractViewer;
    /**
     * Get a viewer using a container element
     * @param element the HTML element to search viewers associated with
     * @returns the viewer associated with the given element (if found)
     */
    getViewerByHTMLElement(element: HTMLElement): AbstractViewer | null;
    /**
     * Get a promise that will fulfill when this viewer was initialized.
     * Since viewer initialization and template injection is asynchronous, using the promise will guaranty that
     * you will get the viewer after everything was already configured.
     * @param id the viewer id to find
     * @returns a promise that will resolve to the viewer
     */
    getViewerPromiseById(id: string): Promise<AbstractViewer>;
    private _onViewerAdded;
    /**
     * dispose the manager and all of its associated viewers
     */
    dispose(): void;
}
export declare const viewerManager: ViewerManager;
