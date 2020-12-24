import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import TypeIt from "typeit-react";
import underConstr from "../../pics/under-constr.svg"
import Label from "../label/index"


export default function HaveFun() {

    return (
           <img 
           className="under-construction" 
           src={underConstr} 
           style={{width:"20%", pointerEvents:"none"}} 
           alt="under construction"
           draggable="false"
           />

    )
}