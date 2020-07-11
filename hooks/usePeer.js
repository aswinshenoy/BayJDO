import React, { useEffect, useState } from 'react';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { toast } from 'react-toastify';


import { getChunksFromFile, getFileFromChunks } from '../functions';

const prodConfig = {
    host: '/',
    secure: true,
    port: 443,
    path: '/signaller',
    debug: 1
};

const localConfig = {
    host: '192.168.43.88',
    secure: false,
    port: 9000,
    path: '/myapp',
    debug: 0
};

const nameGeneratorConfig = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
};

const throwToast = (type, message) => {
    const config = {
        autoClose: 1000, hideProgressBar: true, closeButton: false,
        position: toast.POSITION.BOTTOM_CENTER,
    };
    if(type === 'error') toast.error(message, config);
    else if(type === 'success') toast.success(message, config);
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
    const _sendFileChunk = ({ id, meta, chunks }, index) => myConnection.send({
        id, index, chunk: chunks[index], totalChunks: chunks.length, meta,
        type: "file_transfer_chunk",
    });

    const sendFile = async ({ id, file, url, meta }) => {
        const chunks = await getChunksFromFile(file);
        setFileChunkIndex(null);
        setData(null);
        setFileToSend({
            id,
            url,
            chunks,
            meta
        });
        // Send File Meta first
        _startFileTransfer(id, chunks.length, meta)
    };

    useEffect(() => {
        if (fileChunkIndex !== null) {
            _sendFileChunk(fileToSend, fileChunkIndex);
            setData((data) => { return {
                ...fileToSend,
                ...data,
                userRole: 'sender',
                status: { progress: (fileChunkIndex/fileToSend.chunks.length)*100, state: 'sending' }
            }});
        }
    }, [fileChunkIndex]);

    const [file, setFile] = useState([]);
    const [chunk, setChunk] = useState(null);

    const _sendFileReceipt = ({ id, meta }) => myConnection.send({ id, type: "file_receipt", meta });
    const _requestForFileChunk = (id, index) => myConnection.send({ id, index, type: "file_chunk_request" });

    const [hasReceivedFile, setReceivedFile] = useState(false);
    useEffect(() => {
        if(hasReceivedFile && file && file.chunks && file.meta)
        {
            const resp = getFileFromChunks(file.chunks, file.meta);
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
            });
        }
    }, [hasReceivedFile]);


    const [receiveIndex, setReceiveIndex] = useState(0);

    // handle requesting & receiving file
    useEffect(() => {
        if(chunk === false)
            _requestForFileChunk(file.id, receiveIndex);
        else if(chunk) {
            let dataChunks = [];
            if(file && file.chunks)
                dataChunks = [...file.chunks];
            dataChunks[chunk.index] = chunk.chunk;
            const meta = chunk.meta ? chunk.meta : file.meta;
            setFile({
                ...file,
                id: chunk.id,
                chunks: dataChunks,
                meta,
            });
            setData({
                id: chunk.id,
                meta,
                userRole: 'receiver',
                status: {
                    state: 'receiving',
                    progress: (receiveIndex/file.totalChunks)*100
                }
            });
            if(receiveIndex+1 < file.totalChunks)
                _requestForFileChunk(file.id, receiveIndex+1);
            else setReceivedFile(true);
            setReceiveIndex(receiveIndex+1);
        }
    }, [chunk]);


    const handleReceiveNewFile = (file) => {
        setReceivedFile(false);
        setReceiveIndex(0);
        setChunk(false);
        setFile( {
            id: file.id,
            meta: file.meta,
            status: file.status,
            chunks: [],
            totalChunks: file.totalChunks,
            complete: false,
        });
    };

    const handleReceiveData = (data) => {
        if(data && data.type)
        {
            // receive new file
            if(data.type === 'file_transfer_start')
                handleReceiveNewFile(data);
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

    return [
        myself,
        myPeer,
        data,
        connectToPeer,
        sendFile,
        disconnect,
        isConnected
    ];
}