import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/navbar/index"
import './index.css'
import About from "../../components/about/index"
import Projects from "../../components/projects/index"
import HaveFun from "../../components/havefun/index"
import Technologies from "../../components/technologies/index"
import * as PIXI from "pixi.js"
import { TimelineMax } from "gsap"
import water from "../../pics/water.jpg"
import ripple from "../../pics/ripple.png"
import swan from "../../pics/swan.png"
import clouds from "../../pics/clouds.jpg"

export default function App() {
  const [app, setApp] = useState(new PIXI.Application({
    antialias: true,
    resizeTo: window,
    transparent: true
  }))
  const [mainTl, setMainTl] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false)
  const [_rippleSprite, set_RippleSprite] = useState(null);
  const [_waterSprite, set_waterSprite] = useState(null);
  const [_cloudsSprite, set_cloudSprite] = useState(null);
  const [_swanSprite, set_swanSprite] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const containerRef = useRef();
  const targetRef = useRef();
  useEffect(() => {
    //Aliases
    const size = [window.innerWidth, window.innerHeight+50];
    const loader = PIXI.Loader.shared;
    const Sprite = PIXI.Sprite;
    const ratio = size[0] / size[1];
    //Append the stage to the ref of the container div
    containerRef.current.appendChild(app.view)
    //app Settings

    app.renderer.autoResize = true;
    app.renderer.resize(size[0], size[1]);
    //Assets loader
    loader.add("water", water)
      .add("ripple", ripple)
      .add("swan", swan)
      .add("clouds", clouds)
      .load(init)

    function init(loader, resources) {
      //Sprites creation
      const waterSprite = new Sprite(resources.water.texture);
      const rippleSprite = new Sprite(resources.ripple.texture);
      const swanSprite = new Sprite(resources.swan.texture);
      const cloudsSprite = new Sprite(resources.clouds.texture);


      set_RippleSprite(rippleSprite);
      set_cloudSprite(cloudsSprite);
      set_waterSprite(waterSprite);
      set_swanSprite(swanSprite);
      setHasLoaded(true);


    }


    //Canvas resizing listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll)
function handleScroll(e){
console.log("scroll",window.scrollY)
console.log(containerRef.current.style.top)
containerRef.current.style.top = window.scrollY+"px";
}

    function handleResize(e) {
      if (e.target.innerWidth < size[0]) {
        app.renderer.resize(e.target.innerWidth, e.target.innerWidth / ratio);
      }
    }
    return () => {
      loader.reset();
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  //Water animation effect and stage Init
  useEffect(() => {
    /*
    @This happens once all the assets are loaded, sprites created and saved to React state
    */
    if (hasLoaded) {
      //Sprites config
      _waterSprite.anchor.set(0.5);
      _waterSprite.scale.set(1);
      _waterSprite.alpha = 0.7;
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
      app.stage.addChild(_rippleSprite, _waterSprite, _cloudsSprite);
      //Animate @ 60FPS
      app.ticker.add(() => {
        _cloudsSprite.x += 2;
        _cloudsSprite.y += 2;
      })
    }

  }, [hasLoaded])

  //Ripple Effect
  useEffect(() => {
    if (hasLoaded) {
      _rippleSprite.anchor.set(0.5);
      _rippleSprite.scale.set(0.05);
      //Filters creation
      const rippleFilter = new PIXI.filters.DisplacementFilter(_rippleSprite);
      rippleFilter.scale.set(100);
      //Add the filter to the previous ones
      app.stage.filters = [...app.stage.filters, rippleFilter];
      //Create the GSAP timeline of the filter scale
      const tl = new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(_rippleSprite.scale, 3, { x: 2, y: 2 })
        .to(rippleFilter.scale, 3, { x: 2, y: 2 })

      setMainTl(tl);
      //Add ripple click listener
      app.stage.addListener("click", handleWaterClick)
      function handleWaterClick(e) {
        console.log("clicked")
        const mousePos = e.data.getLocalPosition(app.stage)
        _rippleSprite.position.x = mousePos.x;
        _rippleSprite.position.y = mousePos.y;
        if (tl) tl.restart()
      }
    }
  }, [hasLoaded, _rippleSprite])

  function handleMainTl(e) {
    console.log("redrawing ripple")

    _rippleSprite.position.x = e.pageX;
    _rippleSprite.position.y = e.pageY;
    mainTl?.restart();
  }

  function handleCurrentPage(ref){
    setCurrentPage(ref);
  }
  return (
    <Container className="main-theme" fluid>
      <Row id="main-row">
        <Col>
          <div className="main-theme" id="container" ref={containerRef}></div>         
          <Navbar handleMainTl={handleMainTl} targetRef={targetRef} />
          <div ref={targetRef} id="dummy"></div>
          <Switch>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="/projects">
              <Projects />
            </Route>
            <Route exact path="/technologies">
              <Technologies  />
            </Route>
            <Route exact path="/havefun">
              <HaveFun />
            </Route>
            <Route exact path="/">           
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}


