import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import moveNavlinks from "../../animations/moveNavLinks"
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Arrow from "../arrow/index"
import AudioButton from "../../components/button/AudioButton"
import { AiFillFacebook } from "react-icons/ai"
import { AiFillTwitterCircle } from "react-icons/ai"
import { AiFillMail } from "react-icons/ai"
import here from "../../pics/here.png"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ handleWaterSpeed, linkRefs, hereRef, targetRefs, handleAudio, handleMenuLinks:handleMenuClick }) {
    const [isNavLarge, setIsNavLarge] = useState(true);
    const [arrow, setArrow] = useState(null);
    const [prevLinkClicked, setPrevLinkClicked] = useState(null)

    useEffect(() => {
        console.log(arrow)
        gsap.to(arrow, { x: 10, yoyo: true, repeat: -1, duration: 0.2 })
    }, [arrow])

    useEffect(() => {
        gsap.to(arrow, { rotate: isNavLarge ? 90 : 270 })
    }, [isNavLarge])

    useEffect(()=>{
        handleMenuClick(linkRefs.homeLinkRef, targetRefs.mainRef, hereRef, prevLinkClicked, setPrevLinkClicked)
    },[])
   
    return (
        <Row id="navbar" style={{ left: isNavLarge ? 0 : "-170px" }} className="m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div id="nav-controls" className="">
                    <AudioButton handleAudio={handleAudio} />
                </div>
                <ul id="nav-menu" className=" d-flex flex-column justify-content-start align-items-center">
                    <li ref={linkRefs.homeLinkRef} onClick={(e) => { handleMenuClick(linkRefs.homeLinkRef, targetRefs.mainRef, hereRef, prevLinkClicked, setPrevLinkClicked, handleWaterSpeed) }} className="p-3">
                        <Link to="/">
                            <h6>.home()</h6>
                        </Link>
                    </li>
                    <li ref={linkRefs.aboutLinkRef} onClick={(e) => { handleMenuClick(linkRefs.aboutLinkRef, targetRefs.aboutRef, hereRef, prevLinkClicked, setPrevLinkClicked, handleWaterSpeed) }} className="p-3">
                        <Link to="/about">
                            <h6>.about()</h6>
                        </Link>
                    </li>
                    <li ref={linkRefs.projectsLinkRef} onClick={(e) => { handleMenuClick(linkRefs.projectsLinkRef, targetRefs.projectsRef, hereRef, prevLinkClicked, setPrevLinkClicked, handleWaterSpeed) }} className="p-3">
                        <Link to="/projects"> <h6>.projects()</h6></Link>
                    </li>
                    <li ref={linkRefs.technologiesLinkRef} onClick={(e) => { handleMenuClick(linkRefs.technologiesLinkRef, targetRefs.technologiesRef,hereRef, prevLinkClicked, setPrevLinkClicked, handleWaterSpeed) }} className="p-3">
                        <Link to="/technologies"> <h6>.technologies()</h6></Link>
                    </li>
                    <li ref={linkRefs.havefunLinkRef} onClick={(e) => { handleMenuClick(linkRefs.havefunLinkRef, targetRefs.havefunRef,hereRef,prevLinkClicked, setPrevLinkClicked, handleWaterSpeed) }} className="p-3">
                        <Link to="/havefun"> <h6>.haveFun()</h6></Link>
                    </li>
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
                <Arrow id="nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={setArrow} />
            </Col>
        </Row>
    )
}