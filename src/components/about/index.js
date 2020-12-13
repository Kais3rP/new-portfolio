import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import TypeIt from "typeit-react";
import "./index.css";
import me from "../../pics/me.png"
import { gsap, TimelineMax } from "gsap";



export default function About() {

  useEffect(() => {
    let maskWidth = 0;
    const windowWidth = window.innerWidth;
    const moveFilter = new TimelineMax()
      .to(maskRef.current, 0.2, { width: () => maskWidth })
      .pause()
    //Picture animation only on laptop+ screens   
    if (windowWidth > 900)
      picContainerRef.current.addEventListener("pointermove", handleMouseMove);

    function handleMouseMove(e) {
      maskWidth = Math.floor(e.clientX - e.currentTarget.getBoundingClientRect().x) + "px";
      if (moveFilter.isActive()) moveFilter.invalidate()
      moveFilter.restart()
    }
  }
    , [])


  const picContainerRef = useRef();
  const maskRef = useRef();

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column justify-content-around ">
        <div className="window-text">
          <TypeIt>
            <div className="d-flex justify-content-start ml-4 mt-2">
              <p style={{ fontSize: "1.2rem", color: "#66ccff" }}>this.about()</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
              <p style={{ fontSize: "1rem", color: "#ff6600" }}>
                "My name is Cesare and I'm a Web Developer"
         </p>
            </div>
          </TypeIt>
        </div>
        <div ref={picContainerRef} id="pic-container" >
          <img id="my-pic" src={me} alt="My photo" draggable="false"></img>
          <div ref={maskRef} id="filter" className="d-none d-md-block"></div>

        </div>

      </Col>
    </Row>


  )


}