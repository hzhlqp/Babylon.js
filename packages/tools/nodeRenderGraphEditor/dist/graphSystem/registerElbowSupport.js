export const RegisterElbowSupport = (stateManager) => {
    stateManager.isElbowConnectionAllowed = (a, b) => {
        //const _pointA = a.portData.data as NodeRenderGraphConnectionPoint;
        //const _pointB = b.portData.data as NodeRenderGraphConnectionPoint;
        return true;
    };
};
//# sourceMappingURL=registerElbowSupport.js.map