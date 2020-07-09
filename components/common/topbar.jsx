import React from 'react';
import styled from '@emotion/styled';

const TopBar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: white;
  padding: 0.5rem 0;
  z-index: 3000;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  img {
    max-width: 200px;
    width: 12vw;
    min-width: 150px;
  }
`;

export default ({ menu }) => {

    return <TopBar>
        <div className="container-lg px-0">
            <div className="row mx-0">
                <div className="col d-flex justify-content-center p-2">
                    <img src={require('../../images/brand/logo_color.png')} alt="BayJDO Logo" />
                </div>
                {menu &&
                    <div className="col-6 col-md-3 px-1">

                    </div>
                }
            </div>
        </div>
    </TopBar>
}