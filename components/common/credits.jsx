import React from 'react';

export default ({ }) => {

    return <div>
        <div style={{ fontSize: '1.2rem' }}>Made in 🇮🇳 with ❤ & 🧠.</div>
        <div className="py-2">This is only a trial run. I am sorry for any interruptions/inconveniences.</div>
        <div className="bg-dark d-inline-block mt-2 text-cente rounded text-md-left">
            <a target="_blank" href="https://aswinshenoy.com">
                <img
                    alt="Ashwin Shenoy"
                    style={{ maxWidth: '90px' }}
                    src={require('../../images/brand/aswin_shenoy_logo.png')}
                />
            </a>
        </div>
        <div className="mt-3">
            <a
                target="_blank"
                className="text-decoration-none font-weight-bold"
                href="https://twitter.com/aswinshenoy_"
            >
               Follow project updates on twitter @aswinshenoy_
            </a>
        </div>
        <div className="mt-2 mb-4">
            <a
                target="_blank"
                className="text-decoration-none font-weight-bold"
               href="https://github.com/aswinshenoy/bayjdo"
            >
                View Code & Updates on GitHub
            </a>
        </div>
    </div>;
}