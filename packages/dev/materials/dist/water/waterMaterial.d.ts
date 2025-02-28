import type { Nullable } from "core/types";
import { Matrix, Vector2 } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { IAnimatable } from "core/Animations/animatable.interface";
import { SmartArray } from "core/Misc/smartArray";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import { RenderTargetTexture } from "core/Materials/Textures/renderTargetTexture";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import { Scene } from "core/scene";
import "./water.fragment";
import "./water.vertex";
import "core/Rendering/boundingBoxRenderer";
export declare class WaterMaterial extends PushMaterial {
    renderTargetSize: Vector2;
    private _bumpTexture;
    bumpTexture: BaseTexture;
    diffuseColor: Color3;
    specularColor: Color3;
    specularPower: number;
    private _disableLighting;
    disableLighting: boolean;
    private _maxSimultaneousLights;
    maxSimultaneousLights: number;
    /**
     * Defines the wind force.
     */
    windForce: number;
    /**
     * Defines the direction of the wind in the plane (X, Z).
     */
    windDirection: Vector2;
    /**
     * Defines the height of the waves.
     */
    waveHeight: number;
    /**
     * Defines the bump height related to the bump map.
     */
    bumpHeight: number;
    /**
     * Defines wether or not: to add a smaller moving bump to less steady waves.
     */
    private _bumpSuperimpose;
    bumpSuperimpose: boolean;
    /**
     * Defines wether or not color refraction and reflection differently with .waterColor2 and .colorBlendFactor2. Non-linear (physically correct) fresnel.
     */
    private _fresnelSeparate;
    fresnelSeparate: boolean;
    /**
     * Defines wether or not bump Wwves modify the reflection.
     */
    private _bumpAffectsReflection;
    bumpAffectsReflection: boolean;
    /**
     * Defines the water color blended with the refraction (near).
     */
    waterColor: Color3;
    /**
     * Defines the blend factor related to the water color.
     */
    colorBlendFactor: number;
    /**
     * Defines the water color blended with the reflection (far).
     */
    waterColor2: Color3;
    /**
     * Defines the blend factor related to the water color (reflection, far).
     */
    colorBlendFactor2: number;
    /**
     * Defines the maximum length of a wave.
     */
    waveLength: number;
    /**
     * Defines the waves speed.
     */
    waveSpeed: number;
    /**
     * Defines the number of times waves are repeated. This is typically used to adjust waves count according to the ground's size where the material is applied on.
     */
    waveCount: number;
    /**
     * Sets or gets whether or not automatic clipping should be enabled or not. Setting to true will save performances and
     * will avoid calculating useless pixels in the pixel shader of the water material.
     */
    disableClipPlane: boolean;
    /**
     * Defines whether or not to use world coordinates for wave deformations.
     * The default value is false, meaning that the deformation is applied in object (local) space.
     * You will probably need to set it to true if you are using instances or thin instances for your water objects.
     */
    private _useWorldCoordinatesForWaveDeformation;
    useWorldCoordinatesForWaveDeformation: boolean;
    protected _renderTargets: SmartArray<RenderTargetTexture>;
    private _mesh;
    private _refractionRTT;
    private _reflectionRTT;
    private _reflectionTransform;
    private _lastTime;
    private _lastDeltaTime;
    private _waitingRenderList;
    private _imageProcessingConfiguration;
    private _imageProcessingObserver;
    /**
     * Gets a boolean indicating that current material needs to register RTT
     */
    get hasRenderTargetTextures(): boolean;
    /**
     * Constructor
     * @param name
     * @param scene
     * @param renderTargetSize
     */
    constructor(name: string, scene?: Scene, renderTargetSize?: Vector2);
    get refractionTexture(): Nullable<RenderTargetTexture>;
    get reflectionTexture(): Nullable<RenderTargetTexture>;
    addToRenderList(node: any): void;
    removeFromRenderList(node: any): void;
    enableRenderTargets(enable: boolean): void;
    getRenderList(): Nullable<AbstractMesh[]>;
    get renderTargetsEnabled(): boolean;
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    private _createRenderTargets;
    getAnimatables(): IAnimatable[];
    getActiveTextures(): BaseTexture[];
    hasTexture(texture: BaseTexture): boolean;
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): WaterMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): WaterMaterial;
    static CreateDefaultMesh(name: string, scene: Scene): Mesh;
}
