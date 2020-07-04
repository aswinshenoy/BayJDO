import React, { useEffect } from 'react';
import shortid from 'shortid';
import {useDropzone} from 'react-dropzone';
import styled from '@emotion/styled';

import FileLister from '../Lister';

const FileSelectorWrap = styled.div`
  background-color: white;
  padding:1rem;
  border-radius: 0.5rem;
  .dropzone {
    border: 2px dashed rgba(0,0,0,0.4);
    padding: 5vh 2.5vw;
    border-radius: 0.5rem;
    button {
        border-radius: 0.25rem;
        font-size: 1.25rem;
    }
  }
`;

const FooterFileSelector = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(255,255,255,0.8);
  z-index: 600;
  button {
    width: 100%;
    font-size: 1.25rem;
    padding: 1rem;
  }
`;

export default ({ onSelect, queue }) => {

    const processFile = (file) => {
        return {
            id: shortid.generate(),
            file,
            url: URL.createObjectURL(file),
            meta: {
                name: file.name,
                type: file.type,
                size: file.size,
            },
            status: {
                state: "queued",
            }
        };
    };

    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({ noClick: true, noKeyboard: true });

    useEffect(() => {
        if(acceptedFiles && acceptedFiles.length>0)
        {
            const files = [];
            acceptedFiles.forEach((f) => {
                files.push(processFile(f));
            });
            onSelect(files);
        }
    }, [acceptedFiles]);

    return <FileSelectorWrap>
        <div {...getRootProps({className: 'dropzone d-none d-md-block'})}>
            <input {...getInputProps()} />
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={open}
                        >
                            Select File(s)
                        </button>
                    </div>
                    <div className="p-2 d-none d-md-block">
                        <span>You may also drag and drop files here.</span>
                    </div>
                </div>
            </div>
        </div>
        <FooterFileSelector className="d-block d-md-none">
            <button
                className="btn btn-primary"
                type="button"
                onClick={open}
            >
                Select File(s)
            </button>
        </FooterFileSelector>
        <div className="mt-md-4">
            <h4 className="p-2 my-2">Queue ({queue && queue.length > 0 ? queue.length : 0})</h4>
            <div className="bg-light rounded p-2">
                <FileLister files={queue} labels={{ noFilesShared: "No files in Queue" }} />
            </div>
        </div>
    </FileSelectorWrap>;
}