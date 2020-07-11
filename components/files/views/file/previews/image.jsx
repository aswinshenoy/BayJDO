import React from 'react';

export default ({ url, meta: { name, } }) => {

    return <div>
        <div className="row mx-0">
            <div className="col-4 d-flex align-items-center px-1 justify-content-center">
                <img
                    src={url}
                    alt={name}
                    style={{ maxWidth: 'auto!important', height: '8vh' }}
                    className="shadow"
                />
            </div>
            <div className="col-8 px-1">
                <div className="font-weight-bold overflow-hidden">{name}</div>
            </div>
        </div>
    </div>

};