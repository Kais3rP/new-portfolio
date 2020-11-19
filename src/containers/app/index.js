import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap"
import Navbar from "../../components/navbar/index"
import CentralBody from "../../components/central-body/index"
import './index.css'
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
  const [globalRipple, setGlobalRipple] = useState(null);
  const containerRef = useRef();
  useEffect(() => {
    //Aliases
    const size = [window.innerWidth, window.innerHeight];
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
      //Sprites config
      waterSprite.anchor.set(0.5);
      waterSprite.scale.set(1);
      waterSprite.alpha = 0.7;
      waterSprite.position.set(window.innerWidth / 2);
      rippleSprite.anchor.set(0.5);
      rippleSprite.scale.set(0.05);
      cloudsSprite.anchor.set(0.5);
      cloudsSprite.scale.set(1);
      cloudsSprite.position.set(0);
      //This makes the animation continuous
      cloudsSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      //Filters creation
      const filter = new PIXI.filters.DisplacementFilter(rippleSprite);
      filter.scale.set(100);
      //Create the GSAP timeline of the filter scale
      const tl = new TimelineMax({ onComplete: () => { }, repeat: 0 })
        .to(rippleSprite.scale, 1.5, { x: 2, y: 2 })
        .to(filter.scale, 1.5, { x: 2, y: 2 })
      tl.timeScale(0.2)
      const cloudsFilter = new PIXI.filters.DisplacementFilter(cloudsSprite, 100);
      //Stage config
      app.stage.filterArea = app.screen;
      app.stage.filters = [filter, cloudsFilter];
      app.stage.interactive = true;
      app.stage.addChild(rippleSprite, waterSprite, cloudsSprite);
      //Click listener
      setMainTl(tl);
      setGlobalRipple(rippleSprite)
      app.stage.addListener("click", handleWaterClick)
      function handleWaterClick(e) {
        console.log("clicked")
        const mousePos = e.data.getLocalPosition(app.stage)
        rippleSprite.position.x = mousePos.x;
        rippleSprite.position.y = mousePos.y;
        if (tl) tl.restart()
      }
      //Animate 60FPS
      app.ticker.add(() => {
        cloudsSprite.x += 2;
        cloudsSprite.y += 2;
      })
     
    }
    //Canvas resizing listener
    window.addEventListener("resize", handleResize);
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

  function handleMainTl(e) {
    console.log("redrawing ripple")
    globalRipple.position.x = e.target.pageX;
    globalRipple.position.y = e.target.pageY;
    setGlobalRipple(globalRipple)
    mainTl?.restart();

  }
  return (
    <Container className="main-theme" fluid>
      <Row>
        <Col>
          <div className="main-theme" id="container" ref={containerRef}></div>
          <Navbar handleMainTl={handleMainTl} ripple={ripple} />
          <CentralBody />
        </Col>
      </Row>
    </Container>
  );
}


