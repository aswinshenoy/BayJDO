import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import FileViewer from '../Viewer';

const EmptyListContainer = styled.div`
    min-height: 15vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 120px;
      max-width: 100%;
      padding: 1.5rem;
    }
    h4 {
      margin-top: 1rem;
      margin-bottom: 2rem;
      font-size: calc(1.2rem + 0.5vw);
    }
`;

const defaultLabels = {
    noFilesShared: 'No Files Shared.'
};

export default ({ files: filesProp, labels: labelsProp, showSaveButton }) => {

    const [files, setFiles] = useState(filesProp);

    const labels = {...defaultLabels, ...labelsProp};

    useEffect(() => {
        setFiles(filesProp);
    }, [filesProp]);

    return typeof files === 'object' && files.length > 0 ? <div>{
        files.map((f) => <div key={f.id} className="p-2"><FileViewer showSaveButton={showSaveButton} fileData={f} /></div>)
    }</div> :
    <EmptyListContainer>
        <div>
            <img src={require('../../../../images/illustrations/empty.png')} alt={labels.noFilesShared} />
            <h4>{labels.noFilesShared}</h4>
        </div>
    </EmptyListContainer>
}