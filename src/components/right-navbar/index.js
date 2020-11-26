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
import here from "../../pics/here.png"
import { Timeline } from "gsap/gsap-core";


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);


export default function RightNavbar({  }) {
    const [isNavLarge, setIsNavLarge] = useState(true);

    const arrowRef = useRef();
    useEffect(() => {
        gsap.to(arrowRef.current, { x: -10, yoyo: true, repeat: -1, duration: 0.2 })
    }, [])

    useEffect(() => {
        gsap.to(arrowRef.current, { rotate: isNavLarge ? 270 : 90 })
    }, [isNavLarge])

    useEffect(() => {
        // handleMenuClick(linkRefs.homeLinkRef, hereRef, prevLinkClicked, setPrevLinkClicked)
    }, [])

  
   
    return (
        <Row id="right-navbar" style={{ right: isNavLarge ? 0 : "-170px" }} className="m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div id="right-nav-controls" className="">
                    <AudioButton  />
                </div>
                <Arrow id="right-nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={arrowRef} />
            </Col>
        </Row>
    )
}