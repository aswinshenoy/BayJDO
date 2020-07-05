import React from 'react';

export default ({ }) => {

    return <div>
        <div style={{ fontSize: '1.2rem' }}>Made in 🇮🇳 with ❤ & 🧠.</div>
        <div className="bg-dark d-inline-block mt-2 text-cente rounded text-md-left">
            <a href="https://aswinshenoy.com">
                <img
                    style={{ maxWidth: '90px' }}
                    src={require('../../images/brand/aswin_shenoy_logo.png')}
                />
            </a>
        </div>
        <div className="mt-2">
            <a
               className="text-decoration-none font-weight-bold"
               href="https://github.com/aswinshenoy/bayjdo"
            >
                View Code & Updates on GitHub
            </a>
        </div>
    </div>;
}