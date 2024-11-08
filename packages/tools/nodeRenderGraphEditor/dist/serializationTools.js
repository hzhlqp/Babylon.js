export class SerializationTools {
    static UpdateLocations(renderGraph, globalState, frame) {
        renderGraph.editorData = {
            locations: [],
        };
        // Store node locations
        const blocks = frame ? frame.nodes.map((n) => n.content.data) : renderGraph.attachedBlocks;
        for (const block of blocks) {
            const node = globalState.onGetNodeFromBlock(block);
            renderGraph.editorData.locations.push({
                blockId: block.uniqueId,
                x: node ? node.x : 0,
                y: node ? node.y : 0,
            });
        }
        globalState.storeEditorData(renderGraph.editorData, frame);
    }
    static Serialize(renderGraph, globalState, frame) {
        this.UpdateLocations(renderGraph, globalState, frame);
        const selectedBlocks = frame ? frame.nodes.map((n) => n.content.data) : undefined;
        const serializationObject = renderGraph.serialize(selectedBlocks);
        return JSON.stringify(serializationObject, undefined, 2);
    }
    static Deserialize(serializationObject, globalState) {
        globalState.nodeRenderGraph.parseSerializedObject(serializationObject);
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
    static AddFrameToRenderGraph(serializationObject, globalState, currentRenderGraph) {
        this.UpdateLocations(currentRenderGraph, globalState);
        globalState.nodeRenderGraph.parseSerializedObject(serializationObject, true);
        globalState.onImportFrameObservable.notifyObservers(serializationObject);
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
}
//# sourceMappingURL=serializationTools.js.map