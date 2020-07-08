import React from 'react';
import styled from '@emotion/styled';

const PressReportsContainer = styled.section`
  background-color: #ddd;
  padding: 2.5vh 5vw;
  h3 {
    text-align: center;
    margin-bottom: 0;
    font-weight: 600;
    font-size: calc(1.4rem + 0.5vw);
  }
  img {
    max-height: 45px;
    filter: saturate(0);
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
            "url": "https://twitter.com/AMRITAedu/status/1280067292894605312",
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
            <div className="col-md-3 d-flex align-items-center p-1">
                <h3>In the News</h3>
            </div>
            <div className="col px-0">
                <div className="row mx-0">
                    { PressReports.map((i) =>
                        <div className="col-6 col-md-3 d-flex align-items-center justify-content-center p-2">
                            <a target="_blank" href={i.url}>
                                <img src={i.logo} alt={i.publisher} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </PressReportsContainer>
}