// Do not edit.
import { ShaderStore } from "core/Engines/shaderStore";
const name = "mrdlBackglowVertexShader";
const shader = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;uniform float _Bevel_Radius_;uniform float _Line_Width_;uniform bool _Absolute_Sizes_;uniform float _Tuning_Motion_;uniform float _Motion_;uniform float _Max_Intensity_;uniform float _Intensity_Fade_In_Exponent_;uniform float _Outer_Fuzz_Start_;uniform float _Outer_Fuzz_End_;uniform vec4 _Color_;uniform vec4 _Inner_Color_;uniform float _Blend_Exponent_;uniform float _Falloff_;uniform float _Bias_;varying vec3 vNormal;varying vec2 vUV;void main()
{vec3 Dir_World_Q41=(world*vec4(tangent,0.0)).xyz;vec3 Dir_World_Q40=(world*vec4((cross(normal,tangent)),0.0)).xyz;float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);float Length_Q16=length(Dir_World_Q41);float Length_Q17=length(Dir_World_Q40);bool Greater_Than_Q37=MaxAB_Q24>0.0;vec3 Sizes_Q35;vec2 XY_Q35;Sizes_Q35=(_Absolute_Sizes_ ? vec3(Length_Q16,Length_Q17,0) : vec3(Length_Q16/Length_Q17,1,0));XY_Q35=(uv-vec2(0.5,0.5))*Sizes_Q35.xy;vec3 Result_Q38=Greater_Than_Q37 ? position : vec3(0,0,0);vec3 Pos_World_Q39=(world*vec4(Result_Q38,1.0)).xyz;vec3 Position=Pos_World_Q39;vec3 Normal=Sizes_Q35;vec2 UV=XY_Q35;vec3 Tangent=vec3(0,0,0);vec3 Binormal=vec3(0,0,0);vec4 Color=vec4(1,1,1,1);gl_Position=viewProjection*vec4(Position,1);vNormal=Normal;vUV=UV;}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const mrdlBackglowVertexShader = { name, shader };
//# sourceMappingURL=mrdlBackglow.vertex.js.map