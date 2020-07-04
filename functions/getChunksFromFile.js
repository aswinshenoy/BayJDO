export default function getChunksFromFile(file, chunkSize = 100) {
    let chunks = [];
    let byteIndex = 0;
    console.log(file);

    for (let i = 0; i < chunkSize; i += 1) {
        let byteEnd = Math.ceil((file.size / chunkSize) * (i + 1));
        chunks.push(file.slice(byteIndex, byteEnd));
        byteIndex += (byteEnd - byteIndex);
    }

    return chunks;
};
