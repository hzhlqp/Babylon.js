import type { IPaneComponentProps } from "../paneComponent";
import { PaneComponent } from "../paneComponent";
export declare class StatisticsTabComponent extends PaneComponent {
    private _sceneInstrumentation;
    private _engineInstrumentation;
    private _timerIntervalId;
    constructor(props: IPaneComponentProps);
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
