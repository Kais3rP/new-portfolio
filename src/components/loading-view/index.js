import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap, TimelineMax } from "gsap";



export default function Loading({ loadProgress, setIsReady }) {
    const logoRef = useRef();
    const buttonRef = useRef();
    const loadColRef = useRef();
    const [animations, setAnimations] = useState({});

    useEffect(() => {
        const moveLogo = new TimelineMax({ repeat: -1, yoyo: true })
            .to(logoRef.current, 1, { scale: "+=0.1" })
        const resize = new TimelineMax({ onComplete: () => { setIsReady(true) } })
            .to(buttonRef.current, 1, { width: 0, boxShadow: "0px 0px 0px 0px", ease: "power2.out" })
            .to(buttonRef.current, 0.8, { y: (i, target)=> window.innerHeight - target.getBoundingClientRect().y - 80, ease: "bounce" })
            .to(buttonRef.current, 3, { width: window.innerWidth, fontSize: "200rem", opacity: 0, ease: "expo" })
            .pause()
        const fade = new TimelineMax({ delay: 2 })
            .to([logoRef.current, loadColRef.current], 2.8, { opacity: 0 })
            .pause()
        setAnimations({ moveLogo, resize, fade })
    }, [])

    console.log("first render:", buttonRef.current, logoRef.current, loadColRef.current)
    return (
        <Row className="justify-content-center align-items-center">
            <Col ref={loadColRef} className="d-flex flex-column justify-content-center align-items-center full-height main-theme">


                <div className="loader-container">

                    <svg
                        id="logo"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 185.78 200.51"
                        ref={logoRef}
                    >
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset={loadProgress + "%"} style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }} />
                                <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path
                            class="cls-1" d="M104.5,198v2C-12.89,192.52-26.82,30.4,87.5,3V35l-.4,0C16.49,62.46,29.76,160.17,104.5,169v29Z"
                            transform="translate(-8.22 -0.42)" />
                        <path
                            class="cls-1"
                            d="M135.5,197V166.5c20.58-7.12,45.3-25,58-41V154h-.15c-13.28,20.53-33.91,36.34-57.84,42.08"
                            transform="translate(-8.22 -0.42)" />
                        <path
                            class="cls-1"
                            d="M159.5,46.5a16,16,0,0,1-1,6c-3.54,9.37-16.32,14.9-32,15v-35c15.55-2.86,28.42.42,32,8A11.78,11.78,0,0,1,159.5,46.5ZM96.5,2.1C97,54,97,106,96.5,157.5a44,44,0,0,0,18,4v39a20,20,0,0,0,3,0,20.26,20.26,0,0,0,9-3V96.5c2,.18,34.06,2.67,51-21a50.19,50.19,0,0,0,9-27,37.45,37.45,0,0,0-3-18c-10.11-22.45-45-33.65-87-28"
                            transform="translate(-8.22 -0.42)" />
                    </svg>
                </div>
                <h5 id="progress">{loadProgress} % </h5>
                <h4>{loadProgress !== 100 ? "Loading..." : "Done!"}</h4>
                <div ref={buttonRef}
                    style={{ opacity: loadProgress === 100 && 1 }}
                    onClick={() => {
                        animations.resize.play()
                        animations.fade.play()
                    }}
                    id="start-button">

                    <div className="d-flex justify-content-center align-items-center">
                        <h3 >START</h3>
                    </div>
                </div>
                {/*} {loadProgress === 100 && <button onClick={() => { setIsReady(true) }}>START NAVIGATING</button>} */}
            </Col>
        </Row>


    )


}