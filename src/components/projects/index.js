import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";



export default function Projects({ projectsRef }) {

    return (
        <div className="d-flex flex-column">
            <div className="w-100 d-flex">
                <p style={{ color: "#3333ff" }}>function &nbsp;</p>
                <p style={{ color: "#ffffcc" }}>projects</p>
                <p style={{ color: "white" }}>{"(){"}</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
                <p style={{ color: "#3333ff" }}>const &nbsp;</p>
                <p style={{ color: "#66ccff" }}>which &nbsp;</p>
                <p style={{ color: "white" }}>= &nbsp;</p>
                <p style={{ color: "#ff6600" }}>
                    "Here are some projects I worked on, they are classified by categories, front end only and full stack projects"
         </p>
            </div>
            <div>
                <p style={{ color: "white" }}>{"};"}</p>
            </div>
        </div>
    )
}