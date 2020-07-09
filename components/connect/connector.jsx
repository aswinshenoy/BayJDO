import React, { useState } from 'react';
import styled from '@emotion/styled';

import { QRScanner, MyQRCode, CodeInput } from './views';

const QRCodeContainer = styled.div`
    display: inline-flex;
    background: white;
    margin: 1rem 0;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 2px 5px 8px rgba(0,0,0,0.3);
`;

const QRBottomBar = styled.div`
  background: #FFD600;
  padding: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  button {
    font-size: 1.3rem;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
`;

export default ({ myCode, onConnect }) => {

    const [type, setType] = useState('qrCode');

    return <div>
        <div className="d-flex justify-content-center">
            <QRCodeContainer>
                <div>
                    <h3 className="text-center mt-3">🤝 Connect with Peer</h3>
                    <div className="d-flex align-items-center justify-content-center">
                        { type === 'qrCode' && <MyQRCode code={myCode} />}
                        { type === 'qrScanner' && <QRScanner onScan={onConnect} />}
                        { type === 'codeInput' && <CodeInput onConnect={onConnect} />}
                    </div>
                    <QRBottomBar>
                        {   type !== 'qrScanner' &&
                        <button
                            aria-label="Scan QR Code"
                            title="Scan QR Code"
                            className="btn btn-primary"
                            onClick={() => setType('qrScanner')}
                        >
                            Scan QR Code
                        </button>
                        }
                        {   type !== 'qrCode' &&
                        <button
                            aria-label="Show My QR Code"
                            title="Show My QR Code"
                            className="btn btn-primary shadow"
                            onClick={() => setType('qrCode')}
                        >
                            Show My QR
                        </button>
                        }
                        {   type !== 'codeInput' &&
                            <button
                                aria-label="Enter Code Instead"
                                title="Enter Code Instead"
                                className="btn btn-primary shadow"
                                onClick={() => setType('codeInput')}
                            >
                                Enter Code Instead
                            </button>
                        }
                    </QRBottomBar>
                </div>
            </QRCodeContainer>
        </div>
    </div>;

}