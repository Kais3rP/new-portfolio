import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/navbar/index"
import './index.css'
import Main from "../../components/main/index"
import About from "../../components/about/index"
import Projects from "../../components/projects/index"
import HaveFun from "../../components/havefun/index"
import Technologies from "../../components/technologies/index"
import * as PIXI from "pixi.js"
import { gsap, TimelineMax } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { PixiPlugin } from "gsap/PixiPlugin"
import water from "../../pics/water.jpg"
import water2 from "../../pics/water2.jpg"
import ripple from "../../pics/ripple.png"
import swan from "../../pics/swan.png"
import clouds from "../../pics/clouds.jpg"
import fish from "../../pics/fish.png"
import tree from "../../pics/tree.png"
import treeNormal from "../../pics/tree_normal.png"
import treeBlur from "../../pics/blurred_tree.png"
import MainWindowsHoc from "../mainwindow/index"

//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(ScrollToPlugin);


export default function App() {
  const [scroll, setScroll] = useState(0);
  const [currentWindow, setCurrentWindow] = useState("main");
  const [isBottom, setIsBottom] = useState(false);
  const [app, setApp] = useState(null);
  const [_firstContainer, set_firstContainer] = useState(null);
  const [_secondContainer, set_secondContainer] = useState(null);
  const [_thirdContainer, set_thirdContainer] = useState(null);
  const [rippleAnimation, setRippleAnimation] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false)
  const [_rippleSprite, set_RippleSprite] = useState(null);
  const [_waterSprite, set_waterSprite] = useState(null);
  const [_water2Sprite, set_water2Sprite] = useState(null);
  const [_cloudsSprite, set_cloudsSprite] = useState(null);
  const [_fishSprite, set_fishSprite] = useState(null);
  const [_normalTreeSprite, set_normalTreeSprite] = useState(null);
  const [_blurredTreeSprite, set_blurredTreeSprite] = useState(null);
  const [waterSpeed, setWaterSpeed] = useState(1);
  const [fishTl, setFishTl] = useState(null);



  const containerRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const technologiesRef = useRef();
  const havefunRef = useRef();
  const arrowRef = useRef();



  useEffect(() => {
    console.log("loading assets effect...")

    //Aliases
    const size = [window.visualViewport.width, window.visualViewport.height + 30];
    const loader = PIXI.Loader.shared;
    const Sprite = PIXI.Sprite;
    const Container = PIXI.Container;
    const ratio = size[0] / size[1];

    //Create the app:
    const app = new PIXI.Application({
      antialias: true,
      resizeTo: window,
      transparent: true
    })
    const firstContainer = new Container();
    const secondContainer = new Container();
    const thirdContainer = new Container();
    //Append the stage to the ref of the container div
    containerRef.current.appendChild(app.view)
    //app Settings
    app.renderer.autoResize = true;
    app.renderer.view.style.touchAction = 'auto';
    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.renderer.resize(size[0], size[1]);
    //Assets loader
    loader
      .add("water", water)
      .add("water2", water2)
      .add("ripple", ripple)
      .add("clouds", clouds)
      .add("fish", fish)
      .add("normal_tree", treeNormal)
      .add("blurred_tree", treeBlur)
      .load(init)
    //Canvas resizing listener and scrolling auto position

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll)

    function handleScroll(e) {
      console.log("scrolling...")
      console.log("scrollY:", document.body.scrollHeight, window.pageYOffset, document.body.clientHeight)
      setCurrentWindow(current => { console.log("current div:", current); return current })
      setIsBottom(isBottom => { console.log("is bottom:", isBottom); return isBottom })

      setScroll(window.pageYOffset)
      if (document.body.scrollHeight - window.pageYOffset <= document.body.clientHeight)
        setIsBottom(true)
      else
        setIsBottom(false)
      //Current window
      if (window.pageYOffset <= window.innerHeight)
        setCurrentWindow("main")
      if (window.pageYOffset <= window.innerHeight + aboutRef.current.scrollHeight && window.pageYOffset > window.innerHeight)
        setCurrentWindow("about")
      if (window.pageYOffset <= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight)
        setCurrentWindow("projects")
      if (window.pageYOffset <= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight)
        setCurrentWindow("technologies")
      if (window.pageYOffset <= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight + havefunRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight)
        setCurrentWindow("havefun")
    }

    function handleResize(e) {
      console.log("resizing...")
      if (e.target.innerWidth < size[0]) {
        app.renderer.resize(e.target.innerWidth, e.target.innerHeight);
      }
    }

    //Function fired on load assets complete
    function init(loader, resources) {
      //Sprites creation
      const waterSprite = new Sprite(resources.water.texture);
      const water2Sprite = new Sprite(resources.water2.texture);
      const rippleSprite = new Sprite(resources.ripple.texture);
      const cloudsSprite = new Sprite(resources.clouds.texture);
      const fishSprite = new Sprite(resources.fish.texture);
      const normalTreeSprite = new Sprite(resources.normal_tree.texture);
      const blurredTreeSprite = new Sprite(resources.blurred_tree.texture);
      //const swanSprite = new Sprite(resources.swan.texture);

      setApp(app);
      set_firstContainer(firstContainer);
      set_secondContainer(secondContainer);
      set_thirdContainer(thirdContainer);
      set_RippleSprite(rippleSprite);
      set_cloudsSprite(cloudsSprite);
      set_waterSprite(waterSprite);
      set_water2Sprite(water2Sprite);
      set_fishSprite(fishSprite);
      set_normalTreeSprite(normalTreeSprite);
      set_blurredTreeSprite(blurredTreeSprite);
      setHasLoaded(true);

    }
    return () => {
      //loader.reset();
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // stage Init

  useEffect(() => {
    //Stage config
    if (hasLoaded) {
      app.stage.filterArea = app.screen;
      app.stage.addChild(_firstContainer, _secondContainer, _thirdContainer);
      _firstContainer.interactive = true;
      _firstContainer.addChild(_rippleSprite, _waterSprite, _cloudsSprite, _fishSprite)
      //_secondContainer.interactive = true;
      //_secondContainer.addChild(_water2Sprite)
      //_thirdContainer.interactive = true;
      //_thirdContainer.addChild(_normalTreeSprite, _blurredTreeSprite)
    }

  }, [hasLoaded])

  //First container animation
  useEffect(() => {
    console.log("Sprites setting")

    if (hasLoaded) {
      _waterSprite.anchor.set(0.5);
      _waterSprite.width = app.renderer.view.width;
      _waterSprite.height = app.renderer.view.height;
      _waterSprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
      _cloudsSprite.anchor.set(0.5);
      _cloudsSprite.scale.set((window.innerWidth / 1000), window.innerHeight / 1000);
      _cloudsSprite.position.set(0);
      _cloudsSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRROREDREPEAT;
      const cloudsFilter = new PIXI.filters.DisplacementFilter(_cloudsSprite, 80);
      _rippleSprite.anchor.set(0.5);
      _rippleSprite.scale.set(0.05);
      const rippleFilter = new PIXI.filters.DisplacementFilter(_rippleSprite);
      rippleFilter.scale.set(100);
      _firstContainer.filters = [cloudsFilter, rippleFilter]
      const tl = new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(_rippleSprite.scale, 3, { x: 2, y: 2 })
        .to(rippleFilter.scale, 3, { x: 2, y: 2 })
      setRippleAnimation(tl);
      _fishSprite.anchor.set(0.5);
      _fishSprite.position.set(200, 200);
      _fishSprite.scale.set(window.innerWidth / 6000)
      _fishSprite.rotation = -0.3;
      const fishTl = new TimelineMax({ yoyo: true })
        .to(_fishSprite, { pixi: { x: window.innerWidth - 50 }, duration: 7 })
        .to(_fishSprite, { pixi: { scaleX: 0 }, duration: 1 })
        .to(_fishSprite, { pixi: { scaleX: -0.3 }, duration: 1 })
        .to(_fishSprite, { pixi: { x: 0, y: window.innerHeight / 2 }, duration: 10 })
        .to(_fishSprite, { pixi: { scaleX: 0 }, duration: 1 })
        .to(_fishSprite, { pixi: { scaleX: 0.3 }, duration: 1 })
        .to(_fishSprite, { pixi: { x: window.innerWidth - 50 }, duration: 12 })
        .to(_fishSprite, { pixi: { scaleX: 0 }, duration: 1 })
        .to(_fishSprite, { pixi: { scaleX: -0.3 }, duration: 1 })
        .to(_fishSprite, { pixi: { x: 0, y: window.innerHeight }, duration: 10 })
        .to(_fishSprite, { pixi: { scaleX: 0 }, duration: 1 })
        .to(_fishSprite, { pixi: { scaleX: 0.3 }, duration: 1 })
      // setFishTl(fishTl)
      window.addEventListener("keydown", (e) => {
        if (fishTl.isActive()) {
          fishTl.pause();
          setTimeout(() => { fishTl.play() }, 2000)
        }
        e.preventDefault();
        if (e.key === "ArrowDown")
          if (_fishSprite) _fishSprite.position.y += 10;
        if (e.key === "ArrowUp")
          if (_fishSprite) _fishSprite.position.y -= 10;
        if (e.key === "ArrowLeft")
          if (_fishSprite) _fishSprite.position.x -= 10;
        if (e.key === "ArrowRight")
          if (_fishSprite) _fishSprite.position.x += 10;

      })

      _firstContainer.addListener("pointerdown", handleWaterClick)
      //Animate @ 60FPS
      //Little trick to read the updated speed state without rerender
      const moveWater = (delta) => {
        setWaterSpeed(
          speed => {
            console.log(speed)
            _cloudsSprite.x += speed * delta;
            _cloudsSprite.y += speed * delta * 2;
            return speed
          }
        )
      }
      app.ticker.add(moveWater)

    }
    function handleWaterClick(e) {
      console.log("canvas clicked")
      const mousePos = e.data.getLocalPosition(_firstContainer)
      const newRippleSprite = new PIXI.Sprite(PIXI.Loader.shared.resources.ripple.texture);
      _firstContainer.addChild(newRippleSprite);
      newRippleSprite.anchor.set(0.5);
      newRippleSprite.scale.set(0.05);
      newRippleSprite.position.x = mousePos.x;
      newRippleSprite.position.y = mousePos.y;
      const newRippleFilter = new PIXI.filters.DisplacementFilter(newRippleSprite);
      newRippleFilter.scale.set(100);
      _firstContainer.filters = [..._firstContainer.filters, newRippleFilter];
      new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(newRippleSprite.scale, 3, { x: 2, y: 2 })
        .to(newRippleFilter.scale, 3, { x: 2, y: 2 })
    }
    return () => {
      if (_firstContainer) _firstContainer.removeListener("click", handleWaterClick)
    }
  }, [hasLoaded])


  //Second Container Animation
  useEffect(() => {
    console.log("Second Animation init")
    if (hasLoaded) {
      //Second animation:
      _water2Sprite.anchor.set(0.5);
      _water2Sprite.width = window.innerWidth;
      _water2Sprite.height = window.innerHeight;
      _water2Sprite.position.set(window.innerWidth / 2, window.innerHeight + window.innerHeight / 2);
    }
    return () => {

    }

  }, [hasLoaded])

  //Third Container Animation
  useEffect(() => {
    console.log("Second Animation init")
    if (hasLoaded) {
      _normalTreeSprite.anchor.set(0.5);
      _normalTreeSprite.width = window.innerWidth;
      _normalTreeSprite.height = window.innerHeight;
      _normalTreeSprite.scale.set(1.3)
      _normalTreeSprite.position.set(window.innerWidth / 2, window.innerHeight * 2);
      _blurredTreeSprite.anchor.set(0.5);
      _blurredTreeSprite.scale.set(1.3)
      _blurredTreeSprite.width = window.innerWidth;
      _blurredTreeSprite.height = window.innerHeight;
      _blurredTreeSprite.position.set(window.innerWidth / 2, window.innerHeight * 2);
      const treeFilter = new PIXI.filters.DisplacementFilter(_blurredTreeSprite, 0);
      _thirdContainer.filters = [treeFilter]

      _thirdContainer.addListener("mousemove", onPointerMove);
      _thirdContainer.addListener("touchmove", onPointerMove)

      function onPointerMove(eventData) {
        setTilt(15, eventData.data.global.x, eventData.data.global.y, treeFilter);
      }
      function setTilt(maxTilt, mouseX, mouseY, displacementFilter) {
        var midpointX = window.innerWidth / 2,
          midpointY = window.innerHeight / 2,
          posX = midpointX - mouseX,
          posY = midpointY - mouseY,
          // consider the ratio of the current position of the mouse to the center of the screen and multiply by the maximum shift
          valX = (posX / midpointX) * maxTilt,
          valY = (posY / midpointY) * maxTilt;
        console.log(valX, valY)
        displacementFilter.scale.x = valX;
        displacementFilter.scale.y = valY;
      }
    }
    return () => {

    }

  }, [hasLoaded])

  //Manage Scrolling arrow animation and Arrow animation
  useEffect(() => {
    console.log("Arrow animation")
    //Arrow animation:
    if (hasLoaded) {
      const arrowTlDown = new TimelineMax()
        .to(arrowRef.current, 0.5, { repeat: -1, yoyo: true, width: "8%", left: "46%", y: 10 })
        .to(arrowRef.current, 1, {
          ease: "linear",
          rotate: 180,
          scrollTrigger: { trigger: havefunRef.current, start: "top bottom", toggleActions: 'restart reset restart reset' }
        })
    }
  }, [hasLoaded])



  function handleRippleAnimation(e) {
    console.log("redrawing ripple")

    _rippleSprite.position.x = e.pageX;
    _rippleSprite.position.y = e.pageY;
    rippleAnimation?.restart();
  }

  function handleWaterSpeed() {
    setWaterSpeed(10)
    setTimeout(() => { setWaterSpeed(2) }, 1000)
  }

  function handleArrowClick() {
    if (isBottom)
      gsap.to(window, { duration: 1, scrollTo: { x: 0, y: 0 } })
    else
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          x: 0,
          y: currentWindow === "main" ?
            aboutRef.current :
            currentWindow === "about" ?
              projectsRef.current :
              currentWindow === "projects" ?
                technologiesRef.current :
                currentWindow === "technologies" ?
                  havefunRef.current :
                  0
        }
      })
  }

  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={containerRef}></div>
          {hasLoaded ? <>
            <svg onClick={handleArrowClick} ref={arrowRef}
              id="arrow-down"
              data-name="Capa 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 560 320.01">
              <g
                id="Rounded_Rectangle_33_copy_4"
                data-name="Rounded Rectangle 33 copy 4">
                <path
                  d="M480,344.18,268.87,131.89a40.16,40.16,0,0,0-57.06,0,40.81,40.81,0,0,0,0,57.43L449.45,428.26a45.73,45.73,0,0,0,61.1,0L748.19,189.32a40.81,40.81,0,0,0,0-57.43,40.16,40.16,0,0,0-57.06,0Z"
                  transform="translate(-200 -119.99)" />
              </g>
            </svg>
            <Navbar handleWaterSpeed={handleWaterSpeed} handleRippleAnimation={handleRippleAnimation} targetRefs={{ aboutRef, projectsRef, technologiesRef, havefunRef }} />
            <Main />
            <MainWindowsHoc myRef={aboutRef} direction={{ right: false }}>
              <About />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={projectsRef} direction={{ right: false }}>
              <Projects />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={technologiesRef} direction={{ right: false }}>
              <Technologies />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={havefunRef} direction={{ right: false }}>
              <HaveFun />
            </MainWindowsHoc>
          </> : <div>...Loading</div>}
        </Col>
      </Row>
    </Container>
  );
}


