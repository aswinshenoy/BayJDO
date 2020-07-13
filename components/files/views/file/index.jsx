import React from 'react';
import styled from '@emotion/styled';
import prettyBytes from 'pretty-bytes';

import ImagePreview from './previews/image';
import VideoPreview from './previews/video';
import AudioPreview from './previews/audio';
import FilePreview from './previews/file';

import { getFileTypeFromMIME } from "../../../../functions";

const FilePreviewContainer = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  outline: 1px green;
  background: ${({progress}) => progress ? `linear-gradient(to right, rgba(118,255,3,0.4) ${progress}%, white ${progress}%)` : `white`};
`;

const SaveButton = styled.button`
  background: transparent;;
  color: #007bff;
  border: 1.5px solid;
  border-radius: 1.5rem;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  :focus, :hover {
    outline: none;
    background: #007bff;
    color: white;
  }
`;

export default ({ url, status: { progress, state, kbps }, meta, showSaveButton, onSave }) => {

    const renderStateText =
    state === 'processing' ? <span className="text-success font-weight-bold">Processing</span> :
    state === 'queued' ? <span className="text-success font-weight-bold">Queued</span> :
    state === 'sent' ? <span className="text-success font-weight-bold">Sent</span> :
    state === 'received' ? <span className="text-success font-weight-bold">Received</span> :
    state === 'sending' ? <span className="text-success font-weight-bold">Sending {kbps && `at ${kbps} KB/s`}</span> :
    state === 'receiving' ? <span className="text-success font-weight-bold">Receiving {kbps && `at ${kbps} KB/s`}</span> :
    state === 'failed' ? <span className="text-danger font-weight-bold">Failed</span>:
    <span className="text-danger font-weight-bold"> Unknown Error </span>;

    const renderSaveButton = showSaveButton ?
    <SaveButton
        role="button"
        title="Save to Device"
        aria-label="Save File to Device"
        onClick={onSave}
    >
        <i  className="gg-software-download" />
        <span className="pl-1">Save</span>
    </SaveButton>
    : null;

    const isTransferred = state === 'received' || state === 'sent';

    const renderPreview = () => {
        const type = getFileTypeFromMIME(meta.type);
        if(type === 'audio') return <AudioPreview isTransferred={isTransferred} url={url} meta={meta} />;
        if(type === 'video') return <VideoPreview isTransferred={isTransferred} url={url} meta={meta} />;
        if(type === 'image') return <ImagePreview url={url} meta={meta} />;
        return <FilePreview url={url} meta={meta} />
    };

    const renderTransferSize = () => {
        if(meta && meta.size) {
            if(progress && progress < 100)
                return <span>{prettyBytes(meta.size*(progress/100))} / {prettyBytes(meta.size)}</span>;
            return <span>{prettyBytes(meta.size)}</span>
        }
        return <span> -- / -- </span>;
    };

    return <FilePreviewContainer
        progress={(state === 'sending' || state === 'receiving' )? progress : null}
        className="shadow"
    >
        {renderPreview()}
        <div className="row mx-0 mt-2 w-100">
            <div className="col p-2 d-flex align-items-center">
                <div>
                    <span>{renderStateText}</span>
                    <span className="d-inline-block px-1">{renderTransferSize()}</span>
                </div>
            </div>
            <div className="col-6 p-2 mx-0 align-items-center justify-content-end d-flex">
                {renderSaveButton}
            </div>
        </div>
    </FilePreviewContainer>
}