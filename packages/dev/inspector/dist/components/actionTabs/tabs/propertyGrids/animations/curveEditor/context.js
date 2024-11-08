import { Animation } from "core/Animations/animation";
import { Observable } from "core/Misc/observable";
export class Context {
    constructor() {
        this.activeAnimations = [];
        this.activeChannels = {};
        this.useExistingPlayRange = false;
        this.forwardAnimation = true;
        this.referenceMinFrame = 0;
        this.referenceMaxFrame = 100;
        this.focusedInput = false;
        this.onActiveAnimationChanged = new Observable();
        this.onActiveKeyPointChanged = new Observable();
        this.onHostWindowResized = new Observable();
        this.onSelectAllKeys = new Observable();
        this.onActiveKeyFrameChanged = new Observable();
        this.onFrameSet = new Observable();
        this.onFrameManuallyEntered = new Observable();
        this.onMainKeyPointSet = new Observable();
        this.onMainKeyPointMoved = new Observable();
        this.onValueSet = new Observable();
        this.onValueManuallyEntered = new Observable();
        this.onFrameRequired = new Observable();
        this.onCreateOrUpdateKeyPointRequired = new Observable();
        this.onFlattenTangentRequired = new Observable();
        this.onLinearTangentRequired = new Observable();
        this.onBreakTangentRequired = new Observable();
        this.onUnifyTangentRequired = new Observable();
        this.onStepTangentRequired = new Observable();
        this.onDeleteAnimation = new Observable();
        this.onGraphMoved = new Observable();
        this.onGraphScaled = new Observable();
        this.onRangeUpdated = new Observable();
        this.onMoveToFrameRequired = new Observable();
        this.onAnimationStateChanged = new Observable();
        this.onDeleteKeyActiveKeyPoints = new Observable();
        this.onSelectionRectangleMoved = new Observable();
        this.onAnimationsLoaded = new Observable();
        this.onEditAnimationRequired = new Observable();
        this.onEditAnimationUIClosed = new Observable();
        this.onClipLengthIncreased = new Observable();
        this.onClipLengthDecreased = new Observable();
        this.onInterpolationModeSet = new Observable();
        this.onSelectToActivated = new Observable();
        this.onRangeFrameBarResized = new Observable();
        this.onPlayheadMoved = new Observable();
        this.lockLastFrameValue = false;
        this.lockLastFrameFrame = false;
        // value frame inTangent outTangent
        this.onActiveKeyDataChanged = new Observable();
    }
    prepare() {
        this.isPlaying = false;
        if (!this.animations || !this.animations.length) {
            return;
        }
        const animation = this.useTargetAnimations ? this.animations[0].animation : this.animations[0];
        const keys = animation.getKeys();
        this.referenceMinFrame = 0;
        this.referenceMaxFrame = keys[keys.length - 1].frame;
        if (!this.useExistingPlayRange) {
            this.fromKey = this.referenceMinFrame;
            this.toKey = this.referenceMaxFrame;
        }
        this.snippetId = animation.snippetId;
        this.clipLength = this.referenceMaxFrame;
        if (!animation || !animation.hasRunningRuntimeAnimations) {
            return;
        }
        this.isPlaying = true;
    }
    play(forward) {
        this.isPlaying = true;
        this.scene.stopAnimation(this.target);
        let animatable;
        if (forward) {
            if (this.rootAnimationGroup) {
                this.rootAnimationGroup.start(true, 1.0, this.fromKey, this.toKey);
            }
            else {
                animatable = this.scene.beginAnimation(this.target, this.fromKey, this.toKey, true);
            }
        }
        else {
            if (this.rootAnimationGroup) {
                this.rootAnimationGroup.start(true, 1.0, this.toKey, this.fromKey);
            }
            else {
                animatable = this.scene.beginAnimation(this.target, this.toKey, this.fromKey, true);
            }
        }
        this.forwardAnimation = forward;
        // Move
        if (this.rootAnimationGroup) {
            this.rootAnimationGroup.goToFrame(this.activeFrame);
        }
        else {
            animatable.goToFrame(this.activeFrame);
        }
        this.onAnimationStateChanged.notifyObservers();
    }
    stop() {
        this.isPlaying = false;
        if (this.rootAnimationGroup) {
            this.rootAnimationGroup.stop();
        }
        else {
            this.scene.stopAnimation(this.target);
        }
        this.onAnimationStateChanged.notifyObservers();
    }
    moveToFrame(frame) {
        if (!this.animations || !this.animations.length) {
            return;
        }
        this.activeFrame = frame;
        if (!this.isPlaying) {
            if (this.rootAnimationGroup) {
                this.rootAnimationGroup.start(false, 1.0, this.fromKey, this.toKey);
            }
            else {
                this.scene.beginAnimation(this.target, this.fromKey, this.toKey, false);
            }
        }
        for (const animationEntry of this.animations) {
            const animation = this.useTargetAnimations ? animationEntry.animation : animationEntry;
            if (!animation.hasRunningRuntimeAnimations) {
                return;
            }
            for (const runtimeAnimation of animation.runtimeAnimations) {
                runtimeAnimation.goToFrame(frame);
            }
        }
        this.stop();
    }
    refreshTarget() {
        if (!this.animations || !this.animations.length) {
            return;
        }
        if (this.isPlaying) {
            return;
        }
        this.moveToFrame(this.activeFrame);
    }
    clearSelection() {
        this.activeKeyPoints = [];
        this.onActiveKeyPointChanged.notifyObservers();
    }
    enableChannel(animation, color) {
        this.activeChannels[animation.uniqueId] = color;
    }
    disableChannel(animation) {
        delete this.activeChannels[animation.uniqueId];
    }
    isChannelEnabled(animation, color) {
        return this.activeChannels[animation.uniqueId] === undefined || this.activeChannels[animation.uniqueId] === color;
    }
    getActiveChannel(animation) {
        return this.activeChannels[animation.uniqueId];
    }
    resetAllActiveChannels() {
        this.clearSelection();
        this.activeChannels = {};
    }
    getAnimationSortIndex(animation) {
        if (!this.animations) {
            return -1;
        }
        for (let index = 0; index < this.animations?.length; index++) {
            if (animation === (this.useTargetAnimations ? this.animations[0].animation : this.animations[index])) {
                return index;
            }
        }
        return -1;
    }
    getPrevKey() {
        if (!this.animations || !this.animations.length || this.activeAnimations.length === 0) {
            return null;
        }
        let prevKey = -Number.MAX_VALUE;
        for (const animation of this.activeAnimations) {
            const keys = animation.getKeys();
            for (const key of keys) {
                if (key.frame < this.activeFrame && key.frame > prevKey) {
                    prevKey = key.frame;
                }
            }
        }
        if (prevKey === -Number.MAX_VALUE) {
            prevKey = this.fromKey;
        }
        return prevKey;
    }
    getNextKey() {
        if (!this.animations || !this.animations.length) {
            return null;
        }
        let nextKey = Number.MAX_VALUE;
        for (const animation of this.activeAnimations) {
            const keys = animation.getKeys();
            for (const key of keys) {
                if (key.frame > this.activeFrame && key.frame < nextKey) {
                    nextKey = key.frame;
                }
            }
        }
        if (nextKey === Number.MAX_VALUE) {
            nextKey = this.toKey;
        }
        return nextKey;
    }
    /**
     * If any current active animation has a key at the received frameNumber,
     * return the index of the animation in the active animation array, and
     * the index of the frame on the animation.
     * @param frameNumber the frame number to look for
     * @returns null if no key was found, or an object with the animation index and key index
     */
    getKeyAtAnyFrameIndex(frameNumber) {
        if (!this.animations || !this.animations.length || !this.activeAnimations || !this.activeAnimations.length) {
            return null;
        }
        let animIdx = 0;
        for (const animation of this.activeAnimations) {
            const keys = animation.getKeys();
            let idx = 0;
            for (const key of keys) {
                if (Math.floor(frameNumber - key.frame) === 0) {
                    return { animationIndex: animIdx, keyIndex: idx };
                }
                idx++;
            }
            animIdx++;
        }
        return null;
    }
    /**
     * @returns true if any active animation has a quaternion animation
     */
    hasActiveQuaternionAnimationKeyPoints() {
        const activeAnimData = this.activeKeyPoints?.map((keyPointComponent) => keyPointComponent.props.curve.animation.dataType);
        const quaternionAnimData = activeAnimData?.filter((type) => type === Animation.ANIMATIONTYPE_QUATERNION);
        const hasActiveQuaternionAnimation = (quaternionAnimData?.length || 0) > 0;
        return hasActiveQuaternionAnimation;
    }
}
//# sourceMappingURL=context.js.map