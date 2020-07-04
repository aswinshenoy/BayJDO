import React, { useEffect, useState } from 'react';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';


import { getChunksFromFile, getFileFromChunks } from '../functions';

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

    useEffect(() => {
        import('peerjs').then(() => {
            const myName = uniqueNamesGenerator(nameGeneratorConfig);
            const peer =  myself ? myself : new Peer(myName, localConfig);

            peer.on('open', () => {
                setMyself(peer);
                setConnected(true);
            });

            peer.on('connection', (connection) => {
                setConnection(connection);
                setMyPeer(connection.peer);
                connection.on('open', () => {
                    setConnected(true);
                });
                connection.on('data', handleReceiveData);
                connection.on('close', () => {
                    cleanUp();
                });
            });

            peer.on('disconnected', () => {
                console.log("Peer disconnected");
                cleanUp()
            });

            peer.on('close', () => {
                console.log("Peer closed remotely");
                cleanUp()
            });

            peer.on('error', (error) => {
                console.log("peer error", error);
                cleanUp()
            });
        });
        return () => {
            cleanUp()
        }
    }, []);

    const addPeer = (peerID) => {
        const connection = myself.connect(peerID);
        setMyPeer(peerID);
        setConnection(connection);
        connection.on('open', () => {
            setConnected(true);
        });
        connection.on('data', handleReceiveData);
    };

    const [fileToSend, setFileToSend] = useState(null);
    const [fileChunkIndex, setFileChunkIndex] = useState(null);

    const sendFile = ({ id, file, url, meta }) => {
        const chunks = getChunksFromFile(file);

        setFileToSend({
            id,
            chunks,
            meta
        });

        // Send File Meta first
        // @todo include support for more file meta
        myConnection.send({
            id,
            type: "file_transfer_start",
            totalChunks: chunks.length,
            status: {
                state: 'sending',
                progress: 1,
            },
            meta
        });

    };

    useEffect(() => {
        console.log(fileChunkIndex);
        if (fileChunkIndex !== null) {
            console.log('send chunk', fileChunkIndex);
            myConnection.send({
                id: fileToSend.id,
                type: "file_transfer_chunk",
                index: fileChunkIndex,
                chunk: fileToSend.chunks[fileChunkIndex],
                totalChunks: fileToSend.chunks.length,
            });
            if(fileChunkIndex+1===fileToSend.chunks.length)
                setData({
                    ...fileToSend,
                    userRole: 'sender',
                    status: {
                        progress: 100,
                        state: 'sent',
                    }
                });
            else
                setData({
                    ...fileToSend,
                    userRole: 'sender',
                    status: {
                        progress: (fileChunkIndex/fileToSend.chunks.length)*100,
                        state: 'sending',
                    }
                });
        }
    }, [fileChunkIndex]);

    const [file, setFile] = useState([]);
    const [chunk, setChunk] = useState(null);

    const [hasReceivedFile, setReceivedFile] = useState(false);
    useEffect(() => {
        console.log('received file', file);
        if(hasReceivedFile && file && file.chunks && file.meta)
        {
            const resp = getFileFromChunks(file.chunks, file.meta);
            setData({
                ...resp,
                userRole: 'receiver',
                status: {
                    progress: 100,
                    state: 'received',
                }
            });
        }
    }, [hasReceivedFile]);


    useEffect(() => {
        if(chunk)
        {
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
                meta,
                userRole: 'receiver',
                status: {
                    state: 'receiving',
                    progress: (receiveIndex/file.totalChunks)*100
                }
            });
            setReceiveIndex(receiveIndex+1);
            console.log(file.totalChunks);
            if(receiveIndex+1 < file.totalChunks)
                myConnection.send({
                    id: file.id,
                    type: "file_chunk_request",
                    index: receiveIndex + 1,
                });
            else {
                setReceivedFile(true);
            }
            console.log('requested', receiveIndex + 1);
        } else if(chunk === false) {
            myConnection.send({
                id: file.id,
                type: "file_chunk_request",
                index: receiveIndex,
            });
        }
    }, [chunk]);

    const [receiveIndex, setReceiveIndex] = useState(0);
    const handleReceiveData = (data) => {
        if(data && data.type)
        {
            if(data.type === 'file_transfer_start')
            {
                setReceivedFile(false);
                setFile( {
                    ...file,
                    id: data.id,
                    meta: data.meta,
                    status: data.status,
                    chunks: [],
                    totalChunks: data.totalChunks,
                    complete: false,
                });
                setReceiveIndex(0);
                setChunk(false);
            } else if(data.type === 'file_chunk_request')
            {
                console.log('request got', data.index);
                setFileChunkIndex(data.index);
            }
            else if(data.type === 'file_transfer_chunk')
            {
               console.log('received chunk', data.index);
               setChunk(data);
            }
        }
    };

    return [
        myself,
        myPeer,
        addPeer,
        data,
        sendFile,
        cleanUp,
        isConnected
    ];
}