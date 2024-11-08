import { Vector2 } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./fireProceduralTexture.fragment";
export declare class FireProceduralTexture extends ProceduralTexture {
    private _time;
    private _speed;
    private _autoGenerateTime;
    private _fireColors;
    private _alphaThreshold;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    render(useCameraPostProcess?: boolean): void;
    static get PurpleFireColors(): Color3[];
    static get GreenFireColors(): Color3[];
    static get RedFireColors(): Color3[];
    static get BlueFireColors(): Color3[];
    get autoGenerateTime(): boolean;
    set autoGenerateTime(value: boolean);
    get fireColors(): Color3[];
    set fireColors(value: Color3[]);
    get time(): number;
    set time(value: number);
    get speed(): Vector2;
    set speed(value: Vector2);
    get alphaThreshold(): number;
    set alphaThreshold(value: number);
    /**
     * Serializes this fire procedural texture
     * @returns a serialized fire procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Fire Procedural Texture from parsed fire procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing fire procedural texture information
     * @returns a parsed Fire Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): FireProceduralTexture;
}
