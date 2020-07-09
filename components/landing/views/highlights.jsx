import React from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled';

const HighlightsContainer = styled.section`
  background-color: #FFD600;
  padding: 5vh 2vw;
  min-height: 60vh;
  display: flex;
  align-items: center;
`;

const HighlightCard = styled.div`
  background-color: white;
  padding: 5vh 1rem;
  box-shadow: 2px 3px 15px rgba(0,0,0,0.5);
  border-radius: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s;
  &:hover {
    transform: translateY(-2%);
    transition: all 1s;
  }
  h3 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.8rem;
    font-size: calc(1.2rem + 0.5vw);
  }
  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.25;
  }
  img {
    width: 6vw;
    height: 6vw;
    min-width: 64px;
    min-height: 64px;
    margin-bottom: 1rem;
  }
`;

export default ({ }) => {

    const highlights = [
        {
            "icon": require('../../../images/icons/landing/easy.png'),
            "title": <React.Fragment>Convenient to Use,<span className="d-inline-block"> works on any device</span></React.Fragment>,
            "description": "The only requirements are - a modern web browser and a network connecting them."
        },
        {
            "icon": require('../../../images/icons/landing/speed.png'),
            "title": <React.Fragment>Fast Transfer with <span className="d-inline-block">No Initial Setup</span></React.Fragment>,
            "description": "Start using the app without even requiring to install an app, and start transferring file at blazing fast speeds."
        },
        {
            "icon": require('../../../images/icons/landing/lock.svg'),
            "title": "Secure & Private Peer-to-Peer File Sharing",
            "description": "Files are transferred in a end-to-end encrypted WebRTC channel, and no intermediate server is involved."
        },
        {
            "icon": require('../../../images/icons/landing/wifi.png'),
            "title": "Works with Any Network Already Connected",
            "description": "Works with any existing network between devices and no special hotspot is required."
        }
    ];

    return <HighlightsContainer>
        <div className="row mx-0 w-100">
            {highlights.map((i) =>
                    <div key={shortid.generate()} className="col-6 col-md-3 p-2">
                        <HighlightCard>
                            <div>
                                <img src={i.icon} alt="Icon" />
                                <h3>{i.title}</h3>
                                <p className="d-none d-md-block">{i.description}</p>
                            </div>
                        </HighlightCard>
                    </div>
                )
            }
        </div>
    </HighlightsContainer>
}