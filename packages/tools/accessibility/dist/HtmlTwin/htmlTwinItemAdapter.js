import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { getAccessibleTexture, isVisible, getDirectChildrenOf } from "./htmlTwinItem";
import { useContext, useEffect, useReducer, useState } from "react";
import { SceneContext } from "./htmlTwinSceneContext";
import { HTMLTwinAccessibilityItem } from "./htmlTwinAccessibilityItem";
import { Container } from "gui/2D/controls/container";
import { Control } from "gui/2D/controls/control";
import { Node } from "core/node";
import { HTMLTwinNodeItem } from "./htmlTwinNodeItem";
import { HTMLTwinGUIItem } from "./htmlTwinGUIItem";
function getTwinItemFromNode(node, scene) {
    if (node instanceof Node) {
        return new HTMLTwinNodeItem(node, scene);
    }
    else {
        return new HTMLTwinGUIItem(node, scene);
    }
}
/**
 * An adapter that transforms a Accessible entity in a React element. Contains observables for the events that can
 * change the state of the entity or the accesible tree.
 * @param props the props of the adapter
 * @returns
 */
export function HTMLTwinItemAdapter(props) {
    const { node, scene, options } = props;
    if (!node) {
        return null;
    }
    const [twinItem, setTwinItem] = useState(getTwinItemFromNode(node, scene));
    useEffect(() => {
        setTwinItem(getTwinItemFromNode(node, scene));
    }, [node]);
    const [isVisibleState, setIsVisibleState] = useState(isVisible(props.node));
    const sceneContext = useContext(SceneContext);
    const [description, setDescription] = useState(twinItem?.getDescription(options));
    // From https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const children = getDirectChildrenOf(props.node);
    useEffect(() => {
        setDescription(twinItem?.getDescription(options));
    }, [twinItem]);
    useEffect(() => {
        // General observers for all the entities
        const enabledObservable = node.onEnabledStateChangedObservable;
        const enabledObserver = enabledObservable.add((value) => {
            setIsVisibleState(value);
        });
        const disposeObservable = node.onDisposeObservable;
        const disposeObserver = disposeObservable.add(() => {
            sceneContext.updateScene();
        });
        const accessibilityTagObservable = node.onAccessibilityTagChangedObservable;
        const accessibilityTagObserver = accessibilityTagObservable.add(() => {
            setDescription(twinItem?.getDescription(options));
        });
        // Specific observer for control only
        let isVisibleChangedObservable;
        let isVisibleChangedObserver;
        if (node instanceof Control) {
            isVisibleChangedObservable = node.onIsVisibleChangedObservable;
            isVisibleChangedObserver = isVisibleChangedObservable.add(() => {
                setIsVisibleState(isVisible(props.node));
            });
        }
        // specific observers for container only
        let controlAddedObservable;
        let controlAddedObserver;
        let controlRemovedObservable;
        let controlRemovedObserver;
        if (node instanceof Container) {
            controlAddedObservable = node.onControlAddedObservable;
            controlAddedObserver = controlAddedObservable.add(() => {
                forceUpdate();
            });
            controlRemovedObservable = node.onControlRemovedObservable;
            controlRemovedObserver = controlRemovedObservable.add(() => {
                forceUpdate();
            });
        }
        return () => {
            enabledObservable.remove(enabledObserver);
            disposeObservable.remove(disposeObserver);
            accessibilityTagObservable.remove(accessibilityTagObserver);
            if (node instanceof Control) {
                isVisibleChangedObservable.remove(isVisibleChangedObserver);
            }
            if (node instanceof Container) {
                controlAddedObservable.remove(controlAddedObserver);
                controlRemovedObservable.remove(controlRemovedObserver);
            }
        };
    }, [node]);
    if (isVisibleState) {
        const accessibleTexture = getAccessibleTexture(props.node);
        return (_jsxs(_Fragment, { children: [accessibleTexture && _jsx(HTMLTwinItemAdapter, { node: accessibleTexture.rootContainer, scene: scene, options: options }), (!!description || children.length > 0) && (_jsx(HTMLTwinAccessibilityItem, { description: description, a11yItem: twinItem, children: children.map((child) => (_jsx(HTMLTwinItemAdapter, { node: child, scene: scene, options: options }, child.uniqueId))) }))] }));
    }
    else {
        return null;
    }
}
//# sourceMappingURL=htmlTwinItemAdapter.js.map