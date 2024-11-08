import { Texture } from "core/Materials/Textures/texture";
import { DataStorage } from "core/Misc/dataStorage";
export class SerializationTools {
    static UpdateLocations(material, globalState, frame) {
        material.editorData = {
            locations: [],
        };
        // Store node locations
        const blocks = frame ? frame.nodes.map((n) => n.content.data) : material.attachedBlocks;
        for (const block of blocks) {
            const node = globalState.onGetNodeFromBlock(block);
            material.editorData.locations.push({
                blockId: block.uniqueId,
                x: node ? node.x : 0,
                y: node ? node.y : 0,
            });
        }
        globalState.storeEditorData(material.editorData, frame);
    }
    static Serialize(material, globalState, frame) {
        const bufferSerializationState = Texture.SerializeBuffers;
        Texture.SerializeBuffers = DataStorage.ReadBoolean("EmbedTextures", true);
        this.UpdateLocations(material, globalState, frame);
        const selectedBlocks = frame ? frame.nodes.map((n) => n.content.data) : undefined;
        const serializationObject = material.serialize(selectedBlocks);
        Texture.SerializeBuffers = bufferSerializationState;
        return JSON.stringify(serializationObject, undefined, 2);
    }
    static Deserialize(serializationObject, globalState) {
        globalState.nodeMaterial.parseSerializedObject(serializationObject, "");
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
    static AddFrameToMaterial(serializationObject, globalState, currentMaterial) {
        this.UpdateLocations(currentMaterial, globalState);
        globalState.nodeMaterial.parseSerializedObject(serializationObject, "", true);
        globalState.onImportFrameObservable.notifyObservers(serializationObject);
        globalState.onIsLoadingChanged.notifyObservers(false);
    }
}
//# sourceMappingURL=serializationTools.js.map