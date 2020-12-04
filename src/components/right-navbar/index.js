import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Arrow from "../arrow/index"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import setTvEffect from "../../helpers/setTvEffect"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);


export default function RightNavbar({  }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const navCanvasContainerRef = useRef();

    const arrowRef = useRef();
    useEffect(() => {
        gsap.to(arrowRef.current, { x: -10, yoyo: true, repeat: -1, duration: 0.2 })
    }, [])

    useEffect(() => {
        gsap.to(arrowRef.current, { rotate: isNavLarge ? 270 : 90 })
    }, [isNavLarge])

    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);

        const firstContainer = new Container();
        const rect = new PIXI.Graphics();
        const filter = new CRTFilter();
        if (window.innerWidth > 900)
        setTvEffect(app,rect,1,filter,firstContainer, navCanvasContainerRef,0.5,0, 0, 0.5, 0.2, 1)
        
        function handleResize(e) {
            console.log("resizing...")           
              app.renderer.resize(navCanvasContainerRef.innerWidth, window.innerHeight+30);
              rect.height = window.innerHeight+30;
          }
          window.addEventListener("resize", handleResize)
          return () => {
          window.removeEventListener("resize", handleResize)
        }

    }, [])



    return (
        <Row ref={navCanvasContainerRef} id="right-navbar" style={{ right: isNavLarge ? 0 : "-170px" }} className="m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div id="right-nav-controls" className="">

                </div>
                <Arrow id="right-nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={arrowRef} />
            </Col>
        </Row>
    )
}