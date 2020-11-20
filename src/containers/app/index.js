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
import { PixiPlugin } from "gsap/PixiPlugin";
import water from "../../pics/water.jpg"
import ripple from "../../pics/ripple.png"
import swan from "../../pics/swan.png"
import clouds from "../../pics/clouds.jpg"
import fish from "../../pics/fish.png"
import MainWindowsHoc from "../mainwindow/index"

//Registering GSAP plugins
window.PIXI = PIXI;
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(PixiPlugin);


export default function App() {
  const [app, setApp] = useState(null)
  const [rippleAnimation, setRippleAnimation] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false)
  const [_rippleSprite, set_RippleSprite] = useState(null);
  const [_waterSprite, set_waterSprite] = useState(null);
  const [_cloudsSprite, set_cloudsSprite] = useState(null);
  const [_fishSprite, set_fishSprite] = useState(null);
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
    const size = [window.innerWidth, window.innerHeight + 50];
    const loader = PIXI.Loader.shared;
    const Sprite = PIXI.Sprite;
    const ratio = size[0] / size[1];
    //Create the app:
    const app = new PIXI.Application({
      antialias: true,
      resizeTo: window,
      transparent: true
    })
    //Append the stage to the ref of the container div
    containerRef.current.appendChild(app.view)
    //app Settings

    app.renderer.autoResize = true;
    app.renderer.resize(size[0], size[1]);
    //Assets loader
    loader.add("water", water)
      .add("ripple", ripple)
      .add("clouds", clouds)
      .add("fish", fish)
      .load(init)
    //Canvas resizing listener and scrolling auto position
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll)

    function handleScroll(e) {
      console.log("scrolling...")
      containerRef.current.style.top = window.scrollY + "px";

    }

    function handleResize(e) {
      console.log("resizing...")
      if (e.target.innerWidth < size[0]) {
        app.renderer.resize(e.target.innerWidth, e.target.innerWidth / ratio);
      }
    }

    //Function fired on load assets complete
    function init(loader, resources) {
      //Sprites creation
      const waterSprite = new Sprite(resources.water.texture);
      const rippleSprite = new Sprite(resources.ripple.texture);
      //const swanSprite = new Sprite(resources.swan.texture);
      const cloudsSprite = new Sprite(resources.clouds.texture);
      const fishSprite = new Sprite(resources.fish.texture);

      setApp(app);
      set_RippleSprite(rippleSprite);
      set_cloudsSprite(cloudsSprite);
      set_waterSprite(waterSprite);
      set_fishSprite(fishSprite);
      setHasLoaded(true);

    }
    return () => {
      //loader.reset();
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  //Water animation effect and stage Init
  useEffect(() => {
    console.log("Sprites setting")
    console.log(waterSpeed)
    /*
    @This happens once all the assets are loaded, sprites created and saved to React state
    */
    if (hasLoaded) {
      //Sprites config
      _waterSprite.anchor.set(0.5, 0.7);
      _waterSprite.scale.set(0.9);
      _waterSprite.position.set(window.innerWidth / 2);
      _cloudsSprite.anchor.set(0.5);
      _cloudsSprite.scale.set(1);
      _cloudsSprite.position.set(0);
      //This makes the animation continuous
      _cloudsSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const cloudsFilter = new PIXI.filters.DisplacementFilter(_cloudsSprite, 100);
      //Stage config
      app.stage.filterArea = app.screen;
      app.stage.filters = [cloudsFilter];
      app.stage.interactive = true;
      app.stage.addChild(_rippleSprite, _waterSprite, _cloudsSprite, _fishSprite);
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

  }, [hasLoaded])

  //Ripple Effect
  useEffect(() => {
    console.log("Ripple sprite animation setting")
    if (hasLoaded) {
      _rippleSprite.anchor.set(0.5);
      _rippleSprite.scale.set(0.05);
      //Filters creation
      const rippleFilter = new PIXI.filters.DisplacementFilter(_rippleSprite);
      rippleFilter.scale.set(100);
      //Add the filter to the previous ones
      app.stage.filters = app.stage.filters || []
      app.stage.filters = [...app.stage.filters, rippleFilter];
      //Create the GSAP timeline of the filter scale
      const tl = new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(_rippleSprite.scale, 3, { x: 2, y: 2 })
        .to(rippleFilter.scale, 3, { x: 2, y: 2 })
      setRippleAnimation(tl);
      //Add ripple click listener
      app.stage.addListener("click", handleWaterClick)

      function handleWaterClick(e) {
        console.log("canvas clicked")
        const mousePos = e.data.getLocalPosition(app.stage)

        const newRippleSprite = new PIXI.Sprite(PIXI.Loader.shared.resources.ripple.texture);
        app.stage.addChild(newRippleSprite);
        //newRippleSprite.anchor.set(-1)
        newRippleSprite.anchor.set(0.5);
        newRippleSprite.scale.set(0.05);
        newRippleSprite.position.x = mousePos.x;
        newRippleSprite.position.y = mousePos.y;
        //Filters creation
        const newRippleFilter = new PIXI.filters.DisplacementFilter(newRippleSprite);
        newRippleFilter.scale.set(100);
        //Add the filter to the previous ones
        //app.stage.filters = app.stage.filters || []
        app.stage.filters = [...app.stage.filters, newRippleFilter];
        //Create the GSAP timeline of the filter scale
        new TimelineMax({ onComplete: () => { }, repeat: 0 })
          .to(newRippleSprite.scale, 3, { x: 2, y: 2 })
          .to(newRippleFilter.scale, 3, { x: 2, y: 2 })
      }
      return () => {
        app.stage.removeListener("click", handleWaterClick)
      }
    }
  }, [hasLoaded])
  //Fish init
  useEffect(() => {
    if (hasLoaded) {
      _fishSprite.anchor.set(0.5);
      _fishSprite.position.set(200, 200);
      _fishSprite.scale.set(0.3)
      _fishSprite.rotation=-0.3;
      const fishTl = new TimelineMax({yoyo:true})
                    .to(_fishSprite, {pixi: {x:window.innerWidth-50}, duration:7})
                    .to(_fishSprite, {pixi:{scaleX:0}, duration:1})
                    .to(_fishSprite, {pixi:{scaleX:-0.3}, duration:1})
                    .to(_fishSprite, {pixi: {x:0, y:window.innerHeight/2}, duration:10})
                    .to(_fishSprite, {pixi:{scaleX:0}, duration:1})
                    .to(_fishSprite, {pixi:{scaleX:0.3}, duration:1})
                    .to(_fishSprite, {pixi: {x:window.innerWidth-50}, duration:12})
                    .to(_fishSprite, {pixi:{scaleX:0}, duration:1})
                    .to(_fishSprite, {pixi:{scaleX:-0.3}, duration:1})
                    .to(_fishSprite, {pixi: {x:0, y:window.innerHeight}, duration:10})
                    .to(_fishSprite, {pixi:{scaleX:0}, duration:1})
                    .to(_fishSprite, {pixi:{scaleX:0.3}, duration:1})
     // setFishTl(fishTl)
      window.addEventListener("keydown", (e) => {
        if (fishTl.isActive()){
          fishTl.pause();
          setTimeout(()=>{fishTl.play()},2000)
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
    
    }

    
  }, [hasLoaded])

  //Manage Scrolling arrow animation and listeners
  useEffect(() => {
    console.log("Arrow animation")
    //Arrow animation:

    const arrowTlDown = new TimelineMax()
      .to(arrowRef.current, 0.5, { repeat: -1, yoyo: true, width: "8%", left: "46%", y: 10 })
      .to(arrowRef.current, 1, {
        ease: "linear",
        rotate: 180,
        scrollTrigger: { trigger: havefunRef.current, start: "bottom bottom", toggleActions: 'restart reset restart reset' }
      })
  }, [])

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
  console.log("Rendering main app")
  return (
    <Container className="main-theme" fluid>
      <Row id="main-row">
        <Col>
          <svg ref={arrowRef}
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
          <div className="main-theme" id="container" ref={containerRef}></div>
          <Navbar handleWaterSpeed={handleWaterSpeed} handleRippleAnimation={handleRippleAnimation} targetRefs={{ aboutRef, projectsRef, technologiesRef, havefunRef }} />
          <Main />
          <MainWindowsHoc myRef={aboutRef} direction={{ right: false }}>
            <About />
          </MainWindowsHoc>
          <MainWindowsHoc myRef={projectsRef} direction={{ right: true }}>
            <Projects />
          </MainWindowsHoc>
          <MainWindowsHoc myRef={technologiesRef} direction={{ right: false }}>
            <Technologies />
          </MainWindowsHoc>
          <MainWindowsHoc myRef={havefunRef} direction={{ right: false }}>
            <HaveFun />
          </MainWindowsHoc>
        </Col>
      </Row>
    </Container>
  );
}


