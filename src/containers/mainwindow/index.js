import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const MainWindowsHoc = React.memo(function ({ myRef, children, direction }) {
    console.log("Rerendering MainWindowHoc")
    gsap.to(myRef.current, {

        duration: 1,
        ease: "linear",
        x: 0,
        opacity: 1,

        scrollTrigger: { trigger: myRef.current, toggleActions: 'restart reset restart reset' }
    });
    return (
        <Row className="h-100 justify-content-center align-items-center">
            <Col id={myRef.current ? myRef.current.id : null} ref={myRef} className={`p-20 ${direction.right ? "central-body-right" : "central-body-left"}`} >
                {children}
            </Col>
        </Row>


    )


})

export default MainWindowsHoc