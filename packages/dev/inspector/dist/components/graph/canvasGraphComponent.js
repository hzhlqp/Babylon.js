import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { CanvasGraphService } from "./canvasGraphService";
import { Logger } from "core/Misc/logger";
export const CanvasGraphComponent = (props) => {
    const { id, collector, scene, layoutObservable, returnToPlayheadObservable, onVisibleRangeChangedObservable, initialGraphSize } = props;
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        if (initialGraphSize) {
            canvasRef.current.width = initialGraphSize.width;
            canvasRef.current.height = initialGraphSize.height;
        }
        let cs;
        try {
            cs = new CanvasGraphService(canvasRef.current, { datasets: collector.datasets, onVisibleRangeChangedObservable });
        }
        catch (error) {
            Logger.Error(error);
            return;
        }
        const layoutUpdated = (newSize) => {
            if (!canvasRef.current) {
                return;
            }
            const { left, top } = canvasRef.current.getBoundingClientRect();
            newSize.width = newSize.width - left;
            newSize.height = newSize.height - top;
            cs?.resize(newSize);
        };
        const dataUpdated = () => {
            cs?.update();
        };
        const metaUpdated = (meta) => {
            if (!cs) {
                return;
            }
            cs.metadata = meta;
            cs.update();
        };
        const resetDataPosition = () => {
            cs?.resetDataPosition();
        };
        scene.onAfterRenderObservable.add(dataUpdated);
        collector.metadataObservable.add(metaUpdated);
        layoutObservable?.add(layoutUpdated);
        returnToPlayheadObservable?.add(resetDataPosition);
        return () => {
            cs?.destroy();
            layoutObservable?.removeCallback(layoutUpdated);
            scene.onAfterRenderObservable.removeCallback(dataUpdated);
            collector.metadataObservable.removeCallback(metaUpdated);
        };
    }, [canvasRef]);
    return _jsx("canvas", { id: id, ref: canvasRef });
};
//# sourceMappingURL=canvasGraphComponent.js.map