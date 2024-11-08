import { Observable } from "core/Misc/observable";
/**
 * The viewer manager is the container for all viewers currently registered on this page.
 * It is possible to have more than one viewer on a single page.
 */
export class ViewerManager {
    constructor() {
        this._viewers = {};
        this.onViewerAddedObservable = new Observable();
        this.onViewerRemovedObservable = new Observable();
    }
    /**
     * Adding a new viewer to the viewer manager and start tracking it.
     * @param viewer the viewer to add
     */
    addViewer(viewer) {
        this._viewers[viewer.getBaseId()] = viewer;
        this._onViewerAdded(viewer);
    }
    /**
     * remove a viewer from the viewer manager
     * @param viewer the viewer to remove
     */
    removeViewer(viewer) {
        const id = viewer.getBaseId();
        delete this._viewers[id];
        this.onViewerRemovedObservable.notifyObservers(id);
    }
    /**
     * Get a viewer by its baseId (if the container element has an ID, it is the this is. if not, a random id was assigned)
     * @param id the id of the HTMl element (or the viewer's, if none provided)
     * @returns the viewer associated with the given id (if found)
     */
    getViewerById(id) {
        return this._viewers[id];
    }
    /**
     * Get a viewer using a container element
     * @param element the HTML element to search viewers associated with
     * @returns the viewer associated with the given element (if found)
     */
    getViewerByHTMLElement(element) {
        for (const id in this._viewers) {
            if (this._viewers[id].containerElement === element) {
                return this.getViewerById(id);
            }
        }
        return null;
    }
    /**
     * Get a promise that will fulfill when this viewer was initialized.
     * Since viewer initialization and template injection is asynchronous, using the promise will guaranty that
     * you will get the viewer after everything was already configured.
     * @param id the viewer id to find
     * @returns a promise that will resolve to the viewer
     */
    getViewerPromiseById(id) {
        return new Promise((resolve) => {
            const localViewer = this.getViewerById(id);
            if (localViewer) {
                return resolve(localViewer);
            }
            const viewerFunction = (viewer) => {
                if (viewer.getBaseId() === id) {
                    resolve(viewer);
                    this.onViewerAddedObservable.removeCallback(viewerFunction);
                }
            };
            this.onViewerAddedObservable.add(viewerFunction);
        });
    }
    _onViewerAdded(viewer) {
        this.onViewerAdded && this.onViewerAdded(viewer);
        this.onViewerAddedObservable.notifyObservers(viewer);
    }
    /**
     * dispose the manager and all of its associated viewers
     */
    dispose() {
        for (const id in this._viewers) {
            this._viewers[id].dispose();
        }
        this.onViewerAddedObservable.clear();
        this.onViewerRemovedObservable.clear();
    }
}
export const viewerManager = new ViewerManager();
//# sourceMappingURL=viewerManager.js.map