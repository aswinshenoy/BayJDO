import { Blob } from 'blob-polyfill';

export default class FileChunker {

    constructor({ file }) {
        this._chunkSize = 5 * 1024 * 1024; // Size of each chunk
        this._file = file;
        this._offset = 0; // Byte Offset, used for slicing subsequent parts
        this.totalChunks = Math.ceil(file.size / this._chunkSize); // total number of chunks
    }

    _getNextSlice = async () => {
        const slice = this._file.slice(
            this._offset,
            this._offset + this._chunkSize
        );
        return await new Blob([slice]).arrayBuffer().then((buffer) => buffer);
    };

    nextChunk = async () => await this._getNextSlice().then((chunk) => {
        this._offset += chunk.byteLength;
        return chunk;
    });

    hasNextPart = () =>  this._offset < this._file.size;

}