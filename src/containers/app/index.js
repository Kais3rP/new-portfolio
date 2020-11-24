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
import * as PIXISound from "pixi-sound"
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
import fish2 from "../../pics/fish2.png"
import fish3 from "../../pics/fish3.png"
import fish4 from "../../pics/fish4.png"
import fish5 from "../../pics/fish5.png"
import tree from "../../pics/tree.png"
import treeNormal from "../../pics/tree_normal.png"
import treeBlur from "../../pics/blurred_tree.png"
import flowSound from "../../sound/flow.wav"
import dropSound from "../../sound/drop.wav"
import MainWindowsHoc from "../mainwindow/index"
import LoadingView from "../../components/loading-view/index"
import Arrow from "../../components/arrow"


//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(ScrollToPlugin);



export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [previousWindow, setPreviousWindow] = useState("home");
  const [currentWindow, setCurrentWindow] = useState("home");
  const [prevNavLinkAnimated, setPrevNavLinkAnimated] = useState("home")
  const [isBottom, setIsBottom] = useState(false);
  const [app, setApp] = useState(null);
  const [_firstContainer, set_firstContainer] = useState(null);
  const [_secondContainer, set_secondContainer] = useState(null);
  const [_thirdContainer, set_thirdContainer] = useState(null);
  const [rippleAnimation, setRippleAnimation] = useState(null);
  const [_rippleSprite, set_RippleSprite] = useState(null);
  const [_waterSprite, set_waterSprite] = useState(null);
  const [_water2Sprite, set_water2Sprite] = useState(null);
  const [_cloudsSprite, set_cloudsSprite] = useState(null);
  const [_fishSprite, set_fishSprite] = useState(null);
  const [_fish2Sprite, set_fish2Sprite] = useState(null);
  const [_fish3Sprite, set_fish3Sprite] = useState(null);
  const [_fish4Sprite, set_fish4Sprite] = useState(null);
  const [_fish5Sprite, set_fish5Sprite] = useState(null);
  const [_normalTreeSprite, set_normalTreeSprite] = useState(null);
  const [_blurredTreeSprite, set_blurredTreeSprite] = useState(null);
  const [_titleText, set_titleText] = useState(null);
  const [_flowSound, set_flowSound] = useState(null);
  const [_dropSound, set_dropSound] = useState(null);
  const [waterSpeed, setWaterSpeed] = useState(2);

  const containerRef = useRef();
  const mainRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const technologiesRef = useRef();
  const havefunRef = useRef();
  const arrowRef = useRef();
  const homeLinkRef = useRef();
  const aboutLinkRef = useRef();
  const projectsLinkRef = useRef();
  const technologiesLinkRef = useRef();
  const havefunLinkRef = useRef();
  const arrowLinkRef = useRef();
  const hereRef = useRef();

  //This is the effect that checks for the isReady state
  useEffect(() => {
    if (isReady)
      _flowSound.play()
    let rippleTimeout;
    playRippleAnimation();
    //Arrow infinite animation
    const arrowTlDown = new TimelineMax()
      .to(arrowRef.current, 0.3, { repeat: -1, yoyo: true, y: 15 })
      .to(arrowRef.current, 1, {
        rotate: 180,
        scrollTrigger: { trigger: havefunRef.current, start: "center bottom", toggleActions: 'restart reset restart reset' }
      })

    function playRippleAnimation() {
      rippleAnimation?.restart()
      _dropSound?.play()
      _rippleSprite?.position.set(0, 0)
      rippleTimeout = setTimeout(playRippleAnimation, 6000)
    }
    return () => { clearTimeout(rippleTimeout) }
  }, [isReady])

  //Effect that loads the assets and sets the basic app containers
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
      .add("water3", water)
      .add("water4", water)
      .add("water5", water)
      .add("water6", water)
      .add("water7", water)
      .add("water8", water)
      .add("water9", water)
      .add("water0", water)
      .add("water2", water2)
      .add("ripple", ripple)
      .add("clouds", clouds)
      .add("fish", fish)
      .add("fish2", fish2)
      .add("fish3", fish3)
      .add("fish4", fish4)
      .add("fish5", fish5)
      .add("normal_tree", treeNormal)
      .add("blurred_tree", treeBlur)
      .add("flowSound", flowSound)
      .add("dropSound", dropSound)
      .load(init)

    loader.onProgress.add(data => {
      console.log(data.progress)
      setLoadProgress(Math.ceil(data.progress))
    })

    loader.onComplete.add((a, b, c) => {
      console.log("progress:", a, b, c)
      setHasLoaded(true);
    }
    )
    //Function fired on load assets complete
    function init(loader, resources) {
      //Sprites creation
      const waterSprite = new Sprite(resources.water.texture);
      const water2Sprite = new Sprite(resources.water2.texture);
      const rippleSprite = new Sprite(resources.ripple.texture);
      const cloudsSprite = new Sprite(resources.clouds.texture);
      const fishSprite = new Sprite(resources.fish.texture);
      const fish2Sprite = new Sprite(resources.fish2.texture);
      const fish3Sprite = new Sprite(resources.fish3.texture);
      const fish4Sprite = new Sprite(resources.fish4.texture);
      const fish5Sprite = new Sprite(resources.fish5.texture);
      const normalTreeSprite = new Sprite(resources.normal_tree.texture);
      const blurredTreeSprite = new Sprite(resources.blurred_tree.texture);
      //const swanSprite = new Sprite(resources.swan.texture);
      const titleText = new PIXI.Text('WELCOME', { fontFamily: 'Arial', fontSize: 50, fill: 0xFFFFFF, align: 'center' });
      const flowSound = PIXISound.default.Sound.from({
        url: resources.flowSound,
        loop: true,
        volume: 0.1,
        speed: 0.3,
        autoStart: false
      });
      const dropSound = PIXISound.default.Sound.from({
        url: resources.dropSound,
        autostart: false,
        volume: 0.1

      })

      setApp(app);
      set_firstContainer(firstContainer);
      set_secondContainer(secondContainer);
      set_thirdContainer(thirdContainer);
      set_RippleSprite(rippleSprite);
      set_cloudsSprite(cloudsSprite);
      set_waterSprite(waterSprite);
      set_water2Sprite(water2Sprite);
      set_fishSprite(fishSprite);
      set_fish2Sprite(fish2Sprite);
      set_fish3Sprite(fish3Sprite);
      set_fish4Sprite(fish4Sprite);
      set_fish5Sprite(fish5Sprite);
      set_normalTreeSprite(normalTreeSprite);
      set_blurredTreeSprite(blurredTreeSprite);
      set_titleText(titleText)
      set_flowSound(flowSound)
      set_dropSound(dropSound)
    }
  }, [])

  // stage Init Effect
  useEffect(() => {
    //Stage config
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //Scoped mouse position variables
    const mousePos = {
      x: 0,
      y: 0
    }

    const allFishes = [
      {
        fish: _fishSprite,
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: 0
      },
      {
        fish: _fish2Sprite,
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: window.innerHeight / 4
      },
      {
        fish: _fish3Sprite,
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: window.innerHeight / 3
      },
      {
        fish: _fish4Sprite,
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: window.innerHeight / 2
      },
      {
        fish: _fish5Sprite,
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: window.innerHeight
      },
    ]

    //Assign a turning timeline to the fishes
    for (let fish of allFishes) {
      fish.tlLeft =
        new TimelineMax()
          .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
          .to(fish.fish, { pixi: { scaleX: -window.innerWidth / 6000 }, duration: 0.1 })
      fish.tlRight =
        new TimelineMax()
          .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
          .to(fish.fish, { pixi: { scaleX: window.innerWidth / 6000 }, duration: 0.1 })
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    if (hasLoaded) {
      app.stage.filterArea = app.screen;
      app.stage.addChild(_firstContainer, _secondContainer, _thirdContainer);
      _firstContainer.interactive = true;
      _firstContainer.addChild(_rippleSprite, _waterSprite, _cloudsSprite, _fishSprite, _fish2Sprite, _fish3Sprite, _fish4Sprite, _fish5Sprite, _titleText)
      //Fishes animations to follow the mouse pointer and to run back away to the starting positions 
      let fishFollowTl = new TimelineMax({})
        .to(allFishes.map(fish => fish.fish), 10, { x: () => mousePos.x, y: (idx, target) => target.position.y, ease: "M0,0 C0.476,0.134 0,-0.014 0.774,0.294 0.865,0.33 0.738,0.78 1,0.986 " })
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
      _firstContainer.addListener("pointermove", handleMouseMove);
      _firstContainer.addListener("pointerdown", handleWaterClick);
      //Animate @ 60FPS
      app.ticker.add(moveWater);
      app.ticker.add(rotateFish);
      //This handles the rotation of the fishes toward the mouse pointer
      function rotateFish() {
        for (let fish of allFishes) {
          if (fish.direction === "left") {
            let dx = fish.fish.position.x - mousePos.x;
            let dy = fish.fish.position.y - mousePos.y;
            fish.fish.rotation = Math.atan2(dy, dx)
          } else {
            let dx = mousePos.x - fish.fish.position.x;
            let dy = mousePos.y - fish.fish.position.y;
            fish.fish.rotation = Math.atan2(dy, dx)
          }
        }
      }
      //Little trick to read the updated speed state without rerender
      function moveWater(delta) {
        setWaterSpeed(
          speed => {
            console.log(speed)
            _cloudsSprite.x += speed * delta;
            _cloudsSprite.y += speed * delta * 2;
            return speed
          }
        )
      }
      function handleMouseMove(e) {
        mousePos.x = e.data.global.x;
        mousePos.y = e.data.global.y;
        fishFollowTl?.invalidate();
        fishFollowTl?.restart();

        //This handles the fish direction shift during mouse moving from left to right
        for (let fish of allFishes) {
          if (fish.fish.position.x >= mousePos.x) {
            if (fish.direction === "right")
              fish.tlLeft.restart();
            fish.direction = "left"
          }
          if (fish.fish.position.x <= mousePos.x) {
            if (fish.direction === "left")
              fish.tlRight.restart();
            fish.direction = "right"
          }
        }
      }

      function handleScroll(e) {
      
        const pageRanges = {
          home: window.innerHeight,
          about:  window.innerHeight + aboutRef.current.scrollHeight && window.pageYOffset >= window.innerHeight,
          projects: window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight,
          technologies: window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight,
          havefun: window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight + havefunRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight
        }
        setScroll(window.pageYOffset);
        
        if (document.body.scrollHeight - window.pageYOffset <= 100)
          setIsBottom(true)
        else
          setIsBottom(false)
          //Handle links menu animations on scroll
          if (currentWindow !== previousWindow)
        
        //Current window
        if (window.pageYOffset <= pageRanges.home) {
          console.log("setting home")
          _titleText.text = "WELCOME";
          setCurrentWindow("home")
          if (prevNavLinkAnimated !== "home"){
            HTMLFormControlsCollection.log("setting previous link as 'home'")
          handleMenuLinks(homeLinkRef, mainRef, hereRef, prevNavLinkAnimated, setPrevNavLinkAnimated )
          setPrevNavLinkAnimated("home")
          }
        }

        if (window.pageYOffset <= pageRanges.about) {
          console.log("setting about")
          _titleText.text = "ABOUT ME";
          setPreviousWindow(currentWindow)
          setCurrentWindow("about");         
        }

        if (window.pageYOffset <= pageRanges.projects) {
          console.log("setting projects")
          _titleText.text = "MY PROJECTS";
          setPreviousWindow(currentWindow)
          setCurrentWindow("projects")
        }
        if (window.pageYOffset <= pageRanges.technologies) {
          console.log("setting technologies")
          _titleText.text = "TECHNOLOGIES I USE";
          setPreviousWindow(currentWindow)
          setCurrentWindow("technologies")
        }
        if (window.pageYOffset <= pageRanges.havefun) {
          console.log("setting have fun")
          _titleText.text = "HAVE FUN";
          setPreviousWindow(currentWindow)
          setCurrentWindow("havefun")
        }
      }

      function handleResize(e) {
        console.log("resizing...")
        if (e.target.innerWidth < app.renderer.width) {
          app.renderer.resize(e.target.innerWidth, e.target.innerHeight);
        }
      }

      function handleWaterClick(e) {
        console.log("canvas clicked")
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
        _dropSound.play()
      }
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [hasLoaded])

  //First container settings
  useEffect(() => {
    console.log("Sprites setting")
    if (hasLoaded) {
      _waterSprite.anchor.set(0.5);
      _waterSprite.width = app.renderer.view.width;
      _waterSprite.height = app.renderer.view.height;
      _waterSprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
      _waterSprite.scale.set(1)
      _cloudsSprite.anchor.set(0.5);
      _cloudsSprite.scale.set((window.innerWidth / 1000), window.innerHeight / 1000);
      _cloudsSprite.position.set(0);
      _cloudsSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRROREDREPEAT;
      const cloudsFilter = new PIXI.filters.DisplacementFilter(_cloudsSprite, 80);
      _rippleSprite.anchor.set(0.5);
      _rippleSprite.scale.set(0.05);
      _rippleSprite.position.set(0, 0)
      const rippleFilter = new PIXI.filters.DisplacementFilter(_rippleSprite);
      rippleFilter.scale.set(100);
      _firstContainer.filters = [cloudsFilter, rippleFilter]
      const rippleTl = new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(_rippleSprite.scale, 3, { x: 2, y: 2 })
        .to(rippleFilter.scale, 3, { x: 2, y: 2 })
      setRippleAnimation(rippleTl);

      //Setting fishes sprites 
      _fishSprite.anchor.set(0.5);
      _fishSprite.position.set(-window.innerWidth / 10, 0);
      _fishSprite.scale.set(window.innerWidth / 6000)
      _fishSprite.rotation = -0.3;

      _fish2Sprite.anchor.set(0.5);
      _fish2Sprite.position.set(-window.innerWidth / 10, (1 / 4) * window.innerHeight);
      _fish2Sprite.scale.set(window.innerWidth / 6000)
      _fish2Sprite.rotation = 0;

      _fish3Sprite.anchor.set(0.5);
      _fish3Sprite.position.set(-window.innerWidth / 10, (2 / 4) * window.innerHeight);
      _fish3Sprite.scale.set(window.innerWidth / 6000)
      _fish3Sprite.rotation = 0;

      _fish4Sprite.anchor.set(0.5);
      _fish4Sprite.position.set(-window.innerWidth / 10, (3 / 4) * window.innerHeight);
      _fish4Sprite.scale.set(window.innerWidth / 6000)
      _fish4Sprite.rotation = -0.3;

      _fish5Sprite.anchor.set(0.5);
      _fish5Sprite.position.set(-window.innerWidth / 10, window.innerHeight);
      _fish5Sprite.scale.set(window.innerWidth / 6000)
      _fish5Sprite.rotation = -0.3;

      //Text config
      _titleText.anchor.set(0.5)
      _titleText.position.set(app.renderer.width / 2, (app.renderer.height / 100) * 10)
    }
    return () => {

    }
  }, [hasLoaded])


  //Second Container setting
  useEffect(() => {
    console.log("Second Animation init")
    if (hasLoaded) {

    }
    return () => {

    }

  }, [hasLoaded])

  //Third Container Setting
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
        var midpointX = app.renderer.innerWidth / 2,
          midpointY = app.renderer.innerHeight / 2,
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
    console.log(currentWindow)
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

  function handleAudio(isMuted) {
    if (isMuted) {
      _flowSound.resume();
      _dropSound.resume();
    } else {
      _flowSound.pause();
      _dropSound.pause();
    }
  }

  function handleMenuLinks(targetRef, windowRef, hereRef, prevTargetRef, setPrevTarget, optionalCb) {
    console.log(targetRef, prevTargetRef)
    if (optionalCb) optionalCb();
    if (targetRef.current !== prevTargetRef?.current) {
      const goBack = new TimelineMax()
        .to(prevTargetRef?.current, 1, { color: "#66ccff", y: 0, duration: 1, ease: "bounce" })
      setPrevTarget(targetRef)
    }
    gsap.to(window, { duration: 1, scrollTo: { x: 0, y: windowRef.current } })
    const linkFall = new TimelineMax()
      .to(targetRef.current, 1, { color: "#ff6600", y: targetRef.current.parentNode.getBoundingClientRect().height - (targetRef.current.getBoundingClientRect().y - targetRef.current.parentNode.getBoundingClientRect().y) - 30, ease: "bounce" })
    gsap.to(hereRef.current, { width: "+=12", left: "-=6", duration: 0.7, visibility: "visible", modifiers: { width: checkHereWidth, left: checkHereLeft } })
    
    function checkHereWidth(width) {
      console.log(width)
      width = +width.split("px")[0]
      return width >= 143 ? "71px" : width + "px"
    }

    function checkHereLeft(left) {
      left = +left.split("px")[0]
      return left <= 15 ? "49.5px" : left + "px"
    }
  }

  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={containerRef}></div>
          {isReady ? <>
            <Arrow id="arrow-down" onClick={handleArrowClick} myRef={arrowRef} />
            <Navbar 
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
              handleWaterSpeed={handleWaterSpeed}
              handleRippleAnimation={handleRippleAnimation}
              targetRefs={{
                mainRef,
                aboutRef,
                projectsRef,
                technologiesRef,
                havefunRef
              }} />
            <div id="home-window" ref={mainRef}></div>
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
          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}


