import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import moveNavlinks from "../../animations/moveNavLinks"
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Arrow from "../arrow/index"
import AudioButton from "../button/AudioButton"
import { AiFillFacebook } from "react-icons/ai"
import { AiFillTwitterCircle } from "react-icons/ai"
import { AiFillMail } from "react-icons/ai"
import here from "../../pics/here.png"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import setTvEffect from "../../helpers/setTvEffect"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);
const links = ["home", "about", "projects", "technologies", "havefun"];

export default function LeftNavbar({ linkRefs, hereRef, targetRefs, handleAudio, treeSprites }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const [_app, setApp] = useState(null);
    const [currentLinkAnim, setCurrentlinkAnim] = useState(null);
    const arrowRef = useRef();
    const navCanvasContainerRef = useRef();
    useEffect(() => {
        gsap.to(arrowRef.current, { x: 10, yoyo: true, repeat: -1, duration: 0.2 })
    }, [])

    useEffect(() => {
        gsap.to(arrowRef.current, { rotate: isNavLarge ? 90 : 270 })
    }, [isNavLarge])

    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);
        setApp(app);
        const firstContainer = new Container();
        const rect = new PIXI.Graphics();
        const filter = new CRTFilter();
        //if (window.innerWidth > 900)
       setTvEffect(app,rect,1,filter,firstContainer, navCanvasContainerRef,0.5, 0, 0, 0.1, 0.1, 1)

     
        function handleResize(e) {

            app.renderer.resize(navCanvasContainerRef.innerWidth, window.innerHeight + 30);
            rect.height = window.innerHeight + 30;
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    function handleMoveTo(targetRef) {
        gsap.to(window, { duration: 1, scrollTo: { x: 0, y: targetRef.current } })
    }

    function animateLink(link) {
        if (!currentLinkAnim)
            setCurrentlinkAnim(new TimelineMax({ repeat: -1, yoyo: true }).to(link, 0.2, { scale: 1.2, ease: "linear" }))
    }

    return (
        <Row id="left-navbar" ref={navCanvasContainerRef} style={{ left: isNavLarge ? 0 : "-170px" }} className=" m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div id="nav-controls" className="">
                    <AudioButton handleAudio={handleAudio} />
                </div>
                <ul id="nav-menu" className=" d-flex flex-column justify-content-start align-items-center">
                    {links.map(link => (
                        <li key={link} ref={linkRefs[`${link}LinkRef`]}
                            onClick={(e) => {
                                handleMoveTo(targetRefs[`${link}Ref`]);
                            }} className="p-3">
                            <Link onMouseEnter={(e) => {
                                animateLink(e.target)
                            }}
                                onMouseLeave={(e) => {
                                    gsap.set(e.target, { scale: 1 });
                                    currentLinkAnim?.kill();
                                    setCurrentlinkAnim(null)
                                }} to="/">
                                <h6>{`.${link}()`}</h6>
                            </Link>
                        </li>))}
                    <img id="here-img" ref={hereRef} src={here} alt="You are here" />
                </ul>
                <div id="nav-contacts" className="align-self-start d-flex flex-column justify-content-around">
                    <div className=" d-flex">
                        <AiFillFacebook />
                        <AiFillTwitterCircle />
                        <AiFillMail />
                    </div>
                    <p style={{ fontSize: "10px" }}>Copyright © 2020 Cesare Polonara, All rights reserved.</p>
                </div>
                <Arrow id="left-nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={arrowRef} />
            </Col>
        </Row>
    )
}