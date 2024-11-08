// packages/core/src/customBabylon.js
import { Engine } from "@core/Engines/engine";
import { SceneLoader } from "@core/Loading/sceneLoader";
import { Vector3, Matrix, Quaternion } from "@core/Maths/math.vector";
import { Texture, CubeTexture } from "@core/Materials/Textures";
import { Color3, Color4 } from "@core/Maths/math.color";
import { Constants } from "@core/Engines/constants";
import { MeshBuilder } from "@core/Meshes/meshBuilder";
import { Mesh } from "@core/Meshes/mesh";
import { StandardMaterial } from "@core/Materials/standardMaterial";
import { TransformNode, TrailMesh } from "@core/Meshes";
import { FollowCamera } from "@core/Cameras/followCamera";
import { PhysicsAggregate, PhysicsShapeType } from "@core/Physics";
import { HemisphericLight } from "@core/Lights/hemisphericLight";
import { HavokPlugin } from "@core/Physics/v2/Plugins/havokPlugin";

// 导出指定模块
export {
    Engine,
    SceneLoader,
    Vector3,
    Texture,
    Color4,
    Color3,
    Constants,
    MeshBuilder,
    StandardMaterial,
    CubeTexture,
    Mesh,
    TransformNode,
    TrailMesh,
    FollowCamera,
    Matrix,
    Quaternion,
    PhysicsAggregate,
    HemisphericLight,
    PhysicsShapeType,
    HavokPlugin,
};
