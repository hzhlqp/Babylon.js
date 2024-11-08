/**
 * Utility class for reading from a data buffer
 */
export declare class DataReader {
    /**
     * The current byte offset from the beginning of the data buffer.
     */
    get byteOffset(): number;
    private _dataView;
    private _dataByteOffset;
    /**
     * Constructor
     * @param buffer The buffer to set
     * @param byteOffset The starting offset in the buffer
     * @param byteLength The byte length of the buffer
     */
    constructor(buffer: ArrayBuffer | ArrayBufferView, byteOffset?: number, byteLength?: number);
    /**
     * Read a unsigned 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readUint8(): number;
    /**
     * Read a signed 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readInt8(): number;
    /**
     * Read a unsigned 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readUint16(): number;
    /**
     * Read a signed 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readInt16(): number;
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint32(): number;
    /**
     * Read a signed 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readInt32(): number;
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint64(): number;
    /**
     * Read a byte array from the currently loaded data range.
     * @param byteLength The byte length to read
     * @returns The byte array read
     */
    readUint8Array(byteLength: number): Uint8Array;
    /**
     * Skips the given byte length the currently loaded data range.
     * @param byteLength The byte length to skip
     * @returns This instance
     */
    skipBytes(byteLength: number): this;
}
