import React from 'react';

import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

export default ({ onScan }) => {

    return <div style={{ width: "256px", minWidth: "100%"  }}>
        <QrReader
            delay={500}
            onError={(err) => console.log(err)}
            onScan={(data) => data ? onScan(data) : null}
        />
    </div>

}