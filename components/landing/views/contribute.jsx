import React from 'react';
import styled from '@emotion/styled';

const ContributionCard = styled.div`
  min-height: 50vmin;
  padding: 5vh 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    font-weight: 600;
    font-size: calc(1.8rem + 1.2vw);
    text-shadow: 1px 2px 3px rgba(255,255,255,0.2);
    margin-bottom: 1rem;
  }
  h5 {
    font-size: calc(1.3rem + 0.5vw);
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
  }
  button, a {
    margin-top: 1rem;
    background-color: white;
    color: black;
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: 1px 2px 4px rgba(255,234,0, 0.3);
    display: inline-flex;
    align-items: center;
    img {
      width: 32px;
    }
    &:hover, &:focus {
      outline: none!important;
      text-decoration: none!important;
      background-color: #007bff;
      color: white;
      box-shadow: none;
    }
  }
`;

const GithubCard = styled(ContributionCard)`
  background: #0D47A1; 
  color: white;
  .github-badges {
    margin: 1rem 0;
    img {
      margin-right: 0.75rem;
      margin-bottom: 0.75rem;
    }
  }
`;

const EnthusiastCard = styled(ContributionCard)`
    background: #FFEA00; 
    color: black;
    button, a { 
      box-shadow: 1px 2px 3px rgba(0,0,0,0.3)!important;
    }
`;

export default ({ }) => {


    return <section>
        <div className="row mx-0">
            <GithubCard className="col-md-6 text-md-left text-center">
                <div>
                    <h4>For Developers</h4>
                    <h5>Let's build together</h5>
                    <p className="d-none d-md-block">
                        Bayjdo is an Open-Source Project, and you can help us by contributing to the project on GitHub.
                        We welcome reporting issues, sending PR's for fixing those & adding new features.
                    </p>
                    <div className="github-badges d-inline-block">
                        <img alt="Open Source License" src="https://img.shields.io/github/license/aswinshenoy/bayjdo" />
                        <img alt="Latest Release Version" src="https://img.shields.io/github/v/release/aswinshenoy/bayjdo?include_prereleases" />
                        <img alt="Last Commit Date" src="https://img.shields.io/github/last-commit/aswinshenoy/bayjdo" />
                    </div>
                    <div>
                        <a
                            role="button"
                            title="View on GitHub"
                            aria-label="View on Github"
                            href="https://github.com/aswinshenoy/bayjdo"
                        >
                            <img src={require('../../../images/icons/landing/github.svg')} alt="github-logo" />
                            Contribute on GitHub
                        </a>
                    </div>
                </div>
            </GithubCard>
            <EnthusiastCard className="col-md-6 text-center text-md-left">
                <div>
                    <h4>For Enthusiasts</h4>
                    <h5>Help us Improve</h5>
                    <p className="d-none d-md-block">
                        We deeply value your suggestions, complaints & feature requests for the app, & are committed
                        towards providing you with the best experience. In this journey of ours, you are our ears,
                        & we invite you to take part in a short survey. The time you take to share your feedback
                        will greatly help in making Bayjdo better for everyone.
                    </p>
                    <div>
                        <a
                            role="button"
                            title="Participate in Survey"
                            aria-label="Participate in Survey"
                            href="https://forms.gle/3bLNjQPUocYTX1eb9"
                            target="_blank"
                        >
                            <img src={require('../../../images/icons/landing/survey.png')} alt="survey-icon" />
                            Participate in Survey
                        </a>
                    </div>
                </div>
            </EnthusiastCard>
        </div>
    </section>
}