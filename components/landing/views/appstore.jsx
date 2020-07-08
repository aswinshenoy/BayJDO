import React from 'react';
import styled from '@emotion/styled';

const AppStoreSectionContainer = styled.section`
  min-height: 50vh;
  padding: 5vh 5vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  h2 {
    font-weight: 900;
    font-size: calc(1.5rem + 1.2vw);
    margin-bottom: 1.2rem;
  }
  p {
    font-size: 1.2rem;
    span {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

export default ({ }) => {


    return <AppStoreSectionContainer>
        <div style={{ maxWidth: '720px' }}>
            <h2>Not Available on the <span className="d-inline-block">Google Playstore & App Store</span>.</h2>
            <p>
                <span className="mb-3">
                    Yes! You read it right.
                </span>
                Bayjdo is not available on your app store, and we
                don't plan to put it there. You can access it anytime from your browser,
                as well as install it in you device right from your browser. You don't
                have to take the pain of downloading, updating and losing storage space
                for the app.
            </p>
        </div>
    </AppStoreSectionContainer>
}