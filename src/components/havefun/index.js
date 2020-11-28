import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";



export default function HaveFun({ havefunRef }) {

    return (

        <div className="d-flex flex-column">
            <div className="w-100 d-flex">
                <p style={{ color: "#3333ff" }}>function &nbsp;</p>
                <p style={{ color: "#ffffcc" }}>haveFun</p>
                <p style={{ color: "white" }}>{"(){"}</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
                <p style={{ color: "#3333ff" }}>const &nbsp;</p>
                <p style={{ color: "#66ccff" }}>how &nbsp;</p>
                <p style={{ color: "white" }}>= &nbsp;</p>
                <p style={{ color: "#ff6600" }}>
                    "Here you can find some games I developed using JS related technologies:"
         </p>
            </div>
            <div>
                <p style={{ color: "white" }}>{"};"}</p>
            </div>
        </div>
    )
}