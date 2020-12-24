import React, { useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch } from "react-router-dom"
import LeftNavbar from "../../components/left-navbar/index"
import RightNavbar from "../../components/right-navbar/index"
import './index.css'
import Home from "../../components/home/Home"
import About from "../../components/about/index"
import Projects from "../../components/projects/index"
import HaveFun from "../../components/havefun/index"
import Technologies from "../../components/technologies/index"
import * as PIXI from "pixi.js"
import { gsap } from "gsap"
import { PixiPlugin } from "gsap/PixiPlugin"
import MainWindowsHoc from "../mainwindow/index"
import LoadingView from "../../components/loading-view/index"
import useLoadAssets from "./useLoadAssets"
import useHandleListenersAndSpritesAnimation from "./useHandleListenersAndSpriteAnimations"
import useAnimateStuffOnceReady from "./useAnimateStuffOnceReady"
import Error404 from "../../components/errors/Error404"
import TurnedOffScreen from "../../components/turnedoff/TurnedOffScreen"
import { windowsText } from "../../data/windowsText"

//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(PixiPlugin);

export default function App() {

  const [isReady, setIsReady] = useState(false);
  const [container, setContainer] = useState(null);

  const homeLinkRef = useRef();
  const aboutLinkRef = useRef();
  const projectsLinkRef = useRef();
  const technologiesLinkRef = useRef();
  const havefunLinkRef = useRef();
  const hereRef = useRef();

  //--------------------------
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
    _electricSound,
    _circusSound,
    _shutSound,
    _powerSound,
    loadProgress,
    hasLoaded
  } = useLoadAssets(container)

  const {
    handleMenuLinks,
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
    _circusSound,
    _shutSound,
    _electricSound,
    _powerSound,
    {
      homeLinkRef,
      aboutLinkRef,
      projectsLinkRef,
      technologiesLinkRef,
      havefunLinkRef,
      hereRef
    })

  useAnimateStuffOnceReady({ isReady, rippleAnimation, _dropSound, _electricSound, _rippleSprite, handleMenuLinks })


//console.log("rerendering main app")
  return (
    <Container className=" main-container main-theme" fluid >
      <Row>
        <Col>
        <TurnedOffScreen style={{zIndex:1}} />
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
            <RightNavbar _electricSound={_electricSound} />
            <Switch>
              <Route exact path="/about">
                <MainWindowsHoc  text={windowsText.about} >
                  <About />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/projects">
                <MainWindowsHoc text={windowsText.projects} >
                  <Projects />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/technologies">
                <MainWindowsHoc text={windowsText.techs} >
                  <Technologies />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/havefun">
                <MainWindowsHoc text={windowsText.havefun} >
                  <HaveFun />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/home">
                <MainWindowsHoc >
                  <Home />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/index.html">
                <MainWindowsHoc >
                  <Home />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/">
                <MainWindowsHoc>
                  <Home />
                </MainWindowsHoc>
              </Route>
              <Route exact path="/*">
                <MainWindowsHoc >
                  <Error404 />
                </MainWindowsHoc>
              </Route>
            </Switch>

          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}
