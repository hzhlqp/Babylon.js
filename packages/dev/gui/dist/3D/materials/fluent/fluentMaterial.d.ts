import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import { Vector3 } from "core/Maths/math.vector";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import { MaterialDefines } from "core/Materials/materialDefines";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import type { Scene } from "core/scene";
import { Color3, Color4 } from "core/Maths/math.color";
import "./shaders/fluent.vertex";
import "./shaders/fluent.fragment";
/** @internal */
export declare class FluentMaterialDefines extends MaterialDefines {
    INNERGLOW: boolean;
    BORDER: boolean;
    HOVERLIGHT: boolean;
    TEXTURE: boolean;
    constructor();
}
/**
 * Class used to render controls with fluent design
 */
export declare class FluentMaterial extends PushMaterial {
    /**
     * Gets or sets inner glow intensity. A value of 0 means no glow (default is 0.5)
     */
    innerGlowColorIntensity: number;
    /**
     * Gets or sets the inner glow color (white by default)
     */
    innerGlowColor: Color3;
    /**
     * Gets or sets the albedo color (Default is Color3(0.3, 0.35, 0.4))
     */
    albedoColor: Color3;
    /**
     * Gets or sets a boolean indicating if borders must be rendered (default is false)
     */
    renderBorders: boolean;
    /**
     * Gets or sets border width (default is 0.5)
     */
    borderWidth: number;
    /**
     * Gets or sets a value indicating the smoothing value applied to border edges (0.02 by default)
     */
    edgeSmoothingValue: number;
    /**
     * Gets or sets the minimum value that can be applied to border width (default is 0.1)
     */
    borderMinValue: number;
    /**
     * Gets or sets a boolean indicating if hover light must be rendered (default is false)
     */
    renderHoverLight: boolean;
    /**
     * Gets or sets the radius used to render the hover light (default is 0.01)
     */
    hoverRadius: number;
    /**
     * Gets or sets the color used to render the hover light (default is Color4(0.3, 0.3, 0.3, 1.0))
     */
    hoverColor: Color4;
    /**
     * Gets or sets the hover light position in world space (default is Vector3.Zero())
     */
    hoverPosition: Vector3;
    private _albedoTexture;
    /** Gets or sets the texture to use for albedo color */
    albedoTexture: Nullable<BaseTexture>;
    /**
     * Creates a new Fluent material
     * @param name defines the name of the material
     * @param scene defines the hosting scene
     */
    constructor(name: string, scene?: Scene);
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    getActiveTextures(): BaseTexture[];
    hasTexture(texture: BaseTexture): boolean;
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): FluentMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): FluentMaterial;
}
