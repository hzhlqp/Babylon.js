import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SceneContext } from "./htmlTwinSceneContext";
import { HTMLTwinItemAdapter } from "./htmlTwinItemAdapter";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
function getSceneIds(scene) {
    const newSet = new Set();
    scene.rootNodes.forEach((node) => newSet.add(node.uniqueId));
    return newSet;
}
function getFullscreenGuiTextures(scene) {
    const textures = [];
    for (const texture of scene.textures) {
        if (texture instanceof AdvancedDynamicTexture && texture._isFullscreen) {
            textures.push(texture);
        }
    }
    return textures;
}
/**
 * The scene tree of the HTML twin. It contain all the top level nodes
 * @param props
 * @returns
 */
export function HTMLTwinSceneTree(props) {
    const { scene, options } = props;
    const [, setMeshIds] = useState(new Set());
    const [sceneGuiTextures, setSceneGuiTextures] = useState(getFullscreenGuiTextures(scene));
    const nextFrameObserver = useRef(null);
    const sceneContext = useContext(SceneContext);
    const getChildren = useCallback(() => {
        return (_jsxs(_Fragment, { children: [scene.rootNodes.map((node) => (_jsx(HTMLTwinItemAdapter, { node: node, scene: scene, options: options }, node.uniqueId))), sceneGuiTextures.map((texture) => (_jsx(HTMLTwinItemAdapter, { node: texture.rootContainer, scene: scene, options: options }, texture.uniqueId)))] }));
    }, [scene, sceneGuiTextures, options]);
    useEffect(() => {
        const newMeshAddedObserver = scene.onNewMeshAddedObservable.add(() => {
            if (!nextFrameObserver.current) {
                nextFrameObserver.current = props.scene.onBeforeRenderObservable.addOnce(() => {
                    nextFrameObserver.current = null;
                    setMeshIds(getSceneIds(props.scene));
                });
            }
        });
        const newTextureAddedObserver = scene.onNewTextureAddedObservable.add((texture) => {
            if (texture instanceof AdvancedDynamicTexture) {
                setSceneGuiTextures((current) => [...current, texture]);
            }
        });
        return () => {
            scene.onNewMeshAddedObservable.remove(newMeshAddedObserver);
            scene.onNewTextureAddedObservable.remove(newTextureAddedObserver);
        };
    }, [scene]);
    useEffect(() => {
        if (sceneContext) {
            sceneContext.updateScene = () => {
                setMeshIds(getSceneIds(props.scene));
            };
        }
    }, [sceneContext]);
    return getChildren();
}
//# sourceMappingURL=htmlTwinSceneTree.js.map