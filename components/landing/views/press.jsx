import React from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled';

const PressReportsContainer = styled.section`
  background-color: #F5F5F5;
  padding: 2.5vh 5vw;
  h3 {
    text-align: center;
    margin-bottom: 0;
    font-weight: 600;
    font-size: calc(1.4rem + 0.5vw);
  }
  img {
    width: 180px;
    max-width: 100%;
    filter: saturate(0.8);
    &:hover {
      filter: none;
    }
  }
`;

export default ({ }) => {

    const PressReports = [
        {
            "publisher": "Amrita Vishwa Vidyapeetam",
            "logo": require('../../../images/logos/amrita.png'),
            "url": "https://www.amrita.edu/news/amrita-student-develops-bayjdo-indian-app-beat-xender-and-shareit-ban",
        },
        {
            "publisher": "The Hindu",
            "logo": require('../../../images/logos/the_hindu.png'),
            "url": "https://www.thehindu.com/news/national/kerala/share-it-with-this-desi-application/article32133173.ece"
        },
        {
            "publisher": "The New Indian Express",
            "logo": require('../../../images/logos/the_new_indian_express.png'),
            "url": "https://www.newindianexpress.com/cities/kochi/2020/jul/10/student-develops-app-to-replace-xender-shareit-2167618.html"
        },
        {
            "publisher": "Manorama Online",
            "logo": require('../../../images/logos/manoramaonline.png'),
            "url": "https://www.manoramaonline.com/technology/technology-news/2020/07/09/bayjdo-app-for-easy-file-transmission.html",
        },
        {
            "publisher": "Asianet News",
            "logo": require('../../../images/logos/asianet-news.png'),
            "url": "https://www.asianetnews.com/whats-new-technology/bayjdo-app-for-easy-file-transmission-qd4yfp"
        },
        {
            "publisher": "Mathrubhumi",
            "logo": require('../../../images/logos/mathrubhumi.png'),
            "url": "https://www.mathrubhumi.com/technology/tech-plus/bayjdo-for-easy-file-transmission-a-made-in-india-alternative-for-xender-shareit-1.4889898"
        }
    ];

    return <PressReportsContainer>
        <div className="row mx-0">
            <div className="col-md-3 d-flex align-items-center justify-content-center p-1">
                <div>
                    <h3 className="font-weight-bold text-uppercase mb-1">In the News</h3>
                    <div className="small text-center">Click to view the articles.</div>
                </div>

            </div>
            <div className="col px-0">
                <div className="row mx-0">
                    { PressReports.map((i) =>
                        <div
                            key={shortid.generate()}
                            className="col-6 col-md-4 d-flex align-items-center justify-content-center p-3"
                        >
                            <a
                                title={`View news on ${i.publisher}`}
                                aria-label={`View news on ${i.publisher}`}
                                target="_blank"
                                href={i.url}
                            >
                                <img src={i.logo} alt={`Logo of ${i.publisher}`} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </PressReportsContainer>
}