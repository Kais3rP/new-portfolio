import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import AudioButton from "../../components/button/AudioButton"
import "./index.css";
import moveNavlinks from "../../animations/moveNavLinks"
import { gsap, TimelineMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import Arrow from "../arrow/index"

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({ handleRippleAnimation, handleWaterSpeed, targetRefs, handleAudio }) {
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

    function handleMenuClick(e, ref) {
        if (e.current !== prevLinkClicked ) {
            const goBack = new TimelineMax()
                .to(prevLinkClicked,1,{color:"#66ccff",y:0, duration:1, ease:"bounce"})
        //gsap.to(prevLinkClicked, 1, {fontSize:"15px", duration:1})
            
        setPrevLinkClicked(e.target)
        }
        handleRippleAnimation(e);
        handleWaterSpeed();
        //moveNavlinks(e.target, ref.current)
       
        gsap.to(window, { duration: 1, scrollTo: { x: 0, y: ref.current } })
        const linkFall = new TimelineMax()
            .to(e.target, 1, {color:"#ff6600",y:window.innerHeight - e.target.getBoundingClientRect().y - 20, ease:"bounce"})
            //.to(e.target, 2, {fontSize:"17px"})

        //setIsNavLarge(false);
    }
    return (
        <Row id="navbar"  style={{ left: isNavLarge ? 0 : "-170px" }} className="m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div className="h-25">
                    <AudioButton handleAudio={handleAudio} />
                </div>
                <ul className="h-75 d-flex flex-column justify-content-start align-items-start">
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.aboutRef) }} className="p-3">
                        <Link to="/about">
                            <h6>.about()</h6>
                        </Link>
                    </li>
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.aboutRef) }} className="p-3">
                        <Link to="/projects"> <h6>.projects()</h6></Link>
                    </li>
                    <li className="p-3">
                        <Link onClick={(e) => { handleMenuClick(e, targetRefs.technologiesRef) }} to="/technologies"> <h6>.technologies()</h6></Link>
                    </li>
                    <li className="p-3">
                        <Link onClick={(e) => { handleMenuClick(e, targetRefs.havefunRef) }} to="/havefun"> <h6>.haveFun()</h6></Link>
                    </li>
                </ul>
                <Arrow id="nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={setArrow} />
            </Col>
        </Row>
    )
}