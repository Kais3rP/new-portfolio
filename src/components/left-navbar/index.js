import React, { useState, useEffect, useRef, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom"
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
import usePreviousLocation from "../../custom-hooks/usePreviousLocation"
import removeSlash from "../../helpers/removeSlashFromPathname"

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);
const links = ["home", "about", "projects", "technologies", "havefun"];
const width = 530;
const AnimatedRow = animated(Row);


export default function LeftNavbar({ linkRefs, hereRef, handleMenuLinks, currentLocation }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const [currentLinkAnim, setCurrentlinkAnim] = useState(null);
    const navCanvasContainerRef = useRef();

    const [bind, props] = useDragElement(isNavLarge, setIsNavLarge, width, "left");
const location = useLocation()
   const previousLocation = usePreviousLocation(location)
   console.log(location.pathname, previousLocation.pathname)

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

    function animateLink(e) {

     /*   if (!currentLinkAnim)
            setCurrentlinkAnim(new TimelineMax({ repeat: -1, yoyo: true }).to(e.target, 0.2, { scale: 1.2, ease: "linear" }))*/
    }

    function stopAnimateLink(e) {
/*
        gsap.set(e.target, { scale: 1 });
        currentLinkAnim?.kill();
        setCurrentlinkAnim(null)  */
    }
//console.log("location", location.pathname, "prevloc",previousLocation.pathname)
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
                    <ul id="nav-menu" className=" d-flex flex-column justify-content-start align-items-start mt-5">
                        {links.map(link => (
                            <NavLink  isActive={(match, location) => {                                                  
                             if (match && removeSlash(location.pathname) !== removeSlash(previousLocation.pathname)) {  
                                 handleMenuLinks(removeSlash(location.pathname),removeSlash(previousLocation.pathname));  
                             }                       
                            }} to={link}
                          
                                key={link} ref={linkRefs[`${link}LinkRef`]}>
                                <li                                   
                                    className="p-3">
                                    <h6 onMouseEnter={animateLink}
                                        onMouseLeave={stopAnimateLink}>
                                        {`.${link}()`}</h6>
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


