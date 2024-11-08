import type { IGLTF } from "../glTFLoaderInterfaces";
import { GLTFPathToObjectConverter } from "./gltfPathToObjectConverter";
import type { IObjectAccessor } from "core/FlowGraph/typeDefinitions";
/**
 * Class to convert an interactivity pointer path to a smart object
 */
export declare class InteractivityPathToObjectConverter extends GLTFPathToObjectConverter<IObjectAccessor> {
    constructor(gltf: IGLTF);
}
