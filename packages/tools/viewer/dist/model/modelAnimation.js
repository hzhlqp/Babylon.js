/**
 * Animation play mode enum - is the animation looping or playing once
 */
export var AnimationPlayMode;
(function (AnimationPlayMode) {
    AnimationPlayMode[AnimationPlayMode["ONCE"] = 0] = "ONCE";
    AnimationPlayMode[AnimationPlayMode["LOOP"] = 1] = "LOOP";
})(AnimationPlayMode || (AnimationPlayMode = {}));
/**
 * An enum representing the current state of an animation object
 */
export var AnimationState;
(function (AnimationState) {
    AnimationState[AnimationState["INIT"] = 0] = "INIT";
    AnimationState[AnimationState["PLAYING"] = 1] = "PLAYING";
    AnimationState[AnimationState["PAUSED"] = 2] = "PAUSED";
    AnimationState[AnimationState["STOPPED"] = 3] = "STOPPED";
    AnimationState[AnimationState["ENDED"] = 4] = "ENDED";
})(AnimationState || (AnimationState = {}));
/**
 * The different type of easing functions available
 */
export var EasingFunction;
(function (EasingFunction) {
    EasingFunction[EasingFunction["Linear"] = 0] = "Linear";
    EasingFunction[EasingFunction["CircleEase"] = 1] = "CircleEase";
    EasingFunction[EasingFunction["BackEase"] = 2] = "BackEase";
    EasingFunction[EasingFunction["BounceEase"] = 3] = "BounceEase";
    EasingFunction[EasingFunction["CubicEase"] = 4] = "CubicEase";
    EasingFunction[EasingFunction["ElasticEase"] = 5] = "ElasticEase";
    EasingFunction[EasingFunction["ExponentialEase"] = 6] = "ExponentialEase";
    EasingFunction[EasingFunction["PowerEase"] = 7] = "PowerEase";
    EasingFunction[EasingFunction["QuadraticEase"] = 8] = "QuadraticEase";
    EasingFunction[EasingFunction["QuarticEase"] = 9] = "QuarticEase";
    EasingFunction[EasingFunction["QuinticEase"] = 10] = "QuinticEase";
    EasingFunction[EasingFunction["SineEase"] = 11] = "SineEase";
})(EasingFunction || (EasingFunction = {}));
/**
 * The GroupModelAnimation is an implementation of the IModelAnimation interface using BABYLON's
 * native GroupAnimation class.
 */
export class GroupModelAnimation {
    /**
     * Create a new GroupModelAnimation object using an AnimationGroup object
     * @param _animationGroup The animation group to base the class on
     */
    constructor(_animationGroup) {
        this._animationGroup = _animationGroup;
        this._state = AnimationState.INIT;
        this._playMode = AnimationPlayMode.LOOP;
        this._animationGroup.onAnimationEndObservable.add(() => {
            this._state = AnimationState.ENDED;
            this.stop();
        });
    }
    /**
     * Get the animation's name
     */
    get name() {
        return this._animationGroup.name;
    }
    /**
     * Get the current animation's state
     */
    get state() {
        return this._state;
    }
    /**
     * Gets the speed ratio to use for all animations
     */
    get speedRatio() {
        return this._animationGroup.speedRatio;
    }
    /**
     * Sets the speed ratio to use for all animations
     */
    set speedRatio(value) {
        this._animationGroup.speedRatio = value;
    }
    /**
     * Get the max numbers of frame available in the animation group
     *
     * In correlation to an array, this would be ".length"
     */
    get frames() {
        return this._animationGroup.to - this._animationGroup.from;
    }
    /**
     * Get the current frame playing right now.
     * This can be used to poll the frame currently playing (and, for example, display a progress bar with the data)
     *
     * In correlation to an array, this would be the current index
     */
    get currentFrame() {
        if (this._animationGroup.targetedAnimations[0] && this._animationGroup.targetedAnimations[0].animation.runtimeAnimations[0]) {
            return this._animationGroup.targetedAnimations[0].animation.runtimeAnimations[0].currentFrame - this._animationGroup.from;
        }
        else {
            return 0;
        }
    }
    /**
     * Get the FPS value of this animation
     */
    get fps() {
        // get the first currentFrame found
        for (let i = 0; i < this._animationGroup.animatables.length; ++i) {
            const animatable = this._animationGroup.animatables[i];
            const animations = animatable.getAnimations();
            if (!animations || !animations.length) {
                continue;
            }
            for (let idx = 0; idx < animations.length; ++idx) {
                if (animations[idx].animation && animations[idx].animation.framePerSecond) {
                    return animations[idx].animation.framePerSecond;
                }
            }
        }
        return 0;
    }
    /**
     * What is the animation'S play mode (looping or played once)
     */
    get playMode() {
        return this._playMode;
    }
    /**
     * Set the play mode.
     * If the animation is played, it will continue playing at least once more, depending on the new play mode set.
     * If the animation is not set, the will be initialized and will wait for the user to start playing it.
     */
    set playMode(value) {
        if (value === this._playMode) {
            return;
        }
        this._playMode = value;
        if (this.state === AnimationState.PLAYING) {
            this._animationGroup.play(this._playMode === AnimationPlayMode.LOOP);
        }
        else {
            this._animationGroup.reset();
            this._state = AnimationState.INIT;
        }
    }
    /**
     * Reset the animation group
     */
    reset() {
        this._animationGroup.reset();
    }
    /**
     * Restart the animation group
     */
    restart() {
        if (this.state === AnimationState.PAUSED) {
            this._animationGroup.restart();
        }
        else {
            this.start();
        }
    }
    /**
     *
     * @param frameNumber Go to a specific frame in the animation
     */
    goToFrame(frameNumber) {
        this._animationGroup.goToFrame(frameNumber + this._animationGroup.from);
    }
    /**
     * Start playing the animation.
     */
    start() {
        this._animationGroup.start(this.playMode === AnimationPlayMode.LOOP, this.speedRatio);
        if (this._animationGroup.isStarted) {
            this._state = AnimationState.PLAYING;
        }
    }
    /**
     * Pause the animation
     */
    pause() {
        this._animationGroup.pause();
        this._state = AnimationState.PAUSED;
    }
    /**
     * Stop the animation.
     * This will fail silently if the animation group is already stopped.
     */
    stop() {
        // do not trigger stop if animation state is ended.
        if (this._state === AnimationState.ENDED) {
            return;
        }
        this._animationGroup.stop();
        if (!this._animationGroup.isStarted) {
            this._state = AnimationState.STOPPED;
        }
    }
    /**
     * Dispose this animation object.
     */
    dispose() {
        this._animationGroup.dispose();
    }
}
//# sourceMappingURL=modelAnimation.js.map