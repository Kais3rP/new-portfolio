import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import LeftNavbar from "../../components/left-navbar/index"
import RightNavbar from "../../components/right-navbar/index"
import './index.css'
import About from "../../components/about/index"
import Projects from "../../components/projects/index"
import HaveFun from "../../components/havefun/index"
import Technologies from "../../components/technologies/index"
import * as PIXI from "pixi.js"
import * as PIXISound from "pixi-sound"
import { gsap, TimelineMax } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { PixiPlugin } from "gsap/PixiPlugin"
import MainWindowsHoc from "../mainwindow/index"
import LoadingView from "../../components/loading-view/index"
import Arrow from "../../components/arrow"
import useLoadAssets from "./useLoadAssets"
import useHandleListenersAndSpritesAnimation from "./useHandleListenersAndSpriteAnimations"
import useAnimateStuffOnceReady from "./useAnimateStuffOnceReady";

//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(ScrollToPlugin);



export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [container, setContainer] = useState(null);


  const homeRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const technologiesRef = useRef();
  const havefunRef = useRef();
  const arrowDownRef = useRef();
  const arrowUpRef = useRef();
  const homeLinkRef = useRef();
  const aboutLinkRef = useRef();
  const projectsLinkRef = useRef();
  const technologiesLinkRef = useRef();
  const havefunLinkRef = useRef();
  const arrowLinkRef = useRef();
  const hereRef = useRef();
  const previousLinkRef = useRef()


 

  const {
    app,
    _firstContainer,
    _rippleSprite,
    _cloudsSprite,
    _waterSprite,
    allFishes,
    _titleText,
    _flowSound,
    _dropSound,
    loadProgress,
    hasLoaded
  } = useLoadAssets(container)

  const {
    handleArrowDownClick,
    handleArrowUpClick,
    handleMenuLinks,
    handleAudio,
    rippleAnimation
  } = useHandleListenersAndSpritesAnimation(
    hasLoaded,
    isReady,
    setIsReady,
    app,
    _waterSprite,
    _cloudsSprite,
    _rippleSprite,
    allFishes,
    _dropSound,
    _firstContainer,
    _titleText,
    _flowSound,
    {
      homeLinkRef,
      aboutLinkRef,
      projectsLinkRef,
      technologiesLinkRef,
      havefunLinkRef,
      arrowLinkRef,
      previousLinkRef
    },
    {

      homeRef,
      aboutRef,
      projectsRef,
      technologiesRef,
      havefunRef,
      hereRef
    })

 useAnimateStuffOnceReady(isReady, homeRef, arrowDownRef, havefunRef, arrowUpRef, handleMenuLinks, homeLinkRef, previousLinkRef, rippleAnimation, _dropSound, _rippleSprite)



  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={setContainer}></div>
          {isReady ? <>
            <Arrow id="arrow-down" onClick={handleArrowDownClick} myRef={arrowDownRef} />
            <Arrow id="arrow-up" onClick={handleArrowUpClick} myRef={arrowUpRef} />
            <LeftNavbar
              hereRef={hereRef}
              linkRefs={{
                homeLinkRef,
                aboutLinkRef,
                projectsLinkRef,
                technologiesLinkRef,
                havefunLinkRef,
                arrowLinkRef
              }}
              handleMenuLinks={handleMenuLinks}
              handleAudio={handleAudio}
              targetRefs={{
                homeRef,
                aboutRef,
                projectsRef,
                technologiesRef,
                havefunRef
              }}

            />
            <RightNavbar />
            <div id="home-window" ref={homeRef}></div>
            <MainWindowsHoc myRef={aboutRef} >
               <About /> 
            </MainWindowsHoc>
            <MainWindowsHoc myRef={projectsRef} >
             <Projects  /> 
            </MainWindowsHoc>
            <MainWindowsHoc myRef={technologiesRef} >
             <Technologies  myRef={technologiesRef}/> 
            </MainWindowsHoc>
            <MainWindowsHoc myRef={havefunRef} >
            <HaveFun  /> 
            </MainWindowsHoc>
          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}


