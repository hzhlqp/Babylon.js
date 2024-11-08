import { TextureTools } from "core/Misc/textureTools";
/**
 * Helper class for retrieving texture data.
 */
export class TextureHelper {
    /**
     * Gets the data of the specified texture by rendering it to an intermediate RGBA texture and retrieving the bytes from it.
     * This is convienent to get 8-bit RGBA values for a texture in a GPU compressed format.
     * @param texture the source texture
     * @param width the width of the result, which does not have to match the source texture width
     * @param height the height of the result, which does not have to match the source texture height
     * @param face if the texture has multiple faces, the face index to use for the source
     * @param channels a filter for which of the RGBA channels to return in the result
     * @param globalState the global state to use for rendering the texture
     * @param lod if the texture has multiple LODs, the lod index to use for the source
     * @returns the 8-bit texture data
     */
    static async GetTextureDataAsync(texture, width, height, face, channels, globalState, lod = 0) {
        if (globalState) {
            globalState.blockMutationUpdates = true;
        }
        try {
            const data = await TextureTools.GetTextureDataAsync(texture, width, height, face, lod);
            if (!channels.R || !channels.G || !channels.B || !channels.A) {
                for (let i = 0; i < width * height * 4; i += 4) {
                    // If alpha is the only channel, just display alpha across all channels
                    if (channels.A && !channels.R && !channels.G && !channels.B) {
                        data[i] = data[i + 3];
                        data[i + 1] = data[i + 3];
                        data[i + 2] = data[i + 3];
                        data[i + 3] = 255;
                        continue;
                    }
                    let r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
                    // If alpha is not visible, make everything 100% alpha
                    if (!channels.A) {
                        a = 255;
                    }
                    // If only one color channel is selected, map both colors to it. If two are selected, the unused one gets set to 0
                    if (!channels.R) {
                        if (channels.G && !channels.B) {
                            r = g;
                        }
                        else if (channels.B && !channels.G) {
                            r = b;
                        }
                        else {
                            r = 0;
                        }
                    }
                    if (!channels.G) {
                        if (channels.R && !channels.B) {
                            g = r;
                        }
                        else if (channels.B && !channels.R) {
                            g = b;
                        }
                        else {
                            g = 0;
                        }
                    }
                    if (!channels.B) {
                        if (channels.R && !channels.G) {
                            b = r;
                        }
                        else if (channels.G && !channels.R) {
                            b = g;
                        }
                        else {
                            b = 0;
                        }
                    }
                    data[i] = r;
                    data[i + 1] = g;
                    data[i + 2] = b;
                    data[i + 3] = a;
                }
            }
            //To flip image on Y axis.
            if (texture.invertY || texture.isCube) {
                const numberOfChannelsByLine = width * 4;
                const halfHeight = height / 2;
                for (let i = 0; i < halfHeight; i++) {
                    for (let j = 0; j < numberOfChannelsByLine; j++) {
                        const currentCell = j + i * numberOfChannelsByLine;
                        const targetLine = height - i - 1;
                        const targetCell = j + targetLine * numberOfChannelsByLine;
                        const temp = data[currentCell];
                        data[currentCell] = data[targetCell];
                        data[targetCell] = temp;
                    }
                }
            }
            return data;
        }
        finally {
            if (globalState) {
                globalState.blockMutationUpdates = false;
            }
        }
    }
}
//# sourceMappingURL=textureHelper.js.map