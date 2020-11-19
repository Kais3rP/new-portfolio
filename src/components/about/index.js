import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";


export default function About() {

    return (
        <Row  className=" h-100 justify-content-center align-items-center">
            <Col lg={6} className="d-flex justify-content-center align-items-center main-theme central-body">
            {`function about(){
                const who = "
                My name is Cesare
                "
            }`}
            </Col>
        </Row>


    )


}