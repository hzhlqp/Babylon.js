import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { Matrix } from "core/Maths/math.vector";
import type { Mesh } from "core/Meshes/mesh";
import type { Nullable } from "core/types";
import type { Scene } from "core/scene";
import type { SubMesh } from "core/Meshes/subMesh";
import { Color4 } from "core/Maths/math.color";
import { PushMaterial } from "core/Materials/pushMaterial";
import "./shaders/mrdlBackglow.fragment";
import "./shaders/mrdlBackglow.vertex";
export declare class MRDLBackglowMaterial extends PushMaterial {
    /**
     * Gets or sets the bevel radius on the backglow. If this value is changed, update the lineWidth to match.
     */
    bevelRadius: number;
    /**
     * Gets or sets the line width of the backglow.
     */
    lineWidth: number;
    /**
     * Gets or sets whether to use absolute sizes when calculating effects on the backglow.
     * Since desktop and VR/AR have different relative sizes, it's usually best to keep this false.
     */
    absoluteSizes: boolean;
    /**
     * Gets or sets the tuning motion of the backglow.
     */
    tuningMotion: number;
    /**
     * Gets or sets the motion of the backglow.
     */
    motion: number;
    /**
     * Gets or sets the maximum intensity of the backglow.
     */
    maxIntensity: number;
    /**
     * Gets or sets the fade-in exponent of the intensity of the backglow.
     */
    intensityFadeInExponent: number;
    /**
     * Gets or sets the start of the outer fuzz effect on the backglow.
     */
    outerFuzzStart: number;
    /**
     * Gets or sets the end of the outer fuzz effect on the backglow.
     */
    outerFuzzEnd: number;
    /**
     * Gets or sets the color of the backglow.
     */
    color: Color4;
    /**
     * Gets or sets the inner color of the backglow.
     */
    innerColor: Color4;
    /**
     * Gets or sets the blend exponent of the backglow.
     */
    blendExponent: number;
    /**
     * Gets or sets the falloff of the backglow.
     */
    falloff: number;
    /**
     * Gets or sets the bias of the backglow.
     */
    bias: number;
    constructor(name: string, scene: Scene);
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * Get the list of animatables in the material.
     * @returns the list of animatables object used in the material
     */
    getAnimatables(): IAnimatable[];
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): MRDLBackglowMaterial;
    serialize(): unknown;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackglowMaterial;
}
