export default function getFileFromChunks (chunks, meta) {
    const blobParts = [];
    chunks.forEach((c) => {
        const b = new Blob([c]);
        blobParts.push(b);
    });
    const blob = new Blob(blobParts,  { type: meta.type });
    const url = URL.createObjectURL(blob);
    return {url};
};