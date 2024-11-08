import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./normalMapProceduralTexture.fragment";
export declare class NormalMapProceduralTexture extends ProceduralTexture {
    private _baseTexture;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    render(useCameraPostProcess?: boolean): void;
    resize(size: any, generateMipMaps: any): void;
    isReady(): boolean;
    get baseTexture(): Texture;
    set baseTexture(texture: Texture);
    /**
     * Serializes this normal map procedural texture
     * @returns a serialized normal map procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Normal Map Procedural Texture from parsed normal map procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing normal map procedural texture information
     * @returns a parsed Normal Map Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): NormalMapProceduralTexture;
}
