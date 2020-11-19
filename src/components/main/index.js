import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap } from "gsap";



export default function HaveFun({ havefunRef }) {
    
    return (
        <Row className=" justify-content-center align-items-center">
            <Col ref={havefunRef}  className="main-theme main-window">
MAIN            </Col>
        </Row>


    )


}