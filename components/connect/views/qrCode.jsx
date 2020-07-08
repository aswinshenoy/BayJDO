import React from 'react';
const QRCode = require('qrcode.react');

export default ({ code }) => {

    return <div className="p-2">
        <QRCode size={256} value={code} />
        <div className="text-center mt-3">
            <div>Share this Code with Your Peer</div>
            <h3 className="text-primary">{code}</h3>
        </div>
    </div>
}