import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { AiFillFacebook } from "react-icons/ai"
import { AiFillTwitterCircle } from "react-icons/ai"
import { AiFillMail } from "react-icons/ai"
import here from "../../pics/here.png"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import setTvEffect from "../../helpers/setTvEffect"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import { animated } from "react-spring";
import useDragElement from "../../custom-hooks/useDragElement"
import TouchIcon from "../pointer-animations/TouchIcon"
import MoveRight from "../pointer-animations/MoveRight"

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);
const links = ["home", "about", "projects", "technologies", "havefun"];
const width = 530;
const AnimatedRow = animated(Row);

export default function LeftNavbar({ linkRefs, hereRef, targetRefs }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    //const [moveNavTl, setMoveNavTl] = useState(null);
    const [currentLinkAnim, setCurrentlinkAnim] = useState(null);
    const navCanvasContainerRef = useRef();

    const [ bind, props ] = useDragElement(isNavLarge, setIsNavLarge, width, "left");

  /*  useEffect(() => {
        console.log("closed/opened nav", isNavLarge, moveNavTl)
        if (window.innerWidth < 800) return;
        if (!moveNavTl) {
            //set the nav tl
            const moveNavTl = new TimelineMax({ repeat: -1, yoyo: true })
                .to(navCanvasContainerRef.current, 0.5, { x: 5, boxShadow: "0px -1px 20px 10px #ff6600, inset 0px 2px 10px #ff6600" })
            setMoveNavTl(moveNavTl)
        }
        if (isNavLarge) {
            moveNavTl?.pause();
        }
        else moveNavTl?.restart()
    }, [isNavLarge, moveNavTl])*/


    //Setting PIXI 
    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);

        const firstContainer = new Container();
        const rect = new PIXI.Graphics();
        const filter = new CRTFilter();
        setTvEffect(app, rect, 1, filter, firstContainer, navCanvasContainerRef, 0.5, 0, 0, 0.1, 0.1, 1)


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
        <AnimatedRow ref={navCanvasContainerRef} id="left-navbar"
            {...bind()}
            style={props} className="m-0 h-100">
            <Col className="d-flex justify-content-end m-0 p-0" >
                <div id="nav-container" className=" d-flex flex-column justify-content-between align-items-center">
                  {!isNavLarge && <TouchIcon Icon={MoveRight} direction={"right"} isRotation={false} style={{width:"80px"}} pos={{x:100, y:window.innerHeight/2 - 20}}  /> }
                    <ul id="nav-menu" className=" d-flex flex-column justify-content-start align-items-start mt-5">
                        {links.map(link => (
                            <li key={link} ref={linkRefs[`${link}LinkRef`]}
                                onPointerDown={(e) => {
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
                </div>
            </Col>
        </AnimatedRow>
    )
}