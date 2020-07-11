import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import styled from '@emotion/styled';
import { FileSelector } from "../files/modules";

import { FileSharedViewer, PeerCard } from './views';
import { Topbar, Footer } from "../common";
import file from "../files/views/file/previews/file";

const ShareWindowContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 15vmin 0;
    background-color: #0D47A1;
    .row {
      max-width: 900px;
    }
`;

export default ({
    myCode, peerCode, currentFile, isTransferring,
    filesReceived: filesReceivedProps, filesSent: filesSentProps,
    onSend, onDisconnect
}) => {

    const [filesQueued, setFilesQueued] = useState([]);
    const [filesReceived, setFilesReceived] = useState(filesReceivedProps ? filesReceivedProps : []);
    const [filesSent, setFilesSent] = useState(filesSentProps ? filesSentProps : []);

    // useBeforeunload(event => event.preventDefault());

    const isFileActive = (f) => f && f.status && !(f.status.state === 'sent' || f.status.state === 'received');
    const excludeFile = (file, files) => files.filter((f) => f.id !== file.id);

    const handleOnSelect = (files) => {
        setFilesQueued(filesQueued.length > 0 ? [...filesSent, ...files] : [...files])
    };

    useEffect(() => {
        if(filesQueued && filesQueued.length > 0 && !isFileActive(currentFile))
            onSend(filesQueued[0]);
    }, [filesQueued]);

    useEffect(() => {
        if(!isTransferring && filesQueued && filesQueued.length > 0 && !isFileActive(currentFile))
            onSend(filesQueued[0]);
    }, [isTransferring]);

    useEffect(() => {
        if(currentFile) {
            const newQ = excludeFile(currentFile, filesQueued);
            setFilesQueued([...newQ]);
        }
    }, [currentFile]);

    useEffect(() => {
        if(filesSentProps && filesSentProps.length !== filesSent.length)
            setFilesSent(filesSentProps);
    }, [filesSentProps]);

    useEffect(() => {
        if(filesReceivedProps && filesReceivedProps.length !== filesReceived.length)
            setFilesReceived(filesReceivedProps);
    }, [filesReceivedProps]);

    const getActiveQueue = () => {
        if(isFileActive(currentFile))
        {
            if(filesQueued.length > 0) {
                const newQ = excludeFile(currentFile, filesQueued);
                return [currentFile, ...newQ];
            }
            return [currentFile]
        }
        if(filesQueued.length > 0)
           return [...filesQueued];
        return [];
    };

    return <React.Fragment>
        <Topbar />
        <ShareWindowContainer>
            <div className="row mx-0 w-100">
                <div className="col-12 p-2">
                    <PeerCard code={peerCode} onDisconnect={onDisconnect} />
                </div>
                <div className="col p-2">
                    <FileSelector
                        onSelect={handleOnSelect}
                        queue={getActiveQueue()}
                    />
                </div>
                <div className="col-md-6 p-2">
                    <FileSharedViewer
                        filesReceived={filesReceived}
                        filesSent={filesSent}
                    />
                </div>
            </div>
        </ShareWindowContainer>
        <Footer hideInfoList />
    </React.Fragment>

}