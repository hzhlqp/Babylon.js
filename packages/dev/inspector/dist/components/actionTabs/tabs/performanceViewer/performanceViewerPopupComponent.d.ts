import * as React from "react";
import type { Scene } from "core/scene";
import { Observable } from "core/Misc/observable";
import type { PerformanceViewerCollector } from "core/Misc/PerformanceViewer/performanceViewerCollector";
import type { IPerfLayoutSize } from "../../../graph/graphSupportingTypes";
interface IPerformanceViewerPopupComponentProps {
    scene: Scene;
    layoutObservable: Observable<IPerfLayoutSize>;
    returnToLiveObservable: Observable<void>;
    performanceCollector: PerformanceViewerCollector;
    initialGraphSize?: {
        width: number;
        height: number;
    };
}
export declare const PerformanceViewerPopupComponent: React.FC<IPerformanceViewerPopupComponentProps>;
export {};
