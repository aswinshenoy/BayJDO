import React, {useEffect, useState} from 'react';

import {usePeer} from "../../hooks";

import { LandingPage } from '../landing';
import { FileShare } from '../share';
import {Credits} from "../common";

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
        cleanUp();
        setFilesReceived([]);
        setFilesSent([]);
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
    <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center text-center">
        <div>
            <div className="fixed-top my-3 text-center">
                <div className="d-inline-block bg-white p-2 rounded">
                    <img
                        className="w-100 p-2 rounded"
                        style={{ width: '50vw', maxWidth: '220px' }}
                        alt="bayjdo_logo"
                        src={require('../../images/brand/logo_color.png')}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mb-2">
                <i className="gg-spinner" />
            </div>
            <h4>Establishing Connection with Server</h4>
            <p style={{ maxWidth: '400px' }}>
                We are currently on a trial-run on a light-weight server,
                and therefore, we have limit on the number of concurrent
                connections possible. If you face issues, please try again later.
                We are extremely sorry for the inconvenience.
            </p>
            <div className="my-3 fixed-bottom text-center">
                <Credits />
            </div>
        </div>
    </div>;

}