import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const MainWindowsHoc = React.memo(function ({ myRef, children, direction }) {
 useEffect(()=>{
    if(myRef) gsap.to(myRef.current, {
        duration: 1,
        ease: "elastic",
        opacity:1,
        x: 0,
        scrollTrigger: { trigger: myRef.current, toggleActions: 'restart reset restart reset' }
    });

 },[])  
 
    return (
        <Row className="justify-content-center align-items-center">
            <Col lg={6} id={myRef?.current ? myRef.current.id : null} ref={myRef} className={`window d-flex justify-content-center align-items-center p-20 ${direction.right ? "central-body-right" : "central-body-left"}`} >
                {children}
            </Col>
        </Row>
    )
})

export default MainWindowsHoc