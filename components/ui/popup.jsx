import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-modal";
import styled from '@emotion/styled'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import classNames from "classnames";

import '../../styles/ui/popup.css';

const TopbarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 500;
  width: 100%;
`;

const TopbarSpacer = styled.div`
  width: 100%;
  @media screen and (max-width: 720px){
    margin-top: 32px;
  }
`;

const Topbar = styled.div`
    display: flex;
    z-index: 7000;
    margin-bottom: 0.5rem;
    position: sticky;
    background-color: white;
    padding: 0.5rem;
    font-size: 1rem;
    min-height: 7.5vh;
    i {
      --ggs: 1.3
    }
`;

const PopUp = ({
       children, title, label = 'modal', appElement = '.app',  button,
       topbarClassName, closeButtonClassName, className,
       isOpen = false, onClose, showTopbarOnMobile = true, showTopbar = false
   }) => {

    useEffect(() => {
        const targetElement = document.querySelector(appElement);
        if(isOpen)
            disableBodyScroll(targetElement);
    }, [isOpen]);

    const handleOnClose = () => {
        const targetElement = document.querySelector(appElement);
        enableBodyScroll(targetElement);
        clearAllBodyScrollLocks();
        onClose();
    };

    if(appElement)
        Modal.setAppElement(appElement);

    const [space, setSpacing] = useState('8vh');
    const [width, setWidth] = useState('100%');
    const topbarRef = useRef();
    const wrapRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current && space !== topbarRef.current.clientHeight)
            setSpacing(topbarRef.current.clientHeight);
        if(wrapRef && wrapRef.current && width !== wrapRef.current.clientWidth)
            setWidth(wrapRef.current.clientWidth);
    });

    useEffect(() => {
        return () => {
            clearAllBodyScrollLocks();
        }
    }, []);

    useEffect(() => {
        if(!isOpen)
            clearAllBodyScrollLocks();
    }, [isOpen]);

    const renderTopbar = () =>
        <React.Fragment>
            <TopbarWrapper ref={wrapRef}>
                <Topbar style={{ width: width }} className={classNames(topbarClassName, "popup-topbar")} ref={topbarRef}>
                    <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
                        <button onClick={handleOnClose} className={classNames(closeButtonClassName, "plain-button p-2")}>
                            <i className="gg-close" />
                        </button>
                    </div>
                    {title &&
                    <div style={{ width: `calc(${width}px - 45px)` }} className="d-flex align-items-center px-2">
                        <b>{ title }</b>
                    </div>
                    }
                    {button &&
                    <div style={{ width: `calc(${width}px - 45px)` }} className="d-flex align-items-center justify-content-end px-2">
                        {button}
                    </div>
                    }
                </Topbar>
            </TopbarWrapper>
            <TopbarSpacer style={{ height: space, width: '100%' }} />
        </React.Fragment>;

    return <Modal
        isOpen={isOpen}
        onRequestClose={handleOnClose}
        className={classNames("modal-container position-relative", className)}
        overlayClassName="modal-overlay"
        contentLabel={label}
    >
        <div>
            {showTopbar ? renderTopbar() : showTopbarOnMobile && <div className="d-md-none d-flex">{renderTopbar()}</div>}
            {children}
        </div>
    </Modal>
};

export default PopUp;