import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core'
import {PeerConnector} from "../../connect";
import { PopUp } from "../../ui";

const gradientBg = keyframes`
  0% {
    background-position: 50% 0;
  }
  
  100% {
    background-position: 100% 0;
  }

`;

const HeaderBar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.9);
  padding: 0.5rem 0;
  z-index: 3000;
  img {
    max-width: 200px;
  }
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
    font-size: calc(1.5rem + 1.5vmax);
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
    font-size: calc(1.05rem + 0.5vmax);
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
    <HeaderBar>
        <div className="container-lg px-0">
            <div className="row mx-0">
                <div className="col-6 col-md-3 px-2">
                    <img src={require('../../../images/brand/logo_color.png')} alt="logo" />
                </div>
                <div className="col-6 col-md-3 px-1">

                </div>
            </div>
        </div>
    </HeaderBar>
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
                                </div>
                                <div className="d-block d-md-none">
                                    <button
                                        className="btn btn-primary rounded-pill mt-3 font-weight-bold py-3 px-4"
                                        style={{ fontSize: '1.2rem' }}
                                        onClick={() => setShowConnector(true)}
                                    >
                                        🚀 Start Transferring
                                    </button>
                                </div>
                                <StartButtonWrap className="d-block d-md-none">
                                    <button
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
            <PeerConnector
                isLoading={isLoading}
                myCode={myCode}
                onConnect={onConnect}
            />
        </PopUp>
    </CoverWrapper>
    </React.Fragment>
}