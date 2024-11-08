import type { PerformanceViewerCollector } from "core/Misc/PerformanceViewer/performanceViewerCollector";
import type { Observable } from "core/Misc/observable";
import * as React from "react";
import type { IPerfLayoutSize, IVisibleRangeChangedObservableProps } from "./graphSupportingTypes";
import type { Scene } from "core/scene";
interface ICanvasGraphComponentProps {
    id: string;
    scene: Scene;
    collector: PerformanceViewerCollector;
    layoutObservable?: Observable<IPerfLayoutSize>;
    returnToPlayheadObservable?: Observable<void>;
    onVisibleRangeChangedObservable?: Observable<IVisibleRangeChangedObservableProps>;
    initialGraphSize?: {
        width: number;
        height: number;
    };
}
export declare const CanvasGraphComponent: React.FC<ICanvasGraphComponentProps>;
export {};
