import type { Scene } from "core/scene";
import * as React from "react";
import "core/Misc/PerformanceViewer/performanceViewerSceneExtension";
import "./scss/performanceViewer.scss";
interface IPerformanceViewerComponentProps {
    scene: Scene;
}
export declare enum IPerfMetadataCategory {
    Count = "Count",
    FrameSteps = "Frame Steps Duration"
}
export declare const PerformanceViewerComponent: React.FC<IPerformanceViewerComponentProps>;
export {};
