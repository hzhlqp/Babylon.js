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
import "./shaders/mrdlInnerquad.fragment";
import "./shaders/mrdlInnerquad.vertex";
export declare class MRDLInnerquadMaterial extends PushMaterial {
    /**
     * Gets or sets the color of the innerquad.
     */
    color: Color4;
    /**
     * Gets or sets the corner radius on the innerquad. If this value is changed, update the lineWidth to match.
     */
    radius: number;
    /**
     * Gets or sets whether the radius of the innerquad should be fixed.
     */
    fixedRadius: boolean;
    /** @hidden */
    _filterWidth: number;
    /**
     * Gets or sets the glow fraction of the innerquad.
     */
    glowFraction: number;
    /**
     * Gets or sets the maximum glow intensity of the innerquad.
     */
    glowMax: number;
    /**
     * Gets or sets the glow falloff effect of the innerquad.
     */
    glowFalloff: number;
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
    clone(name: string): MRDLInnerquadMaterial;
    serialize(): unknown;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLInnerquadMaterial;
}
