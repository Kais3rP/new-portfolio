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

export default function Navbar({ handleRippleAnimation, handleWaterSpeed, targetRefs, handleAudio }) {
    const [isNavLarge, setIsNavLarge] = useState(true);
    const [arrow, setArrow] = useState(null);
    const [hereRef, setHereRef] = useState(null);
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
            .to(e.target, 1, {color:"#ff6600",y:e.currentTarget.parentNode.getBoundingClientRect().height -( e.target.getBoundingClientRect().y-e.currentTarget.parentNode.getBoundingClientRect().y) -30 , ease:"bounce"})
            //.to(e.target, 2, {fontSize:"17px"})
        gsap.to(hereRef, {width:"+=12", left:"-=6", duration:0.7, visibility:"visible", modifiers: {width:checkHereWidth, left:checkHereLeft}})
        function checkHereWidth(width){
            console.log(width)
            width = +width.split("px")[0]
            return width >= 143 ? "71px" : width+"px"
        }

        function checkHereLeft(left){
            left = +left.split("px")[0]
            return left <= 15 ? "49.5px" : left+"px"
        }
    }
    return (
        <Row id="navbar"  style={{ left: isNavLarge ? 0 : "-170px" }} className="m-0">
            <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
                <div id="nav-controls" className="">
                    <AudioButton handleAudio={handleAudio} />
                </div>
                <ul id="nav-menu" className=" d-flex flex-column justify-content-start align-items-center">
                <li onClick={(e) => { handleMenuClick(e, targetRefs.mainRef) }} className="p-3">
                        <Link to="/">
                            <h6>.home()</h6>
                        </Link>
                    </li>
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.aboutRef) }} className="p-3">
                        <Link to="/about">
                            <h6>.about()</h6>
                        </Link>
                    </li>
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.projectsRef) }} className="p-3">
                        <Link to="/projects"> <h6>.projects()</h6></Link>
                    </li>
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.technologiesRef) }} className="p-3">
                        <Link to="/technologies"> <h6>.technologies()</h6></Link>
                    </li>
                    <li onClick={(e) => { handleMenuClick(e, targetRefs.havefunRef) }}  className="p-3">
                        <Link to="/havefun"> <h6>.haveFun()</h6></Link>
                    </li>
                <img id="here" ref={setHereRef} src={here} alt="You are here"/>
               </ul>
                <div id="nav-contacts" className="align-self-start d-flex flex-column justify-content-around">
                <div className=" d-flex">
                    <AiFillFacebook />
                    <AiFillTwitterCircle />
                    <AiFillMail />
                </div>
                    <p style={{fontSize:"10px"}}>Copyright © 2020 Cesare Polonara, All rights reserved.</p>
                </div>
                <Arrow id="nav-arrow" onClick={() => { setIsNavLarge(isLarge => !isLarge) }} myRef={setArrow} />
            </Col>
        </Row>
    )
}