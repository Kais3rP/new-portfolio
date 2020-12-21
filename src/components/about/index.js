import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import TypeIt from "typeit-react"
import "./index.css"
import { useSpring, animated } from "react-spring"
import { useMove } from "react-use-gesture"
import SvgDashoffset from "../../reusable/svg-dashoffset-animation/SvgDashoffset"

export default function About() {


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
        <div id="pic-container" >
          <div style={{ width: "100%", maxWidth:"800px" }}>
            <SvgDashoffset />
          </div>
        </div>
      </Col>
    </Row>
  )
}