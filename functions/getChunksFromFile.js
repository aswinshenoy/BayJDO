export default async function getChunksFromFile(file, chunkSize = 6 * 1024 * 1024) {
    return await file.arrayBuffer().then((buffer) => {
        let chunks = [];
        while(buffer.byteLength) {
            chunks.push(buffer.slice(0, chunkSize));
            buffer = buffer.slice(chunkSize, buffer.byteLength);
        }
        return chunks;
    });
};
