import { Constants } from "core/Engines/constants";
/**
 * A (PBR) material will be extended using this function.
 * This function will hold extra default configuration for the viewer, if not implemented in Babylon itself.
 */
export class ExtendedMaterialLoaderPlugin {
    onMaterialLoaded(baseMaterial) {
        const material = baseMaterial;
        material.alphaMode = Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
    }
}
//# sourceMappingURL=extendedMaterialLoaderPlugin.js.map