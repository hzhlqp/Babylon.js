import { Engine } from "core/Engines/engine";
export class ViewerGlobals {
    constructor() {
        this.disableInit = false;
        this.disableWebGL2Support = false;
    }
    get version() {
        return Engine.Version;
    }
}
export const viewerGlobals = new ViewerGlobals();
//# sourceMappingURL=globals.js.map