import type { PerformanceViewerCollector } from "core/Misc/PerformanceViewer/performanceViewerCollector";
import type { Observable } from "core/Misc/observable";
import type { IVisibleRangeChangedObservableProps } from "../../../graph/graphSupportingTypes";
interface IPerformanceViewerSidebarComponentProps {
    collector: PerformanceViewerCollector;
    onVisibleRangeChangedObservable?: Observable<IVisibleRangeChangedObservableProps>;
}
export declare const PerformanceViewerSidebarComponent: (props: IPerformanceViewerSidebarComponentProps) => import("react/jsx-runtime").JSX.Element;
export {};
