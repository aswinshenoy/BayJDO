import React from 'react';

import { FilePreview } from '../../views/'

export default ({ fileData, showSaveButton, showCancelButton, onCancel }) => {

    const handleDownload = () => {
        const tempLink = document.createElement('a');
        tempLink.href = fileData.url;
        tempLink.setAttribute('download', fileData.meta.name);
        tempLink.click();
    };

    return <div>{fileData?
        <FilePreview
            {...fileData}
            onSave={handleDownload}
            showSaveButton={showSaveButton}
            showCancelButton={showCancelButton}
            onCancel={() => onCancel(fileData.id)}
        />
        : <div>
            <div>File Damaged. Ask to Resend</div>
        </div>
    }</div>;
}