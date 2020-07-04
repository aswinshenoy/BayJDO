import React from 'react';
import PropTypes from 'prop-types';
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'emotion-theming'

import 'react-toastify/dist/ReactToastify.css';

import '../../styles/bootstrap.min.css';
import '../../styles/gg.css';
import '../../styles/animate.css';
import '../../styles/styles.css';

const seoTags = {
    "siteName": "Bayjdo",
    "tagLine": "Transfer Files Fast, Simple & Securely, on-the-go with any device",
    "description": "A Peer-to-Peer File Transfer app that's fast, light-weight, & secure."
};

const Base = ({ children, meta }) => {


    const title = `${meta && meta.title ? `${meta.title} |` : '' } ${seoTags.siteName} - ${seoTags.tagLine}`;

    const theme = {
        bg: {
            primary: `#FFD600`,
            primaryDarker: `#FFC400`,
            primaryLighter: `#FFF176`,
            primaryLightest: `#FFECB3`,
            secondary: `#2962FF`,
        },
        text: {
            primaryDarker: `black`,
            secondary: `white`
        }
    };


    return <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8'/>
            <meta name='theme-color' content='#317EFB' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name="description" content={meta && meta.description ? meta.description : seoTags.description} />
            <meta name="twitter:title" content={title} />
            <meta property="og:title" content={title} />
            {   meta && meta.image && <meta property="og:image" content={meta.image} /> }
            <meta name="viewport" content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1, user-scalable=no" />
            <link rel="manifest" href="/manifest.json" />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/images/icons/icon-512x512.png' />
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-167849096-1"></script>
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-167849096-1');`}} />
        </Head>
        <div className="app light dark-mode animated fadeIn">
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
            <ToastContainer />
        </div>
    </React.Fragment>
};

Base.propTypes  = {
    children: PropTypes.node,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    })
};

export default Base;