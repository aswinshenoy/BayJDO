import React from 'react';
const QRCode = require('qrcode.react');

export default ({ code }) => {

    return <div className="p-2">
        <QRCode size={256} value={code} />
        <div className="text-center mt-3">
            <div>Share this Code with Your Peer</div>
            <div
                tabIndex="0"
                title={`Share this code - "${code}", with your peer`}
                className="h3 text-primary"
            >
                {code}
            </div>
        </div>
    </div>
}