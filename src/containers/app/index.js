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
import useDragRouterElement from "../../custom-hooks/useDragRouterElement"
import { CSSTransition, TransitionGroup } from "react-transition-group";



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

  //Prepare Router switch animation bheaviour
  const location = useLocation();
  const history = useHistory();
  const [bind, springProps, isScrollingLeft, setIsScrollingLeft,  currentPos] = useDragRouterElement(
    location,
    history
  );
  //Manages the scroll direction when the location changes
  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/")
      setIsScrollingLeft(true)
    if (location.pathname === "/havefun")
      setIsScrollingLeft(false)
  }, [location, setIsScrollingLeft])

  console.log("is scrolling left ?", isScrollingLeft)
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
              handleMenuLinks={handleMenuLinks}

            />
            <RightNavbar handleAudio={handleAudio} />
            <TransitionGroup>
            <CSSTransition
          in={true}
          key={location.key}
          timeout={1000}
          onEnter={(el, isApp) => {
            new TimelineMax({})
              .set(el, {
                position:"absolute",
                left: (idx, el) =>
                  isScrollingLeft ? width : -el.getBoundingClientRect().width,
                transform: "scale(0.7)",
                visibility:"hidden"
              })
              .to(el, 1, { left: 0, transform: "scale(1)",visibility:"visible" });
          }}
          onExit={el => {
            new TimelineMax()
              .set(el, {
                position: "absolute",
                top: 0,
                left: (idx, el) => (isScrollingLeft ? -widthThreshold  : width),
                transform: "scale(0.8)"
              })
              .to(el, 1, {
                top:0,
                left: (idx, el) =>
                  isScrollingLeft
                    ? -el.getBoundingClientRect().width - widthThreshold
                    : el.getBoundingClientRect().width + widthThreshold,
                transform: "scale(0.8)",
                display:"none"
              });
          }}
        >
                <Switch location={location}>
                  <Route exact path="/about">
                    <MainWindowsHoc bind={bind} springProps={springProps} myRef={aboutRef}  >
                      <About />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/projects">
                    <MainWindowsHoc bind={bind} springProps={springProps} myRef={projectsRef} >
                      <Projects />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/technologies">
                    <MainWindowsHoc bind={bind} springProps={springProps} myRef={technologiesRef}  >
                      <Technologies />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/havefun">
                    <MainWindowsHoc bind={bind} springProps={springProps} myRef={havefunRef} >
                      <HaveFun />
                    </MainWindowsHoc>
                  </Route>
                  <Route exact path="/home">
                    <Home bind={bind} springProps={springProps} myRef={homeRef} />
                  </Route>
                  <Route exact path="/">
                    <Home bind={bind} springProps={springProps} myRef={homeRef} />
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
