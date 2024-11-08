import { Animation } from "core/Animations/animation";
import { AnimationKeyInterpolation } from "core/Animations/animationKey";
import { Observable } from "core/Misc/observable";
export interface KeyEntry {
    frame: number;
    value: number;
    inTangent?: number;
    outTangent?: number;
    lockedTangent: boolean;
    interpolation?: AnimationKeyInterpolation;
}
export declare class Curve {
    static readonly SampleRate = 50;
    keys: KeyEntry[];
    animation: Animation;
    color: string;
    onDataUpdatedObservable: Observable<void>;
    property?: string;
    tangentBuilder?: () => any;
    setDefaultInTangent?: (keyId: number) => any;
    setDefaultOutTangent?: (keyId: number) => any;
    static readonly TangentLength = 50;
    constructor(color: string, animation: Animation, property?: string, tangentBuilder?: () => any, setDefaultInTangent?: (keyId: number) => any, setDefaultOutTangent?: (keyId: number) => any);
    getPathData(convertX: (x: number) => number, convertY: (y: number) => number): string;
    updateLockedTangentMode(keyIndex: number, enabled: boolean): void;
    updateInterpolationMode(keyIndex: number, interpolationMode: AnimationKeyInterpolation): void;
    getInControlPoint(keyIndex: number): number | undefined;
    getOutControlPoint(keyIndex: number): number | undefined;
    hasDefinedOutTangent(keyIndex: number): boolean;
    evaluateOutTangent(keyIndex: number): number;
    hasDefinedInTangent(keyIndex: number): boolean;
    evaluateInTangent(keyIndex: number): number;
    storeDefaultInTangent(keyIndex: number): void;
    storeDefaultOutTangent(keyIndex: number): void;
    updateInTangentFromControlPoint(keyId: number, slope: number): void;
    updateOutTangentFromControlPoint(keyId: number, slope: number): void;
    updateKeyFrame(keyId: number, frame: number): void;
    updateKeyValue(keyId: number, value: number): void;
}
