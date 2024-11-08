import type { Matrix } from "core/Maths/math.vector";
import { Vector3 } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import { PushMaterial } from "core/Materials/pushMaterial";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { Mesh } from "core/Meshes/mesh";
import type { Scene } from "core/scene";
import "./grid.fragment";
import "./grid.vertex";
/**
 * The grid materials allows you to wrap any shape with a grid.
 * Colors are customizable.
 */
export declare class GridMaterial extends PushMaterial {
    /**
     * Main color of the grid (e.g. between lines)
     */
    mainColor: Color3;
    /**
     * Color of the grid lines.
     */
    lineColor: Color3;
    /**
     * The scale of the grid compared to unit.
     */
    gridRatio: number;
    /**
     * Allows setting an offset for the grid lines.
     */
    gridOffset: Vector3;
    /**
     * The frequency of thicker lines.
     */
    majorUnitFrequency: number;
    /**
     * The visibility of minor units in the grid.
     */
    minorUnitVisibility: number;
    /**
     * The grid opacity outside of the lines.
     */
    opacity: number;
    /**
     * Whether to antialias the grid
     */
    antialias: boolean;
    /**
     * Determine RBG output is premultiplied by alpha value.
     */
    preMultiplyAlpha: boolean;
    /**
     * Determines if the max line value will be used instead of the sum wherever grid lines intersect.
     */
    useMaxLine: boolean;
    private _opacityTexture;
    /**
     * Texture to define opacity of the grid
     */
    opacityTexture: BaseTexture;
    private _gridControl;
    /**
     * constructor
     * @param name The name given to the material in order to identify it afterwards.
     * @param scene The scene the material is used in.
     */
    constructor(name: string, scene?: Scene);
    /**
     * @returns whether or not the grid requires alpha blending.
     */
    needAlphaBlending(): boolean;
    needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * Dispose the material and its associated resources.
     * @param forceDisposeEffect will also dispose the used effect when true
     */
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): GridMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): GridMaterial;
}
