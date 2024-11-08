import { ShaderMaterial } from "core/Materials/shaderMaterial";
import type { Scene } from "core/scene";
import { Color3 } from "core/Maths/math.color";
import { Vector3 } from "core/Maths/math.vector";
import "./shaders/handle.vertex";
import "./shaders/handle.fragment";
/**
 * Class used to render gizmo handles with fluent design
 */
export declare class HandleMaterial extends ShaderMaterial {
    private _hover;
    private _drag;
    private _onBeforeRender;
    private _color;
    private _scale;
    private _targetColor;
    private _targetScale;
    private _lastTick;
    /**
     * Is the material indicating hovering state
     */
    get hover(): boolean;
    set hover(b: boolean);
    /**
     * Is the material indicating drag state
     */
    get drag(): boolean;
    set drag(b: boolean);
    /**
     * Length of animation
     */
    animationLength: number;
    /**
     * Color of the handle when hovered
     */
    hoverColor: Color3;
    /**
     * Color of the handle when idle
     */
    baseColor: Color3;
    /**
     * Scale of the handle when hovered
     */
    hoverScale: number;
    /**
     * Scale of the handle when idle
     */
    baseScale: number;
    /**
     * Scale of the handle when dragged
     */
    dragScale: number;
    /**
     * @internal
     */
    _positionOffset: Vector3;
    /**
     * Creates a handle material
     * @param name Name of the material
     * @param scene Scene
     */
    constructor(name: string, scene: Scene);
    private _updateInterpolationTarget;
    /**
     * Disposes the handle material
     */
    dispose(): void;
}
