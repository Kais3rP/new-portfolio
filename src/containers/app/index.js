import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch, withRouter } from "react-router-dom";
import LeftNavbar from "../../components/left-navbar/index"
import RightNavbar from "../../components/right-navbar/index"
import './index.css'
import Home from "../../components/home/Home"
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
  const [currentLocation, setCurrentLocation] = useState(/\w+$/.exec(window.location.href) ? /\w+$/.exec(window.location.href)[0] : "home");


  const homeRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const technologiesRef = useRef();
  const havefunRef = useRef();
  const homeLinkRef = useRef();
  const aboutLinkRef = useRef();
  const projectsLinkRef = useRef();
  const technologiesLinkRef = useRef();
  const havefunLinkRef = useRef();
  const hereRef = useRef();



 

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
      hereRef
    })

 useAnimateStuffOnceReady(isReady, rippleAnimation, _dropSound, _rippleSprite)



  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={setContainer}></div>
          {isReady ? <>
            <LeftNavbar
              hereRef={hereRef}
              linkRefs={{
                homeLinkRef,
                aboutLinkRef,
                projectsLinkRef,
                technologiesLinkRef,
                havefunLinkRef,
              }}
              handleMenuLinks={handleMenuLinks}
              currentLocation={currentLocation}
            />
            <RightNavbar handleAudio={handleAudio} />
            <Switch>
            <Route exact path="/about">
            <MainWindowsHoc myRef={aboutRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} >
               <About /> 
            </MainWindowsHoc>
            </Route>
            <Route exact path="/projects">
            <MainWindowsHoc myRef={projectsRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation}>
             <Projects  /> 
            </MainWindowsHoc>
            </Route>
            <Route exact path="/technologies">
            <MainWindowsHoc myRef={technologiesRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} >
             <Technologies  /> 
            </MainWindowsHoc>
            </Route>
            <Route exact path="/havefun">
            <MainWindowsHoc myRef={havefunRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} >
            <HaveFun  /> 
            </MainWindowsHoc>
            </Route>
            <Route exact path="/home">
          <Home myRef={homeRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
            </Route>    
            <Route exact path="/">
          <Home myRef={homeRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
            </Route>          
            </Switch>
          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}
