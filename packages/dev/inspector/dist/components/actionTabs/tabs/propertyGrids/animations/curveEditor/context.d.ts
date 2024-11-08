import type { Nullable } from "core/types";
import { Animation } from "core/Animations/animation";
import { Observable } from "core/Misc/observable";
import type { KeyPointComponent } from "./graph/keyPoint";
import type { Scene } from "core/scene";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { AnimationGroup, TargetedAnimation } from "core/Animations/animationGroup";
import type { AnimationKeyInterpolation } from "core/Animations/animationKey";
export interface IActiveAnimationChangedOptions {
    evaluateKeys?: boolean;
    frame?: boolean;
    range?: boolean;
}
export declare class Context {
    title: string;
    animations: Nullable<Animation[] | TargetedAnimation[]>;
    scene: Scene;
    target: Nullable<IAnimatable>;
    rootAnimationGroup: Nullable<AnimationGroup>;
    activeAnimations: Animation[];
    activeChannels: {
        [key: number]: string;
    };
    activeKeyPoints: Nullable<KeyPointComponent[]>;
    mainKeyPoint: Nullable<KeyPointComponent>;
    snippetId: string;
    useTargetAnimations: boolean;
    activeFrame: number;
    fromKey: number;
    toKey: number;
    useExistingPlayRange: boolean;
    forwardAnimation: boolean;
    isPlaying: boolean;
    clipLength: number;
    referenceMinFrame: number;
    referenceMaxFrame: number;
    focusedInput: boolean;
    onActiveAnimationChanged: Observable<IActiveAnimationChangedOptions>;
    onActiveKeyPointChanged: Observable<void>;
    onHostWindowResized: Observable<void>;
    onSelectAllKeys: Observable<void>;
    onActiveKeyFrameChanged: Observable<number>;
    onFrameSet: Observable<number>;
    onFrameManuallyEntered: Observable<number>;
    onMainKeyPointSet: Observable<void>;
    onMainKeyPointMoved: Observable<void>;
    onValueSet: Observable<number>;
    onValueManuallyEntered: Observable<number>;
    onFrameRequired: Observable<void>;
    onCreateOrUpdateKeyPointRequired: Observable<void>;
    onFlattenTangentRequired: Observable<void>;
    onLinearTangentRequired: Observable<void>;
    onBreakTangentRequired: Observable<void>;
    onUnifyTangentRequired: Observable<void>;
    onStepTangentRequired: Observable<void>;
    onDeleteAnimation: Observable<Animation>;
    onGraphMoved: Observable<number>;
    onGraphScaled: Observable<number>;
    onRangeUpdated: Observable<void>;
    onMoveToFrameRequired: Observable<number>;
    onAnimationStateChanged: Observable<void>;
    onDeleteKeyActiveKeyPoints: Observable<void>;
    onSelectionRectangleMoved: Observable<DOMRect>;
    onAnimationsLoaded: Observable<void>;
    onEditAnimationRequired: Observable<Animation>;
    onEditAnimationUIClosed: Observable<void>;
    onClipLengthIncreased: Observable<number>;
    onClipLengthDecreased: Observable<number>;
    onInterpolationModeSet: Observable<{
        keyId: number;
        value: AnimationKeyInterpolation;
    }>;
    onSelectToActivated: Observable<{
        from: number;
        to: number;
    }>;
    onRangeFrameBarResized: Observable<number>;
    onPlayheadMoved: Observable<number>;
    lockLastFrameValue: boolean;
    lockLastFrameFrame: boolean;
    onActiveKeyDataChanged: Observable<number>;
    prepare(): void;
    play(forward: boolean): void;
    stop(): void;
    moveToFrame(frame: number): void;
    refreshTarget(): void;
    clearSelection(): void;
    enableChannel(animation: Animation, color: string): void;
    disableChannel(animation: Animation): void;
    isChannelEnabled(animation: Animation, color: string): boolean;
    getActiveChannel(animation: Animation): string;
    resetAllActiveChannels(): void;
    getAnimationSortIndex(animation: Animation): number;
    getPrevKey(): Nullable<number>;
    getNextKey(): Nullable<number>;
    /**
     * If any current active animation has a key at the received frameNumber,
     * return the index of the animation in the active animation array, and
     * the index of the frame on the animation.
     * @param frameNumber the frame number to look for
     * @returns null if no key was found, or an object with the animation index and key index
     */
    getKeyAtAnyFrameIndex(frameNumber: number): {
        animationIndex: number;
        keyIndex: number;
    } | null;
    /**
     * @returns true if any active animation has a quaternion animation
     */
    hasActiveQuaternionAnimationKeyPoints(): boolean;
}
