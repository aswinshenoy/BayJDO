import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core'

import { Topbar } from "../../common";
import {PeerConnector} from "../../connect";
import { PopUp } from "../../ui";

const gradientBg = keyframes`
  0% { background-position: 50% 0; }
  100% { background-position: 100% 0; }
`;

const CoverWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vmin;
  background-color: white;
  padding: 2vh 5vw;
  h1 {
    font-weight: 600;
    font-size: calc(1.5rem + 2vmax);
    max-width: 700px;
    line-height: 1.15;
    background: linear-gradient(to right, #C51162, #304FFE, #00BFA5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 500%;
    animation: ${gradientBg} 8s ease infinite alternate-reverse;
    text-shadow: 1px 1.2px 8px rgba(0,0,0,0.15);
  }
  h5 {
    max-width: 600px;
    font-size: calc(1.05rem + 0.8vmax);
  }
`;

const StartButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 600;
  padding: 1rem;
  background-color: rgba(255,255,255,0.8);
  button {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;


export default ({ myCode, isLoading, onConnect }) => {

    const [showConnector, setShowConnector] = useState(false);

    return <React.Fragment>
    <Topbar />
    <div className="bg-white" style={{ height: '8vh' }} />
    <CoverWrapper>
        <div>
            <div className="row mx-0">
                <div className="col-md-6 col-lg-8 d-flex align-items-center px-2">
                    <div>
                        <h1>Fast, Simple & Secure <span className="d-inline-block">File Transfer</span></h1>
                        <h5>
                            Share files between devices right from your browser, without
                            even needing to install an app or creating a dedicated hotspot.
                        </h5>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 px-2">
                    <div>
                        { isLoading ?
                            <div className="alert-warning p-2 my-4">
                                <div className="h4">Establishing Connection with Server</div>
                                <p>
                                    Please wait. If its taking longer than usual, it may be due to server over-load.
                                </p>
                            </div> :
                            <React.Fragment>
                                <div className="d-none d-md-block">
                                    <PeerConnector
                                        isLoading={isLoading}
                                        myCode={myCode}
                                        onConnect={onConnect}
                                    />
                                    <p className="mt-2 text-center p-4">
                                        If you face any issue with connecting with your peer, try reloading the pages
                                        to generate a new code for each of you.
                                    </p>
                                </div>
                                <div className="d-block d-md-none">
                                    <button
                                        aria-label="Start Transferring"
                                        title="Start Transferring"
                                        className="btn btn-primary rounded-pill shadow-lg mt-5 font-weight-bold p-4"
                                        style={{ fontSize: '1.2rem' }}
                                        onClick={() => setShowConnector(true)}
                                    >
                                        🚀 Start Transferring
                                    </button>
                                </div>
                                <StartButtonWrap className="d-block d-md-none">
                                    <button
                                        aria-label="Start Transferring"
                                        title="Start Transferring"
                                        className="btn btn-warning py-3 w-100"
                                        onClick={() => setShowConnector(true)}
                                    >
                                        🚀 Start Transferring
                                    </button>
                                </StartButtonWrap>
                          </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
        <PopUp
            isOpen={showConnector}
            onClose={() => setShowConnector(false)}
            appElement=".app"
        >
            <div style={{ overflowY: "auto", maxHeight: '100vh' }}>
                <PeerConnector
                    isLoading={isLoading}
                    myCode={myCode}
                    onConnect={onConnect}
                />
                <p className="mt-2 text-center p-4">
                    If you face any issue with connecting with your peer, try reloading the pages
                    to generate a new code for each of you.
                </p>
            </div>
        </PopUp>
    </CoverWrapper>
    </React.Fragment>
}