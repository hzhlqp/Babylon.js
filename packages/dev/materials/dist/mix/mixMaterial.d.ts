import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Texture } from "core/Materials/Textures/texture";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import { Scene } from "core/scene";
import "./mix.fragment";
import "./mix.vertex";
export declare class MixMaterial extends PushMaterial {
    /**
     * Mix textures
     */
    private _mixTexture1;
    mixTexture1: BaseTexture;
    private _mixTexture2;
    mixTexture2: BaseTexture;
    /**
     * Diffuse textures
     */
    private _diffuseTexture1;
    diffuseTexture1: Texture;
    private _diffuseTexture2;
    diffuseTexture2: Texture;
    private _diffuseTexture3;
    diffuseTexture3: Texture;
    private _diffuseTexture4;
    diffuseTexture4: Texture;
    private _diffuseTexture5;
    diffuseTexture5: Texture;
    private _diffuseTexture6;
    diffuseTexture6: Texture;
    private _diffuseTexture7;
    diffuseTexture7: Texture;
    private _diffuseTexture8;
    diffuseTexture8: Texture;
    /**
     * Uniforms
     */
    diffuseColor: Color3;
    specularColor: Color3;
    specularPower: number;
    private _disableLighting;
    disableLighting: boolean;
    private _maxSimultaneousLights;
    maxSimultaneousLights: number;
    constructor(name: string, scene?: Scene);
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    getAnimatables(): IAnimatable[];
    getActiveTextures(): BaseTexture[];
    hasTexture(texture: BaseTexture): boolean;
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): MixMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MixMaterial;
}
