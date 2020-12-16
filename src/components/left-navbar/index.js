import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom"
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
import TouchIcon from "../../reusable/pointer-animations/TouchIcon"
import MoveRight from "../../reusable/pointer-animations/MoveRight"
import useSkewText from "../../custom-hooks/useSkewText"
import TransitionText from "../../reusable/transition-text/TransitionText"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

const links = ["home", "about", "projects", "technologies", "havefun"];
const width = 530;
const AnimatedRow = animated(Row);


export default function LeftNavbar({ linkRefs, hereRef }) {

    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const [currentLink, setCurrentLink] = useState(null);
    const navCanvasContainerRef = useRef();
    const [bind, props] = useDragElement(isNavLarge, setIsNavLarge, width, "left");
   const [bind2, props2] = useSkewText();

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

   

    return (
        <AnimatedRow
            ref={navCanvasContainerRef}
            id="left-navbar"
            {...bind()}
            style={props} className="m-0 h-100">
            <Col className="d-flex justify-content-end m-0 p-0" >
                <div
                    id="nav-left-container"
                    className=" d-flex flex-column justify-content-between align-items-center">
                    {!isNavLarge &&
                        <TouchIcon
                            Icon={MoveRight}
                            direction={"right"}
                            isRotation={false}
                            style={{ width: "40px", position: "absolute", fill: "#66ccff" }}
                            pos={{ x: 100, y: 100 }} />}
                    <ul id="nav-menu" className="w-100 d-flex flex-column justify-content-start align-items-start mt-5">
                        {links.map(link => (
                            <NavLink onPointerOver={()=>{ setCurrentLink(link)}} className="nav-link" activeClassName="active-link" to={link}
                                key={link} ref={linkRefs[`${link}LinkRef`]}>
                                <li
                                    className="p-1">
                                    <animated.div
                                    {...bind2()}
                                    style={currentLink === link ? props2 : {}}>
                                    <TransitionText text2={`.${link === "technologies" ? "techs" : link}()`} text1={link === "technologies" ? "techs" : link}/>
                                        </animated.div>
                                </li>
                            </NavLink>))}
                        <img id="here-img" ref={hereRef} src={here} alt="You are here" />
                    </ul>
                    <div id="nav-contacts" className="align-self-start d-flex flex-column justify-content-around">
                        <div className=" d-flex">
                            <a className="icons" href="https://www.facebook.com/cesare.polo/" target="_blank" rel="noreferrer" > <AiFillFacebook /></a>
                            <a className="icons" href="https://twitter.com/CesarePolonara" target="_blank" rel="noreferrer"><AiFillTwitterCircle /></a>
                            <a className="icons" href="mailto:cesare.polonara@gmail.com" target="_blank" rel="noreferrer"> <AiFillMail /></a>
                        </div>
                        <p style={{ fontSize: "10px" }}>Copyright © 2020 Cesare Polonara, All rights reserved.</p>
                    </div>
                </div>
            </Col>
        </AnimatedRow>
    )
}


