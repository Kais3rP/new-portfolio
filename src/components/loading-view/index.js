import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap } from "gsap";



export default function Loading({ loadProgress, setIsReady }) {

    return (
        <Row className="justify-content-center align-items-center">
            <Col className="d-flex flex-column justify-content-center align-items-center full-height main-theme">
                <h1>Loading... </h1>
                <h3>Progress: {loadProgress} % </h3>
                <div className="loader-container">
                <div className="loading-box" style={{width: Math.floor(loadProgress)+"%"}}></div>
                </div>
                <button onClick={()=>{ setIsReady(true)}}>START NAVIGATING</button>
            </Col>
        </Row>


    )


}