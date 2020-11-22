import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";



export default function Button({ children, onClick }) {

    return (
       <div onClick={onClick} className="control-button">
{children}
       </div>
    )
}