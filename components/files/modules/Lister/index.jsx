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
      filter: drop-shadow(1px 2px 5px rgba(0,0,0,0.5));
    }
    h4 {
      margin-top: 1rem;
      margin-bottom: 2rem;
      font-weight: 600;
      font-size: calc(1rem + 0.25vw);
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

    console.log(files);

    return files && files instanceof Array && files.length > 0 ?
    <div>
    {files.map((f) =>
        <div key={f.id} className="p-2">
            <FileViewer
                showSaveButton={showSaveButton}
                fileData={f}
            />
        </div>
    )}
    </div> :
    <EmptyListContainer>
        <div>
            <img src={require('../../../../images/illustrations/empty.png')} alt={labels.noFilesShared} />
            <h4>{labels.noFilesShared}</h4>
        </div>
    </EmptyListContainer>
}