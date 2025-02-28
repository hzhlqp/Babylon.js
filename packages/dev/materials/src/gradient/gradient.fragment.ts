// Do not edit.
import { ShaderStore } from "core/Engines/shaderStore";
import "core/Shaders/ShadersInclude/helperFunctions";
import "core/Shaders/ShadersInclude/lightFragmentDeclaration";
import "core/Shaders/ShadersInclude/lightUboDeclaration";
import "core/Shaders/ShadersInclude/lightsFragmentFunctions";
import "core/Shaders/ShadersInclude/shadowsFragmentFunctions";
import "core/Shaders/ShadersInclude/clipPlaneFragmentDeclaration";
import "core/Shaders/ShadersInclude/logDepthDeclaration";
import "core/Shaders/ShadersInclude/fogFragmentDeclaration";
import "core/Shaders/ShadersInclude/clipPlaneFragment";
import "core/Shaders/ShadersInclude/depthPrePass";
import "core/Shaders/ShadersInclude/lightFragment";
import "core/Shaders/ShadersInclude/logDepthFragment";
import "core/Shaders/ShadersInclude/fogFragment";
import "core/Shaders/ShadersInclude/imageProcessingCompatibility";

const name = "gradientPixelShader";
const shader = `precision highp float;uniform vec4 vEyePosition;uniform vec4 topColor;uniform vec4 bottomColor;uniform float offset;uniform float scale;uniform float smoothness;varying vec3 vPositionW;varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);float h=vPosition.y*scale+offset;float mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));vec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));vec3 diffuseColor=baseColor.rgb;float alpha=baseColor.a;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef EMISSIVE
vec3 diffuseBase=baseColor.rgb;
#else
vec3 diffuseBase=vec3(0.,0.,0.);
#endif
lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const gradientPixelShader = { name, shader };
