export class SerializationTools {
    static UpdateLocations(geometry, globalState, frame) {
        geometry.editorData = {
            locations: [],
        };
        // Store node locations
        const blocks = frame ? frame.nodes.map((n) => n.content.data) : geometry.attachedBlocks;
        for (const block of blocks) {
            const node = globalState.onGetNodeFromBlock(block);
            geometry.editorData.locations.push({
                blockId: block.uniqueId,
                x: node ? node.x : 0,
                y: node ? node.y : 0,
            });
        }
        globalState.storeEditorData(geometry.editorData, frame);
    }
    static Serialize(geometry, globalState, frame) {
        this.UpdateLocations(geometry, globalState, frame);
        const selectedBlocks = frame ? frame.nodes.map((n) => n.content.data) : undefined;
        const serializationObject = geometry.serialize(selectedBlocks);
        return JSON.stringify(serializationObject, undefined, 2);
    }
    static Deserialize(serializationObject, globalState) {
        globalState.nodeGeometry.parseSerializedObject(serializationObject);
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
    static AddFrameToGeometry(serializationObject, globalState, currentGeometry) {
        this.UpdateLocations(currentGeometry, globalState);
        globalState.nodeGeometry.parseSerializedObject(serializationObject, true);
        globalState.onImportFrameObservable.notifyObservers(serializationObject);
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
}
//# sourceMappingURL=serializationTools.js.map