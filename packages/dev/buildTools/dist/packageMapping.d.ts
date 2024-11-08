export type BuildType = /*"lts" | */ "umd" | "esm" | "es6" | "namespace";
export declare const declarationsOnlyPackages: DevPackageName[];
export type DevPackageName = "core" | "gui" | "materials" | "loaders" | "serializers" | "inspector" | "post-processes" | "procedural-textures" | "node-editor" | "node-geometry-editor" | "node-render-graph-editor" | "gui-editor" | "accessibility" | "viewer" | "ktx2decoder" | "shared-ui-components" | "babylonjs-gltf2interface" | "addons";
export type UMDPackageName = "babylonjs" | "babylonjs-gui" | "babylonjs-serializers" | "babylonjs-loaders" | "babylonjs-materials" | "babylonjs-procedural-textures" | "babylonjs-inspector" | "babylonjs-node-editor" | "babylonjs-node-geometry-editor" | "babylonjs-node-render-graph-editor" | "babylonjs-gui-editor" | "babylonjs-accessibility" | "babylonjs-viewer" | "babylonjs-post-process" | "babylonjs-ktx2decoder" | "babylonjs-shared-ui-components" | "babylonjs-gltf2interface" | "babylonjs-addons";
export type NamespacePackageName = "BABYLON" | "BABYLON.GUI" | "BABYLON.GLTF1" | "BABYLON.GLTF2" | "BABYLON.GLTF2.Loader" | "BABYLON.GLTF2.Loader.Extensions" | "BABYLON.Debug" | "BABYLON.NodeEditor" | "BABYLON.NodeGeometryEditor" | "BABYLON.NodeRenderGraphEditor" | "BABYLON.GuiEditor" | "BABYLON.Accessibility" | "ADDONS" | "INSPECTOR" | "BabylonViewer" | "KTX2DECODER" | "INSPECTOR.SharedUIComponents" | "BABYLON.SharedUIComponents" | "BABYLON.NodeEditor.SharedUIComponents" | "BABYLON.NodeGeometryEditor.SharedUIComponents" | "BABYLON.NodeRenderGraphEditor.SharedUIComponents" | "BABYLON.GuiEditor.SharedUIComponents";
export type ES6PackageName = "@babylonjs/core" | "@babylonjs/gui" | "@babylonjs/materials" | "@babylonjs/loaders" | "@babylonjs/serializers" | "@babylonjs/procedural-textures" | "@babylonjs/inspector" | "@babylonjs/node-editor" | "@babylonjs/node-geometry-editor" | "@babylonjs/node-render-graph-editor" | "@babylonjs/gui-editor" | "@babylonjs/accessibility" | "@babylonjs/post-processes" | "@babylonjs/viewer" | "@babylonjs/ktx2decoder" | "@babylonjs/shared-ui-components" | "@babylonjs/addons" | "babylonjs-gltf2interface";
export declare const umdPackageMapping: {
    [key in UMDPackageName]: {
        baseDir: string;
        baseFilename: string;
        isBundle?: boolean;
    };
};
export type ESMPackageName = "@babylonjs/esm";
export type PublicPackageName = UMDPackageName | ES6PackageName | ESMPackageName | NamespacePackageName;
export type PublicPackageVariable = PublicPackageName | ((data?: any) => PublicPackageName);
export type PackageMap = {
    [buildType in BuildType]: PublicPackageVariable;
};
export declare function getAllDevNames(): DevPackageName[];
export declare function getAllBuildTypes(): BuildType[];
export declare function isValidPackageMap(packageMap: {
    [key: string]: string | ((data?: any) => string);
}): packageMap is PackageMap;
export declare function getPackageMappingByDevName(devName: DevPackageName, publicOnly?: boolean): PackageMap;
export declare function getAllPackageMappingsByDevNames(): {
    [devName in DevPackageName]: PackageMap;
};
export declare function getDevPackagesByBuildType(buildType: BuildType): {
    [key in DevPackageName]: PublicPackageVariable;
};
export declare function getPublicPackageName(publicVariable: PublicPackageVariable, data?: any): PublicPackageName;
export declare function isValidDevPackageName(devName: string, publicOnly?: boolean): devName is DevPackageName;
export declare function isValidBuildType(buildType: string): buildType is BuildType;
export declare function isPublicDevPackageName(devName: string): devName is PublicPackageName;
