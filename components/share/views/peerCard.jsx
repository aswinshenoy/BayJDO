import React from 'react';
import styled from '@emotion/styled';

const PeerCard = styled.div`
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    height: 100%;
    h3 {
      font-size: calc(1.35rem + 0.8vw);
      margin-bottom: 0;
    }
    button {
      font-size: 1.35rem;
      padding: 0.5rem 1rem;
    }
`;

export default ({ code, onDisconnect }) => {

    return <PeerCard>
        <div className="row mx-0">
            <div className="col-8 px-2">
                <div>You are Connected to</div>
                <h3>{code}</h3>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-end px-2">
                <button
                    className="btn btn-danger"
                    onClick={onDisconnect}
                >
                    Disconnect
                </button>
            </div>
        </div>
    </PeerCard>
}