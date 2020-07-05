import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import FilePreview from './file';
import {getFileIconFromMIME} from "../../../../../functions";


const AudioPreviewContainer = styled.div`
  padding: 0.5rem;
  background: #eee;
  border-radius: 1rem;
  .cover-art {
      box-shadow: 2px 3px 5px;
      border-radius: 0.5rem;
  }
`;

const AudioTrackMetaPreview = styled.div`
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.1;
    span {
      padding-right: 0.25rem;
      &:after {
        content: ' • '
      }
      &:last-child:after {
        content: ''!important;
      }
    }
`;

const MediaPlayer = styled.audio`
  width: 100%;
  padding: 0.5rem;
`;

export default ({ url, meta, isTransferred }) => {

    const getBlobFromURL = () => fetch(url).then(r => { return r.blob(); });

    const fetchMeta = (blob) => {
        const musicMetadata = require('music-metadata-browser');
        return musicMetadata.parseBlob(blob)
    };

    const [cover, setCover] = useState(null);
    const [tags, setTags] = useState(null);

    useEffect(() => {
        if(isTransferred)
            getBlobFromURL().then(async (blob) => {
                return await fetchMeta(blob).then(meta => {
                    setTags(meta);
                    if(meta && meta.common && meta.common.picture && meta.common.picture.length)
                        return meta.common.picture[0];
                    return null;
                }).then(file => {
                    setCover(file ?
                        URL.createObjectURL(new Blob( [ file.data ], { type: file.format })
                    ) : null)
                });
            });
    }, [isTransferred]);

    const renderPlayer =
    <MediaPlayer controls>
        <source src={url} type={meta.type} />
         Your browser does not support the audio element.
    </MediaPlayer>;

    return tags ?
    <AudioPreviewContainer>
        <div className="row mx-0">
            <div className="col-3 d-flex align-items-center justify-content-center px-2">
                {<img className={cover&&'cover-art'} src={cover ? cover : getFileIconFromMIME(meta.type)} alt={meta.name} />}
            </div>
            <div className="col-9 d-flex align-items-center px-2">
                <div>
                    <div className="font-weight-bold my-1">{meta.name}</div>
                    <AudioTrackMetaPreview>
                        {(tags.common && tags.common.title) && <span>{tags.common.title}</span>}
                        {(tags.common && tags.common.album) && <span>{tags.common.album}</span>}
                        {(tags.common && tags.common.artist) && <span>{tags.common.artist}</span>}
                        {(tags.common && tags.common.year) && <span>{tags.common.year}</span>}
                    </AudioTrackMetaPreview>
                </div>
            </div>
            <div className="col-12 pt-2 px-1">
                {renderPlayer}
            </div>
        </div>
    </AudioPreviewContainer> : <FilePreview meta={meta} />;

}