import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import { gsap } from "gsap";



export default function Main({myRef}) {
    
    return (
        <div  ref={myRef} className="h-100 home-window">

        </div>

    )
}