import type { IPaneComponentProps } from "../paneComponent";
import { PaneComponent } from "../paneComponent";
import "core/Physics/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
import "core/Physics/v2/physicsEngineComponent";
export declare class DebugTabComponent extends PaneComponent {
    private _physicsViewersEnabled;
    constructor(props: IPaneComponentProps);
    switchPhysicsViewers(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
