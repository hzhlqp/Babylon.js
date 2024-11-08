import type { Scene } from "core/scene";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
import { NodeRenderGraphOutputBlock } from "core/FrameGraph/Node/Blocks/outputBlock";
import { NodeRenderGraphInputBlock } from "core/FrameGraph/Node/Blocks/inputBlock";
import { NodeRenderGraphElbowBlock } from "core/FrameGraph/Node/Blocks/elbowBlock";
import { NodeRenderGraphTeleportInBlock } from "core/FrameGraph/Node/Blocks/Teleport/teleportInBlock";
import { NodeRenderGraphTeleportOutBlock } from "core/FrameGraph/Node/Blocks/Teleport/teleportOutBlock";
import { NodeRenderGraphBlackAndWhitePostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/blackAndWhitePostProcessBlock";
import { NodeRenderGraphBloomPostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/bloomPostProcessBlock";
import { NodeRenderGraphBlurPostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/blurPostProcessBlock";
import { NodeRenderGraphCircleOfConfusionPostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/circleOfConfusionPostProcessBlock";
import { NodeRenderGraphDepthOfFieldPostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/depthOfFieldPostProcessBlock";
import { NodeRenderGraphExtractHighlightsPostProcessBlock } from "core/FrameGraph/Node/Blocks/PostProcesses/extractHighlightsPostProcessBlock";
import { NodeRenderGraphClearBlock } from "core/FrameGraph/Node/Blocks/Textures/clearBlock";
import { NodeRenderGraphCopyTextureBlock } from "core/FrameGraph/Node/Blocks/Textures/copyTextureBlock";
import { NodeRenderGraphGenerateMipmapsBlock } from "core/FrameGraph/Node/Blocks/Textures/generateMipmapsBlock";
import { NodeRenderGraphObjectRendererBlock } from "core/FrameGraph/Node/Blocks/Rendering/objectRendererBlock";
import { NodeRenderGraphGeometryRendererBlock } from "core/FrameGraph/Node/Blocks/Rendering/geometryRendererBlock";
import { NodeRenderGraphCullObjectsBlock } from "core/FrameGraph/Node/Blocks/Rendering/cullObjectsBlock";
import { NodeRenderGraphGUIBlock } from "gui/2D/FrameGraph/renderGraphGUIBlock";
import type { FrameGraph } from "core/FrameGraph/frameGraph";
/**
 * Static class for BlockTools
 */
export declare class BlockTools {
    static GetBlockFromString(data: string, frameGraph: FrameGraph, scene: Scene): NodeRenderGraphTeleportInBlock | NodeRenderGraphTeleportOutBlock | NodeRenderGraphOutputBlock | NodeRenderGraphElbowBlock | NodeRenderGraphInputBlock | NodeRenderGraphClearBlock | NodeRenderGraphCopyTextureBlock | NodeRenderGraphGenerateMipmapsBlock | NodeRenderGraphBlackAndWhitePostProcessBlock | NodeRenderGraphBloomPostProcessBlock | NodeRenderGraphBlurPostProcessBlock | NodeRenderGraphGUIBlock | NodeRenderGraphObjectRendererBlock | NodeRenderGraphGeometryRendererBlock | NodeRenderGraphCullObjectsBlock | NodeRenderGraphCircleOfConfusionPostProcessBlock | NodeRenderGraphDepthOfFieldPostProcessBlock | NodeRenderGraphExtractHighlightsPostProcessBlock | null;
    static GetColorFromConnectionNodeType(type: NodeRenderGraphBlockConnectionPointTypes): string;
    static GetConnectionNodeTypeFromString(type: string): NodeRenderGraphBlockConnectionPointTypes.Texture | NodeRenderGraphBlockConnectionPointTypes.TextureBackBuffer | NodeRenderGraphBlockConnectionPointTypes.TextureBackBufferDepthStencilAttachment | NodeRenderGraphBlockConnectionPointTypes.TextureDepthStencilAttachment | NodeRenderGraphBlockConnectionPointTypes.TextureViewDepth | NodeRenderGraphBlockConnectionPointTypes.TextureViewNormal | NodeRenderGraphBlockConnectionPointTypes.TextureAlbedo | NodeRenderGraphBlockConnectionPointTypes.TextureReflectivity | NodeRenderGraphBlockConnectionPointTypes.TextureWorldPosition | NodeRenderGraphBlockConnectionPointTypes.TextureVelocity | NodeRenderGraphBlockConnectionPointTypes.TextureScreenDepth | NodeRenderGraphBlockConnectionPointTypes.TextureWorldNormal | NodeRenderGraphBlockConnectionPointTypes.TextureLocalPosition | NodeRenderGraphBlockConnectionPointTypes.TextureLinearVelocity | NodeRenderGraphBlockConnectionPointTypes.Camera | NodeRenderGraphBlockConnectionPointTypes.ObjectList | NodeRenderGraphBlockConnectionPointTypes.AutoDetect;
    static GetStringFromConnectionNodeType(type: NodeRenderGraphBlockConnectionPointTypes): "" | "Texture" | "Camera" | "TextureBackBuffer" | "TextureBackBufferDepthStencilAttachment" | "TextureDepthStencilAttachment" | "ObjectList" | "TextureNormal" | "TextureAlbedo" | "TextureReflectivity" | "TexturePosition" | "TextureVelocity" | "TextureScreenDepth" | "TextureLocalPosition" | "TextureWorldNormal" | "TextureLinearVelocity" | "TextureDepth";
}
