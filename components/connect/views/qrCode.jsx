import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { throwToast } from '../../../functions';

const QRCode = require('qrcode.react');

export default ({ code }) => {

    return <div className="p-2">
        <QRCode size={256} value={code} />
        <div className="text-center mt-3">
            <div>Share this Code with Your Peer</div>
            <CopyToClipboard text={code} onCopy={() => throwToast("success", `Your code - "${code}" has been copied to your clipboard.`)}>
                <button
                    aria-label={`Click to copy your code - ${code}`}
                    title={`Share this code - "${code}", with your peer`}
                    className="h3 text-primary d-flex align-items-center justify-content-center w-100 plain-button"
                >
                    {code}
                    <span className="pl-2 text-dark"><i className="gg-clipboard" /></span>
                </button>
            </CopyToClipboard>
        </div>
    </div>
}