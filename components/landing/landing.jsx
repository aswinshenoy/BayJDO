import React from 'react';

import  {
    Footer
} from "../common";

import {
    AppStore,
    Contributing,
    FAQ,
    Header,
    Highlights,
    Press
} from "./views";

export default ({ myCode, onConnect, isLoading }) => {

    return <React.Fragment>
        <Header myCode={myCode} isLoading={isLoading} onConnect={onConnect} />
        <div className="bg-warning p-3 d-flex justify-content-center">
            <div style={{ fontSize: "1.2rem", maxWidth: '720px' }} className="bg-white p-3 rounded shadow">
                <h5 style={{ fontWeight: "600" }}>Kindly Note</h5>
                <p>
                    BayJDO is currently only in a very early stage of development, and
                    may not work as expected in some cases.  The app was developed in
                    haste while my exams were going on, & I couldn't do justice to it
                    yet since I am still having my exams, & I am all on my own.
                    I regret the inconvenience caused during this period. I am currently
                    working hard & planning to release the Beta version in the next few days.
                    Thank You!
                </p>
                <div>- Ashwin</div>
                <a
                    aria-label="View development updates on twitter"
                    title="View development updates on twitter"
                    href="https://twitter.com/aswinshenoy_"
                    target="_blank"
                >
                    Click Here to View Updates on Twitter
                </a>
            </div>
        </div>
        <Highlights />
        <AppStore />
        <FAQ />
        <Press />
        <Contributing />
        <Footer />
    </React.Fragment>;
}