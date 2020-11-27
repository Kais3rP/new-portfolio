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
import createNewPixiApp from "../../helpers/createNewPixiApp"
import water from "../../pics/water.jpg"
import water2 from "../../pics/water2.jpg"
import ripple from "../../pics/ripple.png"
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
  const [_previousWindow, set_PreviousWindow] = useState("home");
  const [_currentWindow, set_CurrentWindow] = useState("home");
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
  const [allFishes, setAllFishes] = useState([]);
  const [_normalTreeSprite, set_normalTreeSprite] = useState(null);
  const [_blurredTreeSprite, set_blurredTreeSprite] = useState(null);
  const [_titleText, set_titleText] = useState(null);
  const [_flowSound, set_flowSound] = useState(null);
  const [_dropSound, set_dropSound] = useState(null);
  const [waterSpeed, setWaterSpeed] = useState(2);
  const [isBallDeflating, setIsBallDeflating] = useState(false)

  const containerRef = useRef();
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
  const previousLink = useRef()

  //This is the effect that checks for the isReady state
  useEffect(() => {
    let rippleTimeout;
    if (isReady) {
      //_flowSound.play()
      //Play the ripple continuous animation
      playRippleAnimation();
      //Play the Arrows infinite animation
      const arrowTlDown = new TimelineMax()
        .to(arrowDownRef.current, 0.3, { repeat: -1, yoyo: true, y: 15 })
        .to(arrowDownRef.current, 1, {
          rotate: 180,
          scrollTrigger: { trigger: havefunRef.current, start: "center bottom", toggleActions: 'restart reset restart reset' }
        })
      gsap.set(arrowUpRef.current, { rotate: 180 });
      const arrowTlUp = new TimelineMax()
        .to(arrowUpRef.current, 0.3, { repeat: -1, yoyo: true, y: -15 })
        .to(arrowUpRef.current, 1, {
          rotate: 180,
          scrollTrigger: { trigger: homeRef.current, start: "top top", toggleActions: 'restart reset restart reset' }
        })
      //Move the first nav menu link on load
      handleMenuLinks(homeLinkRef, previousLink);

      function playRippleAnimation() {
        rippleAnimation?.restart()
        _dropSound?.play()
        _rippleSprite?.position.set(0, 0)
        rippleTimeout = setTimeout(playRippleAnimation, 6000)
      }
    }



    return () => { clearTimeout(rippleTimeout) }
  }, [isReady])

  //Effect that creates the pixi App, loads the assets and sets the basic app containers
  useEffect(() => {
    console.log("loading assets effect...")

const {
  app,
  loader,
  Sprite,
  Container,
  ratio
} =  createNewPixiApp(window.visualViewport.width, window.visualViewport.height + 30, containerRef.current)
   
    const firstContainer = new Container();
    const secondContainer = new Container();
    const thirdContainer = new Container();
    
    //Assets loader
    loader
      .add("water", water)
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

    loader.onComplete.add(() => {
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

      const allFishes = [
        {
          fish: fishSprite,
          direction: "right",
          startX: -window.innerWidth / 10,
          startY: 0
        },
        {
          fish: fish2Sprite,
          direction: "right",
          startX: -window.innerWidth / 10,
          startY: window.innerHeight / 4
        },
        {
          fish: fish3Sprite,
          direction: "right",
          startX: -window.innerWidth / 10,
          startY: window.innerHeight / 3
        },
        {
          fish: fish4Sprite,
          direction: "right",
          startX: -window.innerWidth / 10,
          startY: window.innerHeight / 2
        },
        {
          fish: fish5Sprite,
          direction: "right",
          startX: -window.innerWidth / 10,
          startY: window.innerHeight
        },
      ]

      setApp(app);
      set_firstContainer(firstContainer);
      set_secondContainer(secondContainer);
      set_thirdContainer(thirdContainer);
      set_RippleSprite(rippleSprite);
      set_cloudsSprite(cloudsSprite);
      set_waterSprite(waterSprite);
      set_water2Sprite(water2Sprite);
      setAllFishes(allFishes)
      set_normalTreeSprite(normalTreeSprite);
      set_blurredTreeSprite(blurredTreeSprite);
      set_titleText(titleText)
      set_flowSound(flowSound)
      set_dropSound(dropSound)
    }
  }, [])

  //Stage Init Effect
  //Handling resize, scroll, pointermove, and click events
  useEffect(() => {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //Scoped mouse position variables
    const mousePos = {
      x: 0,
      y: 0
    }

    let currentWindow = "";
    let previousWindow = "";

    //Assign a turning timeline to the fishes
    for (let fish of allFishes) {
      fish.tlLeft =
        new TimelineMax()
          .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
          .to(fish.fish, { pixi: { scaleX: -0.3 }, duration: 0.1 })
      fish.tlRight =
        new TimelineMax()
          .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
          .to(fish.fish, { pixi: { scaleX: 0.3 }, duration: 0.1 })
    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    if (hasLoaded) {
      app.stage.filterArea = app.screen;
      app.stage.addChild(_firstContainer);
      _firstContainer.interactive = true;
      _firstContainer.addChild(_rippleSprite, _waterSprite, _cloudsSprite, _titleText)
      for (let fish of allFishes)
        _firstContainer.addChild(fish.fish)
      //Fishes animations to follow the mouse pointer and to run back away to the starting positions 
      let fishFollowTl = new TimelineMax({})
        .to(allFishes.map(fish => fish.fish), 10, { x: () => mousePos.x, y: (idx, target) => target.position.y, ease: "M0,0 C0.476,0.134 0,-0.014 0.774,0.294 0.865,0.33 0.738,0.78 1,0.986 " })
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("pointermove", handleMouseMove);
      window.addEventListener("pointerdown", handleWaterClick);
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
            _cloudsSprite.x += speed * delta;
            _cloudsSprite.y += speed * delta * 2;
            return speed
          }
        )
      }

      
      function handleMouseMove(e) {
        mousePos.x = e.x;
        mousePos.y = e.y;
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
          home: window.pageYOffset < window.innerHeight,
          about: window.pageYOffset < window.innerHeight + aboutRef.current.scrollHeight && window.pageYOffset >= window.innerHeight,
          projects: window.pageYOffset < window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight,
          technologies: window.pageYOffset < window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight,
          havefun: window.pageYOffset < window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight + havefunRef.current.scrollHeight && window.pageYOffset >= window.innerHeight + aboutRef.current.scrollHeight + projectsRef.current.scrollHeight + technologiesRef.current.scrollHeight
        }

        setScroll(window.pageYOffset);
        if (document.body.scrollHeight - window.pageYOffset <= 100)
          setIsBottom(true)
        else
          setIsBottom(false)

        //Current window
        if (pageRanges.home) {
          currentWindow = "home"
          set_CurrentWindow("home")
          if (previousWindow !== currentWindow) {
            _titleText.text = "WELCOME"
            if (previousWindow === "about") {
              handleMenuLinks(homeLinkRef, previousLink);
            }
            previousWindow = "home"
            set_PreviousWindow("home")
          }
        }

        if (pageRanges.about) {
          currentWindow = "about"
          set_CurrentWindow("about")
          if (previousWindow !== currentWindow) {
            _titleText.text = "ABOUT ME"
            if (previousWindow === "home" || previousWindow === "projects") {
              handleMenuLinks(aboutLinkRef, previousLink);
            }
            previousWindow = "about"
            set_PreviousWindow("about")
          }
        }

        if (pageRanges.projects) {
          currentWindow = "projects"
          set_CurrentWindow("projects")
          if (previousWindow !== currentWindow) {
            _titleText.text = "MY PROJECTS"
            if (previousWindow === "about" || previousWindow === "technologies") {
              handleMenuLinks(projectsLinkRef, previousLink);
            }
            previousWindow = "projects"
            set_PreviousWindow("projects")
          }
        }

        if (pageRanges.technologies) {
          currentWindow = "technologies"
          set_CurrentWindow("technologies")
          if (previousWindow !== currentWindow) {
            _titleText.text = "TECHNOLOGIES I USE";
            if (previousWindow === "projects" || previousWindow === "havefun") {
              handleMenuLinks(technologiesLinkRef, previousLink);
            }
            previousWindow = "technologies"
            set_PreviousWindow("technologies")
          }
        }

        if (pageRanges.havefun) {
          currentWindow = "havefun"
          set_CurrentWindow("havefun")
          if (previousWindow !== currentWindow) {
            _titleText.text = "HAVE FUN"
            if (previousWindow === "technologies") {
              handleMenuLinks(havefunLinkRef, previousLink);
            }
            previousWindow = "havefun"
            set_PreviousWindow("havefun")
          }
        }
      }


      function handleResize(e) {
        console.log("resizing...")
        if (e.target.innerWidth < app.renderer.width) {
          app.renderer.resize(e.target.innerWidth, e.target.innerHeight);
        }
      }

      function handleWaterClick(e) {
        console.log("window clicked")
        let isReadyLocal;
        setIsReady(isReady => { isReadyLocal = isReady; return isReady});
        console.log(isReadyLocal)
        if (!isReadyLocal) return;
        const newRippleSprite = new PIXI.Sprite(PIXI.Loader.shared.resources.ripple.texture);
        _firstContainer.addChild(newRippleSprite);
        newRippleSprite.anchor.set(0.5);
        newRippleSprite.scale.set(0.05);
        newRippleSprite.position.x = e.x;
        newRippleSprite.position.y = e.y;
        const newRippleFilter = new PIXI.filters.DisplacementFilter(newRippleSprite);
        newRippleFilter.scale.set(100);
        _firstContainer.filters = [..._firstContainer.filters, newRippleFilter];
        new TimelineMax({ onComplete: () => { }, repeat: 0 })
          .to(newRippleSprite.scale, 3, { x: 2, y: 2 })
          .to(newRippleFilter.scale, 3, { x: 2, y: 2 })
        _dropSound.play()
        //Animate fishes on mobile views where there is no mouse move animation
        if (window.innerWidth < 800){
        mousePos.x = e.x;
        mousePos.y = e.y;
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
      const cloudsFilter = new PIXI.filters.DisplacementFilter(_cloudsSprite, window.innerWidth < 800 ? 20 : 50);
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
      function setFishSprite(fish, pos) {
        fish.anchor.set(0.5);
        fish.position.set(window.innerWidth / 2, (pos / 4) * window.innerHeight);
        fish.scale.set(0.3)
        fish.rotation = 0;
      }

      for (let i = 0; i < allFishes.length; i++)
        setFishSprite(allFishes[i].fish, i)


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

 

  function handleWaterSpeed() {
    setWaterSpeed(10)
    setTimeout(() => { setWaterSpeed(2) }, 1000)
  }

  function handleArrowDownClick() {
    console.log(_currentWindow)
    if (isBottom)
      gsap.to(window, { duration: 1, scrollTo: { x: 0, y: 0 } })
    else
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          x: 0,
          y: _currentWindow === "home" ?
            aboutRef.current :
            _currentWindow === "about" ?
              projectsRef.current :
              _currentWindow === "projects" ?
                technologiesRef.current :
                _currentWindow === "technologies" ?
                  havefunRef.current :
                  0
        }
      })
  }

  function handleArrowUpClick() {
    console.log(_currentWindow)
    if (isBottom)
      gsap.to(window, { duration: 1, scrollTo: { x: 0, y: 0 } })
    else
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          x: 0,
          y: _currentWindow === "home" ?
            homeRef.current :
            _currentWindow === "about" ?
              homeRef.current :
              _currentWindow === "projects" ?
                aboutRef.current :
                _currentWindow === "technologies" ?
                  projectsRef.current :
                  _currentWindow === "havefun" ?
                    technologiesRef.current :
                    0
        }
      })
  }

  function handleAudio(isMuted) {
    if (isMuted) {
      _flowSound.resume();
    } else {
      _flowSound.pause();
    }
  }
  function deflate() {
    console.log("deflating:", hereRef.current.getBoundingClientRect().width)
    new TimelineMax({ onStart: () => { setIsBallDeflating(true) }, onComplete: () => { setIsBallDeflating(false) } })
      .to(hereRef.current, { scale: 1, bottom: "43px", duration: 3.5, ease: "elastic" })
  }

  function inflate() {
    console.log("inflating:", hereRef.current.getBoundingClientRect().width)
    new TimelineMax()
      .to(hereRef.current, { scale: "+=0.3", bottom: "+=10px", duration: 0.7, visibility: "visible", modifiers: { scaleX: checkScaleX } })

    function checkScaleX(scale) {
      console.log(scale)
      if (+scale >= 2.1) {
        this.kill();
        deflate();
        return 2.1;
      } else
        return scale
    }

  }

  function handleMenuLinks(targetRef, prevTarget, optionalCb) {
    if (optionalCb) optionalCb();
    const containerHeight = targetRef.current.parentNode.getBoundingClientRect().height;
    const diffPositionLinkContainer = targetRef.current.getBoundingClientRect().y - targetRef.current.parentNode.getBoundingClientRect().y;
    if (targetRef.current !== prevTarget) {
      const linkRaise = new TimelineMax()
        .to(prevTarget.current, 1, { color: "#66ccff", y: 0, duration: 1, ease: "bounce" })
      prevTarget.current = targetRef.current;
    }
    const linkFall = new TimelineMax()
      .to(targetRef.current, 1, {
        color: "#ff6600",
        y: containerHeight - diffPositionLinkContainer - 30, ease: "bounce"
      })
    console.log("is ball deflating ?", isBallDeflating)
    if (window.innerWidth > 768) //Animates Im here only for big screens
      setIsBallDeflating(isBallDeflating => {
        if (!isBallDeflating)
          inflate();
        return isBallDeflating
      })


  }

  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={containerRef}></div>
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
                treeSprites={{_blurredTreeSprite, _normalTreeSprite}}
              />
            <RightNavbar testSprite={_normalTreeSprite} />
            <div id="home-window" ref={homeRef}></div>
            <MainWindowsHoc myRef={aboutRef} >
              <About />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={projectsRef} >
              <Projects />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={technologiesRef} >
              <Technologies />
            </MainWindowsHoc>
            <MainWindowsHoc myRef={havefunRef} >
              <HaveFun />
            </MainWindowsHoc>
          </> : <LoadingView setIsReady={setIsReady} loadProgress={loadProgress} />}
        </Col>
      </Row>
    </Container>
  );
}


