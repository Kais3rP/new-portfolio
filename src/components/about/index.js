import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import TypeIt from "typeit-react";
import "./index.css";
import io from "../../pics/io.jpg"


export default function About() {

  useEffect(()=>{

  },[])

  return (
    <Row >
      <Col className="w-100 d-flex flex-column justify-content-around align-items-center">
      <div className="about-text"> 
       <TypeIt  options={{
          waitUntilVisible: true,
          speed:10
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ color: "#66ccff" }}>this.about()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ color: "#ff6600" }}>
              "My name is Cesare and I'm a Web Developer"
         </p>
          </div>
        </TypeIt></div>
      
        <img id="my-pic" src={io} alt="My photo"></img>
        <img id="my-pic-mask" src={io} alt="My photo"></img>
      </Col>
    </Row>


  )


}