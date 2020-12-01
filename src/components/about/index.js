import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import TypeIt from "typeit-react";
import "./index.css";


export default function About() {

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column">
        <TypeIt  options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ color: "#66ccff" }}>this.about()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ color: "#ff6600" }}>
              "My name is Cesare and I'm a Web Developer"
         </p>
          </div>
        </TypeIt>
      </Col>
    </Row>


  )


}