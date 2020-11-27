import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Arrow from "../arrow/index"
import createNewPixiApp from "../../helpers/createNewPixiApp"
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
        rect.beginFill(0x111111);
        rect.lineStyle(5, 0x000000);
        rect.drawRect(0, 0, app.renderer.view.width, app.renderer.view.height);
        const filter = new CRTFilter();
        firstContainer.filters = [filter]
        firstContainer.addListener("pointermove", onPointerMove);
        firstContainer.addChild(rect)
        app.stage.addChild(firstContainer);
        app.ticker.add(() => {
            filter.seed = Math.random();
            filter.time += 0.5;
        })
        function onPointerMove(e) {

        }

        navCanvasContainerRef.current.addEventListener("pointermove", onPointerMove)
        return () => {

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