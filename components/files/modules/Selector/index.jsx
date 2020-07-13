import React, { useEffect } from 'react';
import shortid from 'shortid';
import {useDropzone} from 'react-dropzone';
import styled from '@emotion/styled';

import FileLister from '../Lister';

const FileSelectorWrap = styled.div`
  background-color: white;
  padding:1rem;
  border-radius: 0.5rem;
  h4 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
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

    const getFileURL = (file) => {
        const fileSize = file.size / (1024 * 1024);
        if(fileSize < 50) return URL.createObjectURL(file);
        else return null;
    };

    const processFile = (file) => {
        return {
            id: shortid.generate(),
            file,
            url: getFileURL(file),
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

    const renderMobileSelector =
    <FooterFileSelector>
        <button
            aria-label="Select Files to Send"
            title="Select Files to Send"
            className="btn btn-primary shadow"
            type="button"
            onClick={open}
        >
            Select File(s)
        </button>
    </FooterFileSelector>;

    const renderLargeScreenSelector =
    <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center">
            <div>
                <div className="d-flex justify-content-center">
                    <button
                        aria-label="Select Files to Send"
                        title="Select Files to Send"
                        className="btn btn-primary shadow-lg"
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
    </div>;

    return <FileSelectorWrap>
        <div className="d-block d-md-none">
            {renderMobileSelector}
        </div>
        <div className="d-none d-md-block">
            {renderLargeScreenSelector}
        </div>
        <div className="mt-md-4">
            <h4 className="p-2 my-2">
                <span className="pr-2">Queue</span>
                <span className="bg-warning rounded px-3 shadow">{queue && queue.length > 0 ? queue.length : 0}</span>
            </h4>
            <div className="bg-light rounded p-2">
                <FileLister files={queue} labels={{ noFilesShared: "No files pending." }} />
            </div>
        </div>
    </FileSelectorWrap>;
}