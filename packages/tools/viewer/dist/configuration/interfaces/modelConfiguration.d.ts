import type { IModelAnimationConfiguration } from "./modelAnimationConfiguration";
export interface IModelConfiguration {
    id?: string;
    url?: string;
    root?: string;
    file?: string | File;
    loader?: string;
    position?: {
        x: number;
        y: number;
        z: number;
    };
    rotation?: {
        x: number;
        y: number;
        z: number;
        w?: number;
    };
    scaling?: {
        x: number;
        y: number;
        z: number;
    };
    parentObjectIndex?: number;
    castShadow?: boolean;
    receiveShadows?: boolean;
    normalize?: boolean | {
        center?: boolean;
        unitSize?: boolean;
        parentIndex?: number;
    };
    title?: string;
    subtitle?: string;
    thumbnail?: string;
    animation?: {
        autoStart?: boolean | string;
        playOnce?: boolean;
        autoStartIndex?: number;
    };
    entryAnimation?: IModelAnimationConfiguration;
    exitAnimation?: IModelAnimationConfiguration;
    material?: {
        directEnabled?: boolean;
        directIntensity?: number;
        emissiveIntensity?: number;
        environmentIntensity?: number;
        [propName: string]: any;
    };
    /**
     * Rotation offset axis definition
     */
    rotationOffsetAxis?: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * the offset angle
     */
    rotationOffsetAngle?: number;
    loaderConfiguration?: {
        maxLODsToLoad?: number;
        progressiveLoading?: boolean;
    };
}
