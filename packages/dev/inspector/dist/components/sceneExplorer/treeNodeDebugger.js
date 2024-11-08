// globalThis.debugNode receives the selected node in the inspector
export function setDebugNode(node) {
    if (typeof globalThis !== "undefined") {
        globalThis.debugNode = node;
        // GC to avoid memory leak on global reference
        if (typeof node._scene !== "undefined" && node._scene.onDisposeObservable) {
            node._scene.onDisposeObservable.add(() => {
                globalThis.debugNode = null;
            });
        }
    }
}
//# sourceMappingURL=treeNodeDebugger.js.map