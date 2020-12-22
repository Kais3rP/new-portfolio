import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import TypeIt from "typeit-react"
import "./index.css"
import SvgDashoffsetAuto from "../../reusable/svg-dashoffset-animation/SvgDashoffsetAuto"
import SvgDashoffset from "../../reusable/svg-dashoffset-animation/SvgDashoffset"
import me from "../../pics/me.png"

const circlePath = "M91.5,8A83.5,83.5,0,1,1,8,91.5,83.6,83.6,0,0,1,91.5,8m0-7A90.5,90.5,0,1,0,182,91.5,90.5,90.5,0,0,0,91.5,1Z"

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
           <SvgDashoffset d={circlePath} viewBox={"0 0 200 200"} dashOffsetStart={520} dashOffsetEnd={80} picSrc={me}/>
          </div>
        </div>
      </Col>
    </Row>
  )
}