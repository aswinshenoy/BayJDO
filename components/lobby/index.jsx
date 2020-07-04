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
        cleanUp,
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
            } else {
                setCurrentFile(data);
            }
        } else if (data && data.userRole && data.userRole === 'receiver')
        {
            if(data.status.state === 'received')
            {
                setFilesReceived(filesReceived.length > 0 ? [...filesReceived, data] : [data]);
                setCurrentFile(null);
            } else {
                setCurrentFile(data);
            }
        }
    }, [data]);

    const handleUpload = (file) => {
        console.log(file);
        setCurrentFile(currentFile);
        sendFile(file)
    };

    const handleDisconnect = () => {
        cleanUp();
    };

    return myself ? <div>
        {myPeer === null ? <LandingPage myCode={myself.id} onConnect={(data) => addPeer(data)} /> :
            isConnected ?
            <FileShare
                myCode={myself.id}
                peerCode={myPeer}
                currentFile={currentFile}
                filesReceived={filesReceived}
                filesSent={filesSent}
                onSend={handleUpload}
                onDisconnect={handleDisconnect}
            /> :
            <div>Connecting to Peer</div>
        }
    </div> :
    <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <div>
            <div className="d-flex justify-content-center mb-2">
                <i className="gg-spinner" />
            </div>
            <h4>Establishing Connection with RTC Server</h4>
        </div>
    </div>;

}