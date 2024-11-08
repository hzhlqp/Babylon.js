// Do not edit.
import { ShaderStore } from "core/Engines/shaderStore";

const name = "handlePixelShader";
const shader = `uniform vec3 color;void main(void) {gl_FragColor=vec4(color,1.0);}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const handlePixelShader = { name, shader };
