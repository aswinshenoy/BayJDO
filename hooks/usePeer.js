import { useEffect, useState } from 'react';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { throwToast } from '../functions';
import { getFileFromChunks, FileChunker } from '../functions';

const prodConfig = {
    host: 'bayjdo.com',
    secure: true,
    port: 443,
    path: '/signaller',
    debug: 1
};

/* const prodConfig = {
     host: '10.0.0.9',
     secure: false,
     port: 9000,
     path: '/myapp',
     debug: 0
 };*/

const nameGeneratorConfig = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
};

export default function usePeer() {

    const [myself, setMyself] = useState(null);
    const [myPeer, setMyPeer] = useState(null);
    const [data, setData] = useState(null);
    const [isConnected, setConnected] = useState(false);
    const [myConnection, setConnection] = useState(null);

    const cleanUp = () => {
        setMyPeer(null);
        setConnection(null);
        setConnected(false);
    };

    const disconnect = () => {
        myConnection.send({ type: "disconnect" });
        cleanUp();
        throwToast("success", `You have been disconnected from ${myPeer.id}.`);
    };

    const handlePeerOpen = (peer) => {
        setMyself(peer);
        setConnected(true);
    };

    const handlePeerConnection = (connection) => {
        setConnection(connection);
        setMyPeer(connection.peer);
        connection.on('open', () => {
            setConnected(true);
            throwToast("success", `You are now connected to ${connection.peer.id}`);
        });
        connection.on('data', handleReceiveData);
        connection.on('close', cleanUp);
    };

    const handlePeerDisconnect = () => {
        console.log("Peer disconnected");
        cleanUp()
    };

    const handlePeerClose = () => {
        console.log("Peer closed remotely");
        cleanUp();
    };

    const handlePeerError = (error) => {
        console.log("peer error", error);
        cleanUp();
    };


    useEffect(() => {
        import('peerjs').then(() => {
            const myName = uniqueNamesGenerator(nameGeneratorConfig);
            const peer =  myself ? myself : new Peer(myName, prodConfig);

            peer.on('open', () => handlePeerOpen(peer));
            peer.on('connection', handlePeerConnection);
            peer.on('disconnected', handlePeerDisconnect);
            peer.on('close', handlePeerClose);
            peer.on('error', handlePeerError);
        });
        return () => {
            cleanUp()
        }
    }, []);

    const connectToPeer = (peerID) => {
        const connection = myself.connect(peerID);
        setMyPeer(peerID);
        setConnection(connection);
        connection.on('open', () => {
            setConnected(true);
            throwToast("success", `You are now connected to ${peerID}`);
        });
        connection.on('data', handleReceiveData);
    };

    const [fileToSend, setFileToSend] = useState(null);
    const [fileChunkIndex, setFileChunkIndex] = useState(null);

    const _startFileTransfer = (id, totalChunks, meta) => myConnection.send({
        id, meta, totalChunks, type: "file_transfer_start",
        status: { state: 'sending', progress: 1 },
    });
    const _sendFileChunk = async ({ id, meta, chunker }, index) => {
        chunker.nextChunk().then((chunk) => myConnection && myConnection.send({
            id, index, chunk, totalChunks: chunker.totalChunks, meta,
            type: "file_transfer_chunk",
        }));
    };
    const _cancelFileTransfer = (id) => myConnection.send({ id, type:"file_transfer_cancel" });

    const transferFile = ({ id, file, url, meta }) => {
        setData({
            id,
            url,
            userRole: 'sender',
            status: { state: "processing", },
            meta
        });
        const chunker = new FileChunker({ file });
        setFileChunkIndex(null);
        setFileToSend({
            id,
            url,
            totalChunks: chunker.totalChunks,
            chunker,
            meta
        });
        // Send File Meta first
        _startFileTransfer(id, chunker.totalChunks, meta);
    };

    const stopDownload = () => window.writer.abort();

    const resetTransfer = () => {
        // Stop download if StreamSaver is used
        if(window.writer) stopDownload();
        setFileChunkIndex(null);
        setFileToSend(null);
        setReceiveIndex(0);
        setReceivedFile(null);
        setFile(null);
        setChunk(null);
        setData(null);
    };

    const cancelTransfer = ({ id }) => {
        _cancelFileTransfer(id);
        resetTransfer();
    };

    useEffect(() => {
        if (fileChunkIndex !== null && fileToSend !== null) {
            _sendFileChunk(fileToSend, fileChunkIndex).then(() => {
                setData((data) => {
                    return {
                        ...fileToSend,
                        ...data,
                        userRole: 'sender',
                        status: {progress: (fileChunkIndex / fileToSend.chunker.totalChunks) * 100, state: 'sending'}
                    }
                });
            });
        }
    }, [fileChunkIndex]);

    const [file, setFile] = useState({});
    const [chunk, setChunk] = useState(null);
      

    const _sendFileReceipt = ({ id, meta }) => (id && myConnection) &&
        myConnection.send({ id, type: "file_receipt", meta });
    const _requestForFileChunk = (id, index) => (id && myConnection) &&
        myConnection.send({ id, index, type: "file_chunk_request" });

    const [hasReceivedFile, setReceivedFile] = useState(false);

    useEffect(() => {
        if(hasReceivedFile && file && file.chunks && file.meta)
        {
            const temp = {
                    meta:file.meta,
                    status: {progress: 100, state: 'received',}
            };
            const resp = file.useStream? temp : getFileFromChunks(file.chunks, file.meta);
            _sendFileReceipt(file);
            setData({
                ...resp,
                id: file.id,
                userRole: 'receiver',
                status: {
                    progress: 100,
                    state: 'received',
                },
                timestamp: new Date().getTime(),
                useStream: file.useStream
            });
        }
    }, [hasReceivedFile]);


    const [receiveIndex, setReceiveIndex] = useState(0);

    // handle requesting & receiving file
    useEffect(() => {
        if(chunk === false)
            _requestForFileChunk(file && file.id, receiveIndex);
        else if(chunk && file) {
            getChunkProcessor()();
            handleAfterReceive();
        }
    }, [chunk]);

    const writeWithStreams = () => {
        let _chunk = new Uint8Array(chunk.chunk);
        writer.write(_chunk).then(() => {
            // Release the references, sit back, and let the Garbage Collector do its job.
            _chunk = null;
            chunk.chunk = null;
        }); 
    };

    const storeInMemory = () => {
        let dataChunks = [];
        if(file && file.chunks)
            dataChunks = [...file.chunks];
        dataChunks[chunk.index] = chunk.chunk;
        setFile({
            ...file,
            id: chunk.id,
            ...(dataChunks && {chunks: dataChunks}),
            meta : chunk.meta ? chunk.meta : file.meta
        });
    };

    const getChunkProcessor = () => file.useStream? writeWithStreams : storeInMemory;

    const handleAfterReceive = () => {
        const meta = chunk.meta ? chunk.meta : file.meta;      
        setData({
            id: chunk.id,
            meta,
            userRole: 'receiver',
            status: {
                state: 'receiving',
                progress: (file && file.totalChunks ? (receiveIndex/file.totalChunks)*100 : 0)
            }
        });
        if(receiveIndex+1 < file.totalChunks)
            _requestForFileChunk(file.id, receiveIndex+1);
        else {
            setReceivedFile(true);
            if(file.useStream) writer.close();
        }
        setReceiveIndex(receiveIndex+1);
    };

    const createChunkWriter = file => {
        /* Because of SSR, ensure streamSaver is loaded on client side. On the server, window === undefined !!
           StreamSaver.js uses window object internally. 
        */
        const streamSaver =  require("streamsaver");
   
        /* Initialize a Write Stream so that we can send incoming chunks directly to the disk instead of
          holding them in memory. 
        */
        window.writer = streamSaver.createWriteStream(file.meta.name, {size:file.meta.size}).getWriter();
        // Binding writer to window is akin to creating a global object. 
        // Cannot use local variable since everything will reset when react redraws this component.

        // Ensure that download is cancelled if user abruptly closes the window
        window.onunload = () => stopDownload();
     };

    const handleReceiveNewFile = (file) => {
        setReceivedFile(false);
        setReceiveIndex(0);
        /* 
        Conditionally switch to using WriteStream if file size > 50MB
        */
        const switchSize = 50 * 1024 * 1024;
        const _useStream = file.meta.size > switchSize;

        if(_useStream) createChunkWriter(file);

        setFile( {
            id: file.id,
            meta: file.meta,
            status: file.status,
            chunks: [],
            totalChunks: file.totalChunks,
            complete: false,
            useStream: _useStream
        });
        setChunk(false);
    };

    const handleCancelTransfer = () => {
        throwToast("error", `File transfer cancelled`);
        resetTransfer();
    };

    const handleReceiveData = (data) => {
        if(data && data.type)
        {
            // receive new file
            if(data.type === 'file_transfer_start')
                handleReceiveNewFile(data);
            if(data.type === 'file_transfer_cancel')
                handleCancelTransfer(data);
            // process request for the next chunk
            else if(data.type === 'file_chunk_request')
                setFileChunkIndex(data.index);
            // send a new (/next) chunk
            else if(data.type === 'file_transfer_chunk')
               setChunk(data);
            // confirmation receipt for file transfer
            else if(data.type === 'file_receipt')
            {
                setData((data) => {
                    return {
                        ...data,
                        status: {progress: 100, state: 'sent'},
                        timestamp: new Date().getTime(),
                    };
                });
            }
            // disconnection request
            else if(data.type === 'disconnect')
            {
                throwToast("error", `Your peer left.`);
                cleanUp();
            }

        }
    };

    return [{
        myself,
        myPeer,
        data,
        isConnected,
        connectToPeer,
        disconnect,
        transferFile,
        cancelTransfer,
    }];
}
