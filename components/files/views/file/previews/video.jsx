import React from 'react';

export default ({ url, type }) => {

    return <div>
        <video style={{ maxWidth: '100%' }} controls>
            <source src={url} type={type} />
        </video>
    </div>
}