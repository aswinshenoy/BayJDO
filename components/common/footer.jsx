import React from 'react';
import styled from '@emotion/styled';

const FooterInfoListContainer = styled.div`
  min-height: 20vh;
  background-color: #EAEAEA;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 5vh 0;
  .col-6 {
    &:hover {
      color: #218838;
      transition: all 0.25s;
      img {
        width: 38px;
        transition: all 0.25s;
      }
    }
  }
  img {
    width: 36px;
    margin-bottom: 1rem;
  }
  h5 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const IndianBrandMark = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  width: 100%;
  justify-content: center;
  background-color: white;
  min-height: 15vmin;
  text-align: center;
  height: 100%;
  padding: 1rem;
  .campaign-icon {
    height: 64px;
    width: auto;
    margin: 1rem 0;
  }
  img {
    width: 32px;
    margin: 0 0.5rem;
  }
`;

const DeveloperCreditMark = styled.div`
    background-color: white;
    text-align: center;
    a{
       display: inline-block;
       background-color: #666;
       padding: 0.25rem;
       border-radius: 0.5rem;
       &:hover {
        background-color: #007bff;
       }
    }
    img {
      width: 90px;
    }
`;

export default ({ hideInfoList }) => {

    const FooterInfoList = [
        {
            "icon": require('../../images/icons/landing/no-ads.png'),
            "title": "No Annoying Advertisements"
        },
        {
            "icon": require('../../images/icons/landing/id-not-verified.png'),
            "title": "No User Info Asked/Stored"
        },
        {
            "icon": require('../../images/icons/landing/hide.png'),
            "title": "No System Permissions Required"
        },
        {
            "icon": require('../../images/icons/landing/secure.png'),
            "title": "100% Privacy & P2P Encryption Ensured"
        },

    ];

    return <footer>
        <div>
            {!hideInfoList && <FooterInfoListContainer>
                <div className="row mx-0 w-100" style={{ maxWidth: '900px' }}>
                    { FooterInfoList.map((i) =>
                        <div className="col-6 col-md-3 p-3">
                            <img src={i.icon} alt={i.title} />
                            <h5>{i.title}</h5>
                        </div>
                    )}
                </div>
            </FooterInfoListContainer>}
            <IndianBrandMark>
                <div>
                    <div className="d-md-flex align-items-center justify-content-center p-2">
                        <span>A product from </span>
                        <img alt="indian-flag" src={require('../../images/icons/landing/india-flag.png')} />
                        <span><b>India</b> to the world with love ❤️.</span>
                    </div>
                    <div style={{ fontSize: '1.1rem' }}>
                        <span>Committed towards to the vision of building an #AatmaNirbhar Digital India.</span>
                    </div>

                </div>
            </IndianBrandMark>
            <DeveloperCreditMark>
                <a
                    aria-label="Made by Ashwin Shenoy, click to his website"
                    title="Made by Ashwin Shenoy"
                    href="https://aswinshenoy.com/"
                    target="_blank"
                    role="button"
                >
                    <img src={require('../../images/brand/aswin_shenoy_logo.png')} alt="Made by Ashwin Shenoy" />
                </a>
            </DeveloperCreditMark>
            <div className="pt-3 pb-5 bg-white px-2 text-center d-flex align-items-center justify-content-center">
                <div style={{ maxWidth: '800px' }}>
                    <div>
                        Icons used in this website are taken from <a target="_blank" href="https://icons8.com/">Icons8</a>.
                    </div>
                    <div className="my-2">
                        <b>Disclaimer: </b>
                        The app is currently only in its early stage development, many of the features and specifications
                        provided above may not work as expected. The developer of this app shall not be liable for any
                        harm caused in any manner in using this app, and does not provide any warranty for the features
                        listed above. By using this application, you agree to this disclaimer.
                    </div>
                </div>
            </div>
        </div>
    </footer>
}