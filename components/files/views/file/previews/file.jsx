import React from 'react';

import { getFileIconFromMIME } from "../../../../../functions";

export default ({ meta: { name, type }, }) => {

    return <div>
        <div className="row mx-0">
            <div className="col-3 d-flex align-items-center justify-content-center px-1">
                <img src={getFileIconFromMIME(type)} alt="file" />
            </div>
            <div className="col-9 d-flex align-items-center px-2">
                <div>
                    <div className="font-weight-bold overflow-hidden">{name}</div>
                </div>
            </div>
        </div>
    </div>

};