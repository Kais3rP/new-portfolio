import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import TypeIt from "typeit-react";
import underConstr from "../../pics/under-constr.svg"



export default function HaveFun({ havefunRef }) {

    return (
        <Row className="w-100">
        <Col className="w-100 d-flex flex-column">
        <div className="window-text">
          <TypeIt>
            <div className="d-flex ml-4 mt-2">
              <p style={{ color: "#66ccff" }}>this.haveFun()</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
              <p style={{ color: "#ff6600" }}>
              "Section Under Construction"
           </p>
            </div>
          </TypeIt>
          </div>
           <img 
           className="under-construction" 
           src={underConstr} 
           style={{width:"20%", pointerEvents:"none"}} 
           alt="under construction"
           draggable="false"
           />
        </Col>
      </Row>
    )
}