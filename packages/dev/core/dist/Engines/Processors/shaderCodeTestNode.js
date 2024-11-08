import { ShaderCodeNode } from "./shaderCodeNode";
/** @internal */
export class ShaderCodeTestNode extends ShaderCodeNode {
    isValid(preprocessors) {
        return this.testExpression.isTrue(preprocessors);
    }
}
//# sourceMappingURL=shaderCodeTestNode.js.map