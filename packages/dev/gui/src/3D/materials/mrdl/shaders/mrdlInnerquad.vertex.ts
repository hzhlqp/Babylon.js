// Do not edit.
import { ShaderStore } from "core/Engines/shaderStore";

const name = "mrdlInnerquadVertexShader";
const shader = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 tangent;attribute vec4 color;uniform vec4 _Color_;uniform float _Radius_;uniform bool _Fixed_Radius_;uniform float _Filter_Width_;uniform float _Glow_Fraction_;uniform float _Glow_Max_;uniform float _Glow_Falloff_;varying vec2 vUV;varying vec3 vTangent;void main()
{vec3 Pos_World_Q189;Pos_World_Q189=(world*vec4(position,1.0)).xyz;vec3 Dir_World_Q190;Dir_World_Q190=(world*vec4(tangent,0.0)).xyz;vec3 Dir_World_Q191;Dir_World_Q191=(world*vec4((cross(normal,tangent)),0.0)).xyz;float Length_Q180=length(Dir_World_Q190);float Length_Q181=length(Dir_World_Q191);float Quotient_Q184=Length_Q180/Length_Q181;float Quotient_Q195=_Radius_/Length_Q181;vec2 Result_Q193;Result_Q193=vec2((uv.x-0.5)*Length_Q180/Length_Q181,(uv.y-0.5));float Result_Q198=_Fixed_Radius_ ? Quotient_Q195 : _Radius_;vec3 Vec3_Q183=vec3(Quotient_Q184,Result_Q198,0);vec3 Position=Pos_World_Q189;vec3 Normal=vec3(0,0,0);vec2 UV=Result_Q193;vec3 Tangent=Vec3_Q183;vec3 Binormal=vec3(0,0,0);vec4 Color=color;gl_Position=viewProjection*vec4(Position,1);vUV=UV;vTangent=Tangent;}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const mrdlInnerquadVertexShader = { name, shader };
