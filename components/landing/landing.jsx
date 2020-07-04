import React, { useState } from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

import {PeerConnector} from "../connect";
import { Credits } from '../common';

const LandingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-image: ${() => `url(${require('../../images/backgrounds/landscape.png')})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
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

const ContentWrapper = styled.div`
    padding: 5vh 5vw;
    margin-bottom: 10vh;
    .logo {
      background-color: white;
      padding: 1rem;
      border-radius: 1rem;
      max-width: 100%;
      width: 25vw;
      min-width: 220px;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: calc(1.25rem + 1.5vmax);
      margin-bottom: 5vh;
      text-transform: uppercase;
      line-height: 1.1;
    }
    h4 {
      font-size: calc(1.35rem + 0.5vw);
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      font-size: 1.1rem;
      padding-bottom: 0.5rem;
      b {
        font-size: 1.25rem;
      }
    }
`;

export default ({ myCode, onConnect }) => {

    const [showConnector, setShowConnector] = useState(false);

    const renderFooter =
    <div className="mt-3 text-center text-md-left">
       <Credits />
    </div>;

    return <LandingPageContainer className="row mx-0">
        <div className={classNames("col align-items-start px-0",  showConnector ? "d-none" : "d-flex")}>
            <ContentWrapper>
                <img className="logo" alt="bayjdo_logo" src={require('../../images/brand/logo_color.png')} />
                <h1>A Fast, Simple & Secure Way to Transfer Files between Devices</h1>
                <div className="card p-4 border-0 shadow d-inline-block">
                    <h4>🔥 Features</h4>
                    <ul>
                        <li>✅ <b>Light</b> - The lightest file-transfer app you would find!</li>
                        <li>✅ <b>Fast</b> - Zero Overheads. Theoretically, as fast as your WiFi is!</li>
                        <li>✅ <b>Secure</b> - P2P WebRTC-based File-Transfer</li>
                        <li>❌ <b>No Special Hotspot</b> - Works with any existing hotspot or network between devices.</li>
                        <li>❌ <b>No App Install</b> - Works on any device with a modern web browser.</li>
                        <li>❌ <b>No Non-Sense</b> - Open Source, No Ads, No User Info Asked/Stored</li>
                    </ul>
                </div>
                {renderFooter}
            </ContentWrapper>
            {!showConnector &&
            <StartButtonWrap className="d-block d-md-none">
                <button
                    className="btn btn-warning py-3 w-100"
                    onClick={() => setShowConnector(true)}
                >
                    🚀 Start Transferring
                </button>
            </StartButtonWrap>
            }
        </div>
        <div className={classNames("col-xl-3 col-lg-4 col-md-6 px-0 py-4 justify-content-center align-items-center", !showConnector ? "d-none d-md-flex": "d-flex")}>
            <div>
                <PeerConnector myCode={myCode} onConnect={onConnect} />
                <div className="d-block d-md-none">{renderFooter}</div>
            </div>
        </div>

    </LandingPageContainer>;
}