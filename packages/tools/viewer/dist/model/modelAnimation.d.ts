import type { Vector3 } from "core/Maths/math.vector";
import type { AnimationGroup } from "core/Animations/index";
/**
 * Animation play mode enum - is the animation looping or playing once
 */
export declare enum AnimationPlayMode {
    ONCE = 0,
    LOOP = 1
}
/**
 * An enum representing the current state of an animation object
 */
export declare enum AnimationState {
    INIT = 0,
    PLAYING = 1,
    PAUSED = 2,
    STOPPED = 3,
    ENDED = 4
}
/**
 * The different type of easing functions available
 */
export declare enum EasingFunction {
    Linear = 0,
    CircleEase = 1,
    BackEase = 2,
    BounceEase = 3,
    CubicEase = 4,
    ElasticEase = 5,
    ExponentialEase = 6,
    PowerEase = 7,
    QuadraticEase = 8,
    QuarticEase = 9,
    QuinticEase = 10,
    SineEase = 11
}
/**
 * Defines a simple animation to be applied to a model (scale).
 */
export interface ModelAnimationConfiguration {
    /**
     * Time of animation, in seconds
     */
    time: number;
    /**
     * Scale to apply
     */
    scaling?: Vector3;
    /**
     * Easing function to apply
     * See SPECTRE.EasingFunction
     */
    easingFunction?: number;
    /**
     * An Easing mode to apply to the easing function
     * See BABYLON.EasingFunction
     */
    easingMode?: number;
}
/**
 * This interface can be implemented to define new types of ModelAnimation objects.
 */
export interface IModelAnimation {
    /**
     * Current animation state (playing, stopped etc')
     */
    readonly state: AnimationState;
    /**
     * the name of the animation
     */
    readonly name: string;
    /**
     * Get the max numbers of frame available in the animation group
     *
     * In correlation to an array, this would be ".length"
     */
    readonly frames: number;
    /**
     * Get the current frame playing right now.
     * This can be used to poll the frame currently playing (and, for example, display a progress bar with the data)
     *
     * In correlation to an array, this would be the current index
     */
    readonly currentFrame: number;
    /**
     * Animation's FPS value
     */
    readonly fps: number;
    /**
     * Get or set the animation's speed ration (Frame-to-fps)
     */
    speedRatio: number;
    /**
     * Gets or sets the aimation's play mode.
     */
    playMode: AnimationPlayMode;
    /**
     * Start the animation
     */
    start(): void;
    /**
     * Stop the animation.
     * This will fail silently if the animation group is already stopped.
     */
    stop(): void;
    /**
     * Pause the animation
     * This will fail silently if the animation is not currently playing
     */
    pause(): void;
    /**
     * Reset this animation
     */
    reset(): void;
    /**
     * Restart the animation
     */
    restart(): void;
    /**
     * Go to a specific
     * @param frameNumber the frame number to go to
     */
    goToFrame(frameNumber: number): void;
    /**
     * Dispose this animation
     */
    dispose(): void;
}
/**
 * The GroupModelAnimation is an implementation of the IModelAnimation interface using BABYLON's
 * native GroupAnimation class.
 */
export declare class GroupModelAnimation implements IModelAnimation {
    private _animationGroup;
    private _playMode;
    private _state;
    /**
     * Create a new GroupModelAnimation object using an AnimationGroup object
     * @param _animationGroup The animation group to base the class on
     */
    constructor(_animationGroup: AnimationGroup);
    /**
     * Get the animation's name
     */
    get name(): string;
    /**
     * Get the current animation's state
     */
    get state(): AnimationState;
    /**
     * Gets the speed ratio to use for all animations
     */
    get speedRatio(): number;
    /**
     * Sets the speed ratio to use for all animations
     */
    set speedRatio(value: number);
    /**
     * Get the max numbers of frame available in the animation group
     *
     * In correlation to an array, this would be ".length"
     */
    get frames(): number;
    /**
     * Get the current frame playing right now.
     * This can be used to poll the frame currently playing (and, for example, display a progress bar with the data)
     *
     * In correlation to an array, this would be the current index
     */
    get currentFrame(): number;
    /**
     * Get the FPS value of this animation
     */
    get fps(): number;
    /**
     * What is the animation'S play mode (looping or played once)
     */
    get playMode(): AnimationPlayMode;
    /**
     * Set the play mode.
     * If the animation is played, it will continue playing at least once more, depending on the new play mode set.
     * If the animation is not set, the will be initialized and will wait for the user to start playing it.
     */
    set playMode(value: AnimationPlayMode);
    /**
     * Reset the animation group
     */
    reset(): void;
    /**
     * Restart the animation group
     */
    restart(): void;
    /**
     *
     * @param frameNumber Go to a specific frame in the animation
     */
    goToFrame(frameNumber: number): void;
    /**
     * Start playing the animation.
     */
    start(): void;
    /**
     * Pause the animation
     */
    pause(): void;
    /**
     * Stop the animation.
     * This will fail silently if the animation group is already stopped.
     */
    stop(): void;
    /**
     * Dispose this animation object.
     */
    dispose(): void;
}
