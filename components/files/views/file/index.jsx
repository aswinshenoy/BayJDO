import React from 'react';
import prettyBytes from 'pretty-bytes';
import styled from '@emotion/styled';

import ImagePreview from './previews/image';
import VideoPreview from './previews/video';
import FileTypeIcon from './previews/icon';

const FilePreviewContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  outline: 1px green;
  background: ${({progress}) => progress ? `linear-gradient(to right, rgba(118,255,3,0.4) ${progress}%, white ${progress}%)` : `white`};
  img {
    background-color: rgba(0,0,0,0.4);
  }
`;

export default ({ url, status: { progress, state, kbps }, meta: { name, size, type }, showSaveButton, onSave }) => {

    const ImagePattern = /image-*/;
    const VideoPattern = /video-*/;

    const isFileImage = (type) => type.match(ImagePattern);
    const isFileVideo = (type) => type.match(VideoPattern);

    const renderStateText = state === 'queued' ? <span className="text-success font-weight-bold">Queued</span> :
    state === 'sent' ? <span className="text-success font-weight-bold">Sent</span> :
    state === 'received' ? <span className="text-success font-weight-bold">Received</span> :
    state === 'sending' ? <span className="text-success font-weight-bold">Sending {kbps && `at ${kbps} KB/s`}</span> :
    state === 'receiving' ? <span className="text-success font-weight-bold">Receiving {kbps && `at ${kbps} KB/s`}</span> :
    state === 'failed' ? <span className="text-danger font-weight-bold">Failed</span>:
    <span className="text-danger font-weight-bold"> Unknown Error </span>;


    return <FilePreviewContainer
        progress={(state === 'sending' || state === 'receiving' )? progress : null}
        className="row mx-0"
    >
        <div className="col-4 px-2">{ url &&
            isFileImage(type) ? <ImagePreview url={url} altText={name} /> :
            isFileVideo(type) ? <VideoPreview url={url} type={type} /> :
            <FileTypeIcon type={type} />
        }</div>
        <div className="col-8 d-flex align-items-center px-2">
            <div>
                <div className="font-weight-bold">{name}</div>
                <span>{renderStateText} | { size && prettyBytes(size)}</span>
                {showSaveButton && <button onClick={onSave}>Save to Device</button>}
            </div>
        </div>
    </FilePreviewContainer>
}