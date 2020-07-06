import React, { useState } from 'react';
import styled from '@emotion/styled';

import {getFileIconFromMIME} from "../../../../../functions";

const VideoPreviewContainer = styled.div`
  padding: 0.5rem;
  background: #eee;
  border-radius: 1rem;
`;


export default ({ url, meta: { type, name, }, isTransferred }) => {

    const [renderPlayer, setRenderPlayer] = useState(false);

    return renderPlayer && isTransferred ?
    <VideoPreviewContainer className="mb-2">
        <div className="p-2">
            <video autoPlay controls style={{ width: '100%' }}>
                <source src={url} type={type} />
            </video>
        </div>
        <div className="row mx-0 my-2">
            <div className="col-8 d-flex align-items-center px-1">
                <div className="font-weight-bold overflow-hidden">{name}</div>
            </div>
            <div className="col-4 d-flex justify-content-end px-1">
                <button className="btn btn-outline-primary px-2 py-1" onClick={() => setRenderPlayer(false)}>
                    Close Playback
                </button>
            </div>
        </div>
    </VideoPreviewContainer> :
    <div className="row mx-0">
        <div className="col-3 d-flex align-items-center justify-content-center px-1">
            <img src={getFileIconFromMIME(type)} alt="file" />
        </div>
        <div className="col-9 d-flex align-items-center px-1">
            <div>
                <div className="font-weight-bold overflow-hidden">{name}</div>
                {  isTransferred &&
                    <button
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center mt-2 px-2 py-1"
                        onClick={() => setRenderPlayer(true)}
                    >
                        <i className="gg-play-button" />
                        Play Video
                    </button>
                }
            </div>
        </div>
    </div>
}