import React, {useEffect, useState} from 'react';

import {usePeer} from "../../hooks";

import { LandingPage } from '../landing';
import { FileShare } from '../share';


export default ({ }) => {
    const [
        myself,
        myPeer,
        addPeer,
        data,
        sendFile,
        disconnect,
        isConnected,
    ] = usePeer();

    const [filesReceived, setFilesReceived] = useState([]);
    const [filesSent, setFilesSent] = useState([]);

    const [currentFile, setCurrentFile] = useState(null);

    useEffect(() => {
        if(data && data.userRole && data.userRole === 'sender')
        {
            if(data.status.state === 'sent')
            {
                setFilesSent(filesSent.length > 0 ? [...filesSent, data] : [data]);
                setCurrentFile(null);
            } else setCurrentFile(data);
        } else if (data && data.userRole && data.userRole === 'receiver')
        {
            if(data.status.state === 'received')
            {
                setFilesReceived(filesReceived.length > 0 ? [...filesReceived, data] : [data]);
                setCurrentFile(null);
            } else setCurrentFile(data);
        }
    }, [data]);

    const handleUpload = (file) => {
        setCurrentFile(currentFile);
        sendFile(file)
    };

    const handleDisconnect = () => {
        disconnect();
        setFilesReceived([]);
        setFilesSent([]);
    };


    return isConnected && myPeer ?
    <FileShare
        myCode={myself.id}
        peerCode={myPeer}
        currentFile={currentFile}
        filesReceived={filesReceived}
        filesSent={filesSent}
        onSend={handleUpload}
        onDisconnect={handleDisconnect}
    /> :
    <LandingPage
        isLoading={!(myself && myself.id)}
        myCode={myself && myself.id}
        onConnect={(data) => addPeer(data)}
    />;


}