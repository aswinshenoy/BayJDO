import React, {useEffect, useState} from 'react';

import {usePeer} from "../../hooks";

import { LandingPage } from '../landing';
import { FileShare } from '../share';


export default ({ }) => {
    const [{
        myself,
        myPeer,
        isConnected,
        data,
        connectToPeer,
        disconnect,
        transferFile,
        cancelTransfer
    }] = usePeer();

    // Files that were received by the user in the current session
    const [filesReceived, setFilesReceived] = useState([]);
    // Files that were sent by the user in the current session
    const [filesSent, setFilesSent] = useState([]);
    // The current / last file that was being transferred from/to the user
    const [currentFile, setCurrentFile] = useState(null);

    const isFileTransferring = (f) => f && f.status && !(f.status.state === 'sent' || f.status.state === 'received');

    useEffect(() => {
        // if the user currently is sending a file
        if(data && data.userRole && data.userRole === 'sender')
        {
            setCurrentFile(data);
            if(data.status.state === 'sent')
                setFilesSent(filesSent.length > 0 ? [...filesSent, data] : [data]);
        }
        // if the user currently is receiving a file
        else if (data && data.userRole && data.userRole === 'receiver')
        {
            setCurrentFile(data);
            if(data.status.state === 'received')
                setFilesReceived(filesReceived.length > 0 ? [...filesReceived, data] : [data]);
        }
        // if the data is null, its likely that the transfer has been cancelled.
        else if (data == null){
            setCurrentFile(null);
        }
    }, [data]);


    const handleSend = (file) => {
        if (!isFileTransferring(currentFile))
        {
            setCurrentFile(file);
            transferFile(file)
        } else {
            console.log('already sending');
        }
    };

    const handleCancel = (id) => {
        if(isFileTransferring(currentFile)) {
            setCurrentFile(null);
            cancelTransfer(id);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setCurrentFile(null);
        setFilesReceived([]);
        setFilesSent([]);
    };

    return isConnected && myPeer ?
    <FileShare
        myCode={myself.id}
        peerCode={myPeer}
        isTransferring={isFileTransferring(currentFile)}
        currentFile={currentFile}
        filesReceived={filesReceived}
        filesSent={filesSent}
        onSend={handleSend}
        onCancel={handleCancel}
        onDisconnect={handleDisconnect}
    /> :
    <LandingPage
        isLoading={!(myself && myself.id)}
        myCode={myself && myself.id}
        onConnect={(code) => connectToPeer(code)}
    />;

}