export const RegisterDebugSupport = (stateManager) => {
    stateManager.isDebugConnectionAllowed = (a, b) => {
        return false; // No debug node in NME
    };
};
//# sourceMappingURL=registerDebugSupport.js.map