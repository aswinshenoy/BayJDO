import React from 'react';

import  { Footer } from "../common";

import {
    AppStore,
    Contributing,
    FAQ,
    Header,
    Highlights,
    Press,
} from "./views";

export default ({ myCode, onConnect, isLoading }) => {

    return <React.Fragment>
        <Header myCode={myCode} isLoading={isLoading} onConnect={onConnect} />
        <Highlights />
        <AppStore />
        <FAQ />
        <Press />
        <Contributing />
        <Footer />
    </React.Fragment>;
}