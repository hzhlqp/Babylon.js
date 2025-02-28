// Do not edit.
import { ShaderStore } from "core/Engines/shaderStore";
import "core/Shaders/ShadersInclude/instancesDeclaration";
import "core/Shaders/ShadersInclude/logDepthDeclaration";
import "core/Shaders/ShadersInclude/fogVertexDeclaration";
import "core/Shaders/ShadersInclude/instancesVertex";
import "core/Shaders/ShadersInclude/fogVertex";
import "core/Shaders/ShadersInclude/logDepthVertex";
const name = "gridVertexShader";
const shader = `precision highp float;attribute vec3 position;attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#include<instancesDeclaration>
uniform mat4 projection;uniform mat4 view;varying vec3 vPosition;varying vec3 vNormal;
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;uniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
#include<fogVertex>
vec4 cameraSpacePosition=view*worldPos;gl_Position=projection*cameraSpacePosition;
#ifdef OPACITY
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
if (vOpacityInfos.x==0.)
{vOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));}
else
{vOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));}
#endif 
#include<logDepthVertex>
vPosition=position;vNormal=normal;
#define CUSTOM_VERTEX_MAIN_END
}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const gridVertexShader = { name, shader };
//# sourceMappingURL=grid.vertex.js.map