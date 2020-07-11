import React, { useState } from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled';

const FAQSectionContainer = styled.section`
  background-color: #005cbf;
  padding: 5vh 2vw;
  h4 {
    color: white;
    font-weight: 600;
    font-size: calc(1.5rem + 0.5vw);
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const FAQScroller = styled.div`
  max-height: 45vh;
  overflow-y: auto;
  padding: 0.5rem;
`;

const FAQQuestionWrapper = styled.div`
  background-color: white;
  padding: 1rem;
  box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  button {
    h5 {
        font-size: calc(1.2rem + 0.25vw);
        font-weight: 600;
        color: #005cbf;
        text-align: left;
        margin-bottom: 0;
    }
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`;


const FAQQuestion = ({ question, answer }) => {
    const [isOpen, setOpen] = useState(false);

    return <FAQQuestionWrapper>
        <button onClick={() => setOpen(!isOpen)} className="plain-button">
            <h5>{question}</h5>
        </button>
        {   isOpen &&
            <div className="p-2">
                <p>{answer}</p>
            </div>
        }
    </FAQQuestionWrapper>
};

export default ({ }) => {

    const questions = [
        {
            "question": "I don't want use BayJDO, what else can I use?",
            "answer": "There are many alternatives to BayJDO in the market to today, you can try web-apps like sharedrop.io or blaze.now.sh etc. or use apps such as Files by Google. But, please refrain from using apps that steal your data :)"
        },
        {
            "question": "Is BayJDO a new invention or idea?",
            "answer": "Not at all. There are several already popular WebApps (like ShareDrop) that exist in the market today. BayJDO was just an experimental app that implemented popular technologies."
        },
        {
            "question": "Does transferring files over the BayJDO 'website' consume your internet?",
            "answer": "No. BayJDO relies on the local network (like WiFi Hotspot) for P2P file transfer, & doesn't use the internet though it is a website."
        },
        {
            "question": "Does BayJDO store your data?",
            "answer": "No. There is no way BayJDO can do that (you can verify it since our code is public on GitHub), and your files are transferred peer to peer in an end-to-end encrypted channel using WebRTC standards. We perhaps do not even have a database."
        },
        {
            "question": "Is BayJDO a full-time commitment or startup?",
            "answer": "Currently, No. BayJDO is only a hobby-project of its developer, and was not originally intended for public/commercial use."
        },
        {
            "question": "Is BayJDO developed by a single developer?",
            "answer": "BayJDO is currently my personal side-project, though it has been kept open-source for others to contribute. Even though BayJDO was developed without a team, it uses several popular open-source packages/libraries to achieve the functionality, and therefore the real credit goes to the Open Source Community and not to Ashwin Shenoy."
        },
        {
            "question": "Was BayJDO developed for public or to start-off a startup?",
            "answer": "No. BayJDO was developed for my personal use & satisfaction, and is an experimental project and simple implementation of well-popular libraries."
        },
        {
            "question": "Will BayJDO be ever released as an app on Google PlayStore / AppStore?",
            "answer": "No. We do not plan to launch a native application since we believe a WebApp like this serves the purpose."
        }
    ];

    return <FAQSectionContainer>
        <div className="container px-0">
            <h4>Frequently Asked Questions</h4>
            <FAQScroller className="minimal-scrollbar">
                {questions.map((i) =>
                    <FAQQuestion key={shortid.generate()}  {...i} />
                )}
            </FAQScroller>
        </div>
    </FAQSectionContainer>

}