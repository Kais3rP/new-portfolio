import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../pics/fishnet.png"

gsap.registerPlugin(ScrollTrigger);


const MainWindowsHoc = React.memo(function ({ myRef, children }) {
 useEffect(()=>{
    if(myRef) 
       new TimelineMax({scrollTrigger: { trigger: myRef.current, toggleActions: 'restart reset restart reset' }})
  .to(myRef.current,3,{rotationY:360, ease:"Back.easeOut",
        })
   


 },[])  
 
    return (
        <Row className="justify-content-center align-items-center">
            <Col lg={6} id={myRef?.current ? myRef.current.id : null} ref={myRef} className={`window d-flex justify-content-center align-items-center p-20`} style={{backgroundImage:`url(${bg})`}} >
                {children}
            </Col>
        </Row>
    )
})

export default MainWindowsHoc