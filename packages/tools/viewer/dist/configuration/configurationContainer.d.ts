import type { ViewerConfiguration } from "./configuration";
import { Color3 } from "core/Maths/math";
import type { Scene } from "core/scene";
export declare class ConfigurationContainer {
    configuration: ViewerConfiguration;
    viewerId: string;
    mainColor: Color3;
    reflectionColor: Color3;
    scene?: Scene;
}
