import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Error404 from "../../components/errors/Error404"



//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(ScrollToPlugin);



export default function App() {
console.log("rerendering app")
  const location = useLocation();
  const history = useHistory();

  const [isReady, setIsReady] = useState(false);
  const [container, setContainer] = useState(null);
  const [isScrollingLeft, setIsScrollingLeft] = useState(location.pathname === "/home" ? true : false)
 
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

  const width = window.innerWidth;
  const widthThreshold = width/3;



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
    isMuted,
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

  useAnimateStuffOnceReady({ isReady, rippleAnimation, _dropSound, _rippleSprite, isMuted, handleMenuLinks, location})



 function handleScrollDirection(bool){
setIsScrollingLeft(bool);
 }
  return (
    <Container className=" main-container main-theme" fluid>
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
            />
            <RightNavbar handleAudio={handleAudio} isMuted={isMuted} />
            <TransitionGroup>
            <CSSTransition
          in={true}
          key={location.key}
          timeout={1800}
          onEnter={(el, isApp) => {
            new TimelineMax({})
              .set(el, {
                position:"absolute",
                left: (idx, el) =>
                  isScrollingLeft ? width : -el.getBoundingClientRect().width,
                  top:0,
              })
              .to(el, 2, { left: 0, top:0});
          }}
          onExit={el => {
            new TimelineMax()
              .set(el, {
                position: "absolute",
                top: 0,
                left: (idx, el) => (isScrollingLeft ? -widthThreshold  : widthThreshold),
              })
              .to(el, 2, {
                top:0,
                left: (idx, el) =>
                  isScrollingLeft
                    ? -el.getBoundingClientRect().width 
                    : el.getBoundingClientRect().width ,
             
                
              });  
          }}
          unmountOnExit={true}
        >
                <Switch location={location}>
                  <Route exact path="/about">
                    <MainWindowsHoc  myRef={aboutRef} handleScrollDirection={handleScrollDirection}  >
                      <About />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/projects">
                    <MainWindowsHoc  myRef={projectsRef} handleScrollDirection={handleScrollDirection} >
                      <Projects />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/technologies">
                    <MainWindowsHoc  myRef={technologiesRef} handleScrollDirection={handleScrollDirection} >
                      <Technologies />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/havefun">
                    <MainWindowsHoc myRef={havefunRef} handleScrollDirection={handleScrollDirection} >
                      <HaveFun />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/home">
                    <Home myRef={homeRef}  />
                  </Route>
                  <Route exact path="/index.html">
                    <Home  myRef={homeRef} />
                  </Route>
                  <Route exact path="/">
                    <Home  myRef={homeRef} />
                  </Route>
                  <Route exact path="/*">
                  <MainWindowsHoc >
                      <Error404 />
                    </MainWindowsHoc>
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}
