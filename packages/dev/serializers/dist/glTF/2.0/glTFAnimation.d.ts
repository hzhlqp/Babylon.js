import type { IAnimation, INode, IBufferView, IAccessor } from "babylonjs-gltf2interface";
import { AnimationSamplerInterpolation, AnimationChannelTargetPath, AccessorType } from "babylonjs-gltf2interface";
import type { Node } from "core/node";
import type { Nullable } from "core/types";
import { Animation } from "core/Animations/animation";
import type { Scene } from "core/scene";
import type { _BinaryWriter } from "./glTFExporter";
/**
 * @internal
 * Interface to store animation data.
 */
export interface _IAnimationData {
    /**
     * Keyframe data.
     */
    inputs: number[];
    /**
     * Value data.
     */
    outputs: number[][];
    /**
     * Animation interpolation data.
     */
    samplerInterpolation: AnimationSamplerInterpolation;
    /**
     * Minimum keyframe value.
     */
    inputsMin: number;
    /**
     * Maximum keyframe value.
     */
    inputsMax: number;
}
/**
 * @internal
 */
export interface _IAnimationInfo {
    /**
     * The target channel for the animation
     */
    animationChannelTargetPath: AnimationChannelTargetPath;
    /**
     * The glTF accessor type for the data.
     */
    dataAccessorType: AccessorType.VEC3 | AccessorType.VEC4 | AccessorType.SCALAR;
    /**
     * Specifies if quaternions should be used.
     */
    useQuaternion: boolean;
}
/**
 * @internal
 * Utility class for generating glTF animation data from BabylonJS.
 */
export declare class _GLTFAnimation {
    /**
     * Determine if a node is transformable - ie has properties it should be part of animation of transformation.
     * @param babylonNode the node to test
     * @returns true if can be animated, false otherwise. False if the parameter is null or undefined.
     */
    private static _IsTransformable;
    /**
     * @ignore
     *
     * Creates glTF channel animation from BabylonJS animation.
     * @param babylonTransformNode - BabylonJS mesh.
     * @param animation - animation.
     * @param animationChannelTargetPath - The target animation channel.
     * @param useQuaternion - Specifies if quaternions are used.
     * @returns nullable IAnimationData
     */
    static _CreateNodeAnimation(babylonTransformNode: Node, animation: Animation, animationChannelTargetPath: AnimationChannelTargetPath, useQuaternion: boolean, animationSampleRate: number): Nullable<_IAnimationData>;
    private static _DeduceAnimationInfo;
    /**
     * @ignore
     * Create node animations from the transform node animations
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateNodeAnimationFromNodeAnimations(babylonNode: Node, runtimeGLTFAnimation: IAnimation, idleGLTFAnimations: IAnimation[], nodeMap: {
        [key: number]: number;
    }, nodes: INode[], binaryWriter: _BinaryWriter, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, shouldExportAnimation?: (animation: Animation) => boolean): void;
    /**
     * @ignore
     * Create individual morph animations from the mesh's morph target animation tracks
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateMorphTargetAnimationFromMorphTargetAnimations(babylonNode: Node, runtimeGLTFAnimation: IAnimation, idleGLTFAnimations: IAnimation[], nodeMap: {
        [key: number]: number;
    }, nodes: INode[], binaryWriter: _BinaryWriter, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, shouldExportAnimation?: (animation: Animation) => boolean): void;
    /**
     * @internal
     * Create node and morph animations from the animation groups
     * @param babylonScene
     * @param glTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateNodeAndMorphAnimationFromAnimationGroups(babylonScene: Scene, glTFAnimations: IAnimation[], nodeMap: {
        [key: number]: number;
    }, binaryWriter: _BinaryWriter, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, shouldExportAnimation?: (animation: Animation) => boolean): void;
    private static _AddAnimation;
    /**
     * Create a baked animation
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation corresponding to the BabylonJS mesh
     * @param animationChannelTargetPath animation target channel
     * @param minFrame minimum animation frame
     * @param maxFrame maximum animation frame
     * @param fps frames per second of the animation
     * @param sampleRate
     * @param inputs input key frames of the animation
     * @param outputs output key frame data of the animation
     * @param minMaxFrames
     * @param minMaxFrames.min
     * @param minMaxFrames.max
     * @param useQuaternion specifies if quaternions should be used
     */
    private static _CreateBakedAnimation;
    private static _ConvertFactorToVector3OrQuaternion;
    private static _SetInterpolatedValue;
    /**
     * Creates linear animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    private static _CreateLinearOrStepAnimation;
    /**
     * Creates cubic spline animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    private static _CreateCubicSplineAnimation;
    private static _GetBasePositionRotationOrScale;
    /**
     * Adds a key frame value
     * @param keyFrame
     * @param animation
     * @param outputs
     * @param animationChannelTargetPath
     * @param babylonTransformNode
     * @param useQuaternion
     */
    private static _AddKeyframeValue;
    /**
     * @internal
     * Determine the interpolation based on the key frames
     * @param keyFrames
     * @param animationChannelTargetPath
     * @param useQuaternion
     */
    private static _DeduceInterpolation;
    /**
     * Adds an input tangent or output tangent to the output data
     * If an input tangent or output tangent is missing, it uses the zero vector or zero quaternion
     * @param tangentType Specifies which type of tangent to handle (inTangent or outTangent)
     * @param outputs The animation data by keyframe
     * @param animationChannelTargetPath The target animation channel
     * @param interpolation The interpolation type
     * @param keyFrame The key frame with the animation data
     * @param useQuaternion Specifies if quaternions are used
     */
    private static _AddSplineTangent;
    /**
     * Get the minimum and maximum key frames' frame values
     * @param keyFrames animation key frames
     * @returns the minimum and maximum key frame value
     */
    private static _CalculateMinMaxKeyFrames;
}
