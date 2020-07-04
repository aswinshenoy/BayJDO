import React from 'react';

export default ({ altText, url }) => {

    return <div>
        <div
            style={{
                backgroundImage: `url(${url})`,
                width: '8vh',
                height: '8vh',
                maxWidth: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        />
    </div>

};