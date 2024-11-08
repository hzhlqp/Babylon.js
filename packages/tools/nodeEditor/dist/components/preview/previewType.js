export var PreviewType;
(function (PreviewType) {
    // Meshes
    PreviewType[PreviewType["Sphere"] = 0] = "Sphere";
    PreviewType[PreviewType["Box"] = 1] = "Box";
    PreviewType[PreviewType["Torus"] = 2] = "Torus";
    PreviewType[PreviewType["Cylinder"] = 3] = "Cylinder";
    PreviewType[PreviewType["Plane"] = 4] = "Plane";
    PreviewType[PreviewType["ShaderBall"] = 5] = "ShaderBall";
    // Particle systems
    PreviewType[PreviewType["DefaultParticleSystem"] = 6] = "DefaultParticleSystem";
    PreviewType[PreviewType["Bubbles"] = 7] = "Bubbles";
    PreviewType[PreviewType["Smoke"] = 8] = "Smoke";
    PreviewType[PreviewType["Rain"] = 9] = "Rain";
    PreviewType[PreviewType["Explosion"] = 10] = "Explosion";
    PreviewType[PreviewType["Fire"] = 11] = "Fire";
    PreviewType[PreviewType["Custom"] = 12] = "Custom";
    // Env
    PreviewType[PreviewType["Room"] = 13] = "Room";
    // Gaussian Splatting
    PreviewType[PreviewType["Parrot"] = 14] = "Parrot";
    PreviewType[PreviewType["BricksSkull"] = 15] = "BricksSkull";
    PreviewType[PreviewType["Plants"] = 16] = "Plants";
})(PreviewType || (PreviewType = {}));
//# sourceMappingURL=previewType.js.map