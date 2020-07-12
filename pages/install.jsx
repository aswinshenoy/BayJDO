import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import {Base} from "../components/common";

const InstallationPageWindow = styled.div`
  min-height: 100vh;
  background-color: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  div {
    max-width: 550px;
  }
  h1{
    margin-bottom: 1.5rem;
    font-weight: 900;
    font-size: calc(1.5rem + 1vw);
    color: #212121
  }
  img {
    max-width: 150px;
    box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
    margin-bottom: 1rem;
    border-radius: 1rem;
    background: white;
  }
  button {
    background: linear-gradient(to right, #396afc, #2948ff);
    color: white;
    border-radius: 1rem;
    padding: 1rem 5vw;
    font-size: 1.35rem;
    font-weight: 600;
    border: 1.2px solid #005cbf;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
    &:focus,&:hover {
      outline: none!important;
      background: none;
      border: 1.2px solid #005cbf;
      color: #005cbf;
    }
  }
  p {
      margin-bottom: 0;
      margin-top: 1.2rem;
      font-size: 0.9rem;
    }
`;

export default ({ }) => {
    let deferredPrompt;

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', e => {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                // don't display install banner when installed
                return e.preventDefault();
            } else {
                const btn = document.querySelector('#install');
                btn.hidden = false;
                btn.onclick = _ => e.prompt();
                return e.preventDefault();
            }
        });

    }, []);

    return <Base meta={{ title: "Install BayJDO" }}>
        <InstallationPageWindow>
            <div>
                <img src={require('../images/brand/icon.png')} alt="icon" />
                <h1>Install BayJDO on your Device</h1>
                <button aria-label="Install App" title="Install App" id="install">Install App</button>
                <p>
                    You can access BayJDO conveniently from your home-screen if
                    you install our Progressive Web App. This app is light on your storage,
                    & does not require any special permissions.
                </p>
            </div>
        </InstallationPageWindow>
    </Base>

}