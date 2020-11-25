import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";



export default function Loading({ loadProgress, setIsReady }) {
const logoRef = useRef();
useEffect(()=>{
    new TimelineMax({repeat:-1, yoyo:true})
    .to(logoRef.current, 1, {scale:"+=0.1"})  
 
},[])
    return (
        <Row className="justify-content-center align-items-center">
            <Col className="d-flex flex-column justify-content-center align-items-center full-height main-theme">
                
               
                <div className="loader-container">
                   {/* <div className="loading-box" style={{ width: loadProgress + "%" }}></div> 
                   <h5 id="progress">{loadProgress} % </h5>
                   */}
                   
                    <svg
                        id="logo"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 184.3 198.93"
                        ref={logoRef}>
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset={loadProgress + "%"} style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }} />
                                <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <text x={50} y={80} fill="#FFF">{loadProgress}</text>
                        <line class="cls-1" x1="85.78" y1="1.41" x2="85.78" y2="157.41" />
                        <path class="cls-1" d="M113.5,163a43.7,43.7,0,0,1-20-5" transform="translate(-7.72 -0.59)" />
                        <line class="cls-1" x1="105.78" y1="197.41" x2="105.78" y2="162.41" />
                        <line class="cls-1" x1="119.78" y1="197.41" x2="119.78" y2="100.41" />
                        <path class="cls-1" d="M173.5,24c3.87,3.22,18.58,16.16,18,33-.75,21.74-26.78,44.46-64,44"
                            transform="translate(-7.72 -0.59)" />
                        <path class="cls-1" d="M103.5,163" transform="translate(-7.72 -0.59)" />
                        <line class="cls-1" x1="119.78" y1="35.41" x2="119.78" y2="66.41" />
                        <line class="cls-1" x1="150.78" y1="52.41" x2="119.78" y2="35.41" />
                        <line class="cls-1" x1="119.78" y1="66.41" x2="150.78" y2="52.41" />
                        <path class="cls-1" d="M93.5,2a106.49,106.49,0,0,1,80,22" transform="translate(-7.72 -0.59)" />
                        <path class="cls-1" d="M113.5,198a25,25,0,0,0,14,0" transform="translate(-7.72 -0.59)" />
                        <path class="cls-1" d="M104.5,197v2c-50.68-1.88-92.2-41.88-96-92C4.76,57.64,38.66,12.37,87.5,2V34l-.4,0c-23,8.38-40.94,28.77-45.54,53-4.65,24.44,5.3,49.62,24.44,65.26A71.93,71.93,0,0,0,104.5,168v30"
                            transform="translate(-7.72 -0.59)" />
                    </svg>
                </div>
                {loadProgress === 100 && <button onClick={() => { setIsReady(true) }}>START NAVIGATING</button>}
            </Col>
        </Row>


    )


}