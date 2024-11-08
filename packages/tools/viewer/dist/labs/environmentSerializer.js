/* eslint-disable @typescript-eslint/naming-convention */
import { Vector3 } from "core/Maths/math";
import { Tools } from "core/Misc/tools";
import { TextureCube } from "./texture";
/**
 * A static class proving methods to aid parsing Spectre environment files
 */
export class EnvironmentDeserializer {
    /**
     * Parses an arraybuffer into a new PBREnvironment object
     * @param arrayBuffer The arraybuffer of the Spectre environment file
     * @returns a PBREnvironment object
     */
    static Parse(arrayBuffer) {
        const environment = {
            //irradiance
            irradiancePolynomialCoefficients: {
                x: new Vector3(0, 0, 0),
                y: new Vector3(0, 0, 0),
                z: new Vector3(0, 0, 0),
                xx: new Vector3(0, 0, 0),
                yy: new Vector3(0, 0, 0),
                zz: new Vector3(0, 0, 0),
                yz: new Vector3(0, 0, 0),
                zx: new Vector3(0, 0, 0),
                xy: new Vector3(0, 0, 0),
            },
            //specular
            textureIntensityScale: 1.0,
        };
        //read .env
        const littleEndian = false;
        const magicBytes = [0x86, 0x16, 0x87, 0x96, 0xf6, 0xd6, 0x96, 0x36];
        const dataView = new DataView(arrayBuffer);
        let pos = 0;
        for (let i = 0; i < magicBytes.length; i++) {
            if (dataView.getUint8(pos++) !== magicBytes[i]) {
                Tools.Error("Not a Spectre environment map");
            }
        }
        const version = dataView.getUint16(pos, littleEndian);
        pos += 2;
        if (version !== 1) {
            Tools.Warn('Unsupported Spectre environment map version "' + version + '"');
        }
        //read json descriptor - collect characters up to null terminator
        let descriptorString = "";
        let charCode = 0x00;
        while ((charCode = dataView.getUint8(pos++))) {
            descriptorString += String.fromCharCode(charCode);
        }
        const descriptor = JSON.parse(descriptorString);
        const payloadPos = pos;
        //irradiance
        switch (descriptor.irradiance.type) {
            case "irradiance_sh_coefficients_9": {
                //irradiance
                const harmonics = descriptor.irradiance;
                EnvironmentDeserializer._ConvertSHIrradianceToLambertianRadiance(harmonics);
                //harmonics now represent radiance
                EnvironmentDeserializer._ConvertSHToSP(harmonics, environment.irradiancePolynomialCoefficients);
                break;
            }
            default:
                Tools.Error("Unhandled MapType descriptor.irradiance.type (" + descriptor.irradiance.type + ")");
        }
        //specular
        switch (descriptor.specular.type) {
            case "cubemap_faces": {
                const specularDescriptor = descriptor.specular;
                const specularTexture = (environment.specularTexture = new TextureCube(6408 /* PixelFormat.RGBA */, 5121 /* PixelType.UNSIGNED_BYTE */));
                environment.textureIntensityScale = specularDescriptor.multiplier != null ? specularDescriptor.multiplier : 1.0;
                const mipmaps = specularDescriptor.mipmaps;
                const imageType = specularDescriptor.imageType;
                for (let l = 0; l < mipmaps.length; l++) {
                    const faceRanges = mipmaps[l];
                    specularTexture.source[l] = [];
                    for (let i = 0; i < 6; i++) {
                        const range = faceRanges[i];
                        const bytes = new Uint8Array(arrayBuffer, payloadPos + range.pos, range.length);
                        switch (imageType) {
                            case "png": {
                                //construct image element from bytes
                                const image = new Image();
                                const src = URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
                                image.src = src;
                                specularTexture.source[l][i] = image;
                                break;
                            }
                            default:
                                Tools.Error("Unhandled ImageType descriptor.specular.imageType (" + imageType + ")");
                        }
                    }
                }
                break;
            }
            default:
                Tools.Error("Unhandled MapType descriptor.specular.type (" + descriptor.specular.type + ")");
        }
        return environment;
    }
    /**
     * Convert from irradiance to outgoing radiance for Lambertian BDRF, suitable for efficient shader evaluation.
     *	  L = (1/pi) * E * rho
     *
     * This is done by an additional scale by 1/pi, so is a fairly trivial operation but important conceptually.
     * @param harmonics Spherical harmonic coefficients (9)
     */
    static _ConvertSHIrradianceToLambertianRadiance(harmonics) {
        EnvironmentDeserializer._ScaleSH(harmonics, 1 / Math.PI);
        // The resultant SH now represents outgoing radiance, so includes the Lambert 1/pi normalisation factor but without albedo (rho) applied
        // (The pixel shader must apply albedo after texture fetches, etc).
    }
    /**
     * Convert spherical harmonics to spherical polynomial coefficients
     * @param harmonics Spherical harmonic coefficients (9)
     * @param outPolynomialCoefficents Polynomial coefficients (9) object to store result
     */
    static _ConvertSHToSP(harmonics, outPolynomialCoefficents) {
        const rPi = 1 / Math.PI;
        //x
        outPolynomialCoefficents.x.x = 1.02333 * harmonics.l11[0] * rPi;
        outPolynomialCoefficents.x.y = 1.02333 * harmonics.l11[1] * rPi;
        outPolynomialCoefficents.x.z = 1.02333 * harmonics.l11[2] * rPi;
        outPolynomialCoefficents.y.x = 1.02333 * harmonics.l1_1[0] * rPi;
        outPolynomialCoefficents.y.y = 1.02333 * harmonics.l1_1[1] * rPi;
        outPolynomialCoefficents.y.z = 1.02333 * harmonics.l1_1[2] * rPi;
        outPolynomialCoefficents.z.x = 1.02333 * harmonics.l10[0] * rPi;
        outPolynomialCoefficents.z.y = 1.02333 * harmonics.l10[1] * rPi;
        outPolynomialCoefficents.z.z = 1.02333 * harmonics.l10[2] * rPi;
        //xx
        outPolynomialCoefficents.xx.x = (0.886277 * harmonics.l00[0] - 0.247708 * harmonics.l20[0] + 0.429043 * harmonics.l22[0]) * rPi;
        outPolynomialCoefficents.xx.y = (0.886277 * harmonics.l00[1] - 0.247708 * harmonics.l20[1] + 0.429043 * harmonics.l22[1]) * rPi;
        outPolynomialCoefficents.xx.z = (0.886277 * harmonics.l00[2] - 0.247708 * harmonics.l20[2] + 0.429043 * harmonics.l22[2]) * rPi;
        outPolynomialCoefficents.yy.x = (0.886277 * harmonics.l00[0] - 0.247708 * harmonics.l20[0] - 0.429043 * harmonics.l22[0]) * rPi;
        outPolynomialCoefficents.yy.y = (0.886277 * harmonics.l00[1] - 0.247708 * harmonics.l20[1] - 0.429043 * harmonics.l22[1]) * rPi;
        outPolynomialCoefficents.yy.z = (0.886277 * harmonics.l00[2] - 0.247708 * harmonics.l20[2] - 0.429043 * harmonics.l22[2]) * rPi;
        outPolynomialCoefficents.zz.x = (0.886277 * harmonics.l00[0] + 0.495417 * harmonics.l20[0]) * rPi;
        outPolynomialCoefficents.zz.y = (0.886277 * harmonics.l00[1] + 0.495417 * harmonics.l20[1]) * rPi;
        outPolynomialCoefficents.zz.z = (0.886277 * harmonics.l00[2] + 0.495417 * harmonics.l20[2]) * rPi;
        //yz
        outPolynomialCoefficents.yz.x = 0.858086 * harmonics.l2_1[0] * rPi;
        outPolynomialCoefficents.yz.y = 0.858086 * harmonics.l2_1[1] * rPi;
        outPolynomialCoefficents.yz.z = 0.858086 * harmonics.l2_1[2] * rPi;
        outPolynomialCoefficents.zx.x = 0.858086 * harmonics.l21[0] * rPi;
        outPolynomialCoefficents.zx.y = 0.858086 * harmonics.l21[1] * rPi;
        outPolynomialCoefficents.zx.z = 0.858086 * harmonics.l21[2] * rPi;
        outPolynomialCoefficents.xy.x = 0.858086 * harmonics.l2_2[0] * rPi;
        outPolynomialCoefficents.xy.y = 0.858086 * harmonics.l2_2[1] * rPi;
        outPolynomialCoefficents.xy.z = 0.858086 * harmonics.l2_2[2] * rPi;
    }
    /**
     * Multiplies harmonic coefficients in place
     * @param harmonics Spherical harmonic coefficients (9)
     * @param scaleFactor Value to multiply by
     */
    static _ScaleSH(harmonics, scaleFactor) {
        harmonics.l00[0] *= scaleFactor;
        harmonics.l00[1] *= scaleFactor;
        harmonics.l00[2] *= scaleFactor;
        harmonics.l1_1[0] *= scaleFactor;
        harmonics.l1_1[1] *= scaleFactor;
        harmonics.l1_1[2] *= scaleFactor;
        harmonics.l10[0] *= scaleFactor;
        harmonics.l10[1] *= scaleFactor;
        harmonics.l10[2] *= scaleFactor;
        harmonics.l11[0] *= scaleFactor;
        harmonics.l11[1] *= scaleFactor;
        harmonics.l11[2] *= scaleFactor;
        harmonics.l2_2[0] *= scaleFactor;
        harmonics.l2_2[1] *= scaleFactor;
        harmonics.l2_2[2] *= scaleFactor;
        harmonics.l2_1[0] *= scaleFactor;
        harmonics.l2_1[1] *= scaleFactor;
        harmonics.l2_1[2] *= scaleFactor;
        harmonics.l20[0] *= scaleFactor;
        harmonics.l20[1] *= scaleFactor;
        harmonics.l20[2] *= scaleFactor;
        harmonics.l21[0] *= scaleFactor;
        harmonics.l21[1] *= scaleFactor;
        harmonics.l21[2] *= scaleFactor;
        harmonics.l22[0] *= scaleFactor;
        harmonics.l22[1] *= scaleFactor;
        harmonics.l22[2] *= scaleFactor;
    }
}
//# sourceMappingURL=environmentSerializer.js.map