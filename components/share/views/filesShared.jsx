import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FileLister } from '../../files'


const FileSharedTabs = styled.div`
     background-color: #eee;
     max-width: 450px;
     height: 100%;
     border-radius: 0.5rem;
`;

const TabSelectorWrap = styled.div`
   display: flex;
   background: white;
   border-top-left-radius: 1rem;
   border-top-right-radius: 1rem;
   padding: 0.5rem;
   button {
      width: 50%;
      border-radius: 0.5rem;
      background-color: #007bff;
      color: white;
      font-size: 1.3rem;
      padding: 1rem;
      border: none;
      margin: 0.25rem;
      :focus, :hover{
        outline: none;
      }
   }
   .active {
      background-color: #FFD600;
      font-weight: 600;
      color: black;
   }
`;

const TabContainer = styled.div`
  background-color: #eee;
`;

export default ({ filesReceived, filesSent }) => {

    const [showFilesSent, setShowFilesSent] = useState(false);

    const filesSentCount = filesSent && filesSent.length > 0 ? filesSent.length : 0;
    const filesReceivedCount = filesReceived && filesReceived.length > 0 ? filesReceived.length : 0;

    const sortFiles = (files) => files.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);

    return <FileSharedTabs>
        <TabSelectorWrap>
            <button className={!showFilesSent?'active':null} onClick={() => setShowFilesSent(false)}>
                Received ({filesReceivedCount})
            </button>
            <button className={showFilesSent?'active':null} onClick={() => setShowFilesSent(true)}>
                Sent ({filesSentCount})
            </button>
        </TabSelectorWrap>
        <TabContainer>
            { showFilesSent ?
                <FileLister labels={{ noFilesShared: "No files sent." }} files={sortFiles(filesSent)} /> :
                <FileLister showSaveButton labels={{ noFilesShared: "No files received." }} files={sortFiles(filesReceived)} />
            }
        </TabContainer>

    </FileSharedTabs>
}