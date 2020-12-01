import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import TypeIt from "typeit-react";



export default function Projects({ projectsRef }) {

    return (
        <Row className="w-100">
        <Col className="w-100 d-flex flex-column">
          <TypeIt  options={{
            waitUntilVisible: true
          }}>
            <div className="d-flex ml-4 mt-2">
              <p style={{ color: "#66ccff" }}>this.projects()</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
              <p style={{ color: "#ff6600" }}>
              "Here are some projects I worked on, they are classified by categories, front end only and full stack projects"
           </p>
            </div>
          </TypeIt>
        </Col>
      </Row>
                
       
    )
}