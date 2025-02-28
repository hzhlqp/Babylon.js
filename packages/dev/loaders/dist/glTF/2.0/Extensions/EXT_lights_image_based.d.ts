import type { Nullable } from "core/types";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IScene } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
declare module "../../glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_image_based extension.
         */
        ["EXT_lights_image_based"]: {};
    }
}
declare module "babylonjs-gltf2interface" {
    /** @internal */
    interface IEXTLightsImageBased_LightImageBased {
        _babylonTexture?: BaseTexture;
        _loaded?: Promise<void>;
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
 */
export declare class EXT_lights_image_based implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "EXT_lights_image_based";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _lights?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    private _loadLightAsync;
}
