import type { IPaneComponentProps } from "../paneComponent";
import { PaneComponent } from "../paneComponent";
/**
 *
 */
export declare class PropertyGridTabComponent extends PaneComponent {
    private _timerIntervalId;
    private _lockObject;
    constructor(props: IPaneComponentProps);
    timerRefresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderContent(): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
