import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import moveNavlinks from "../../animations/moveNavLinks"
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar( { handleRippleAnimation, targetRefs }) {



useEffect(()=>{
console.log(targetRefs)
},[])

function handleClick(e, ref){
    console.log(ref.current.getBoundingClientRect().y + ref.current.getBoundingClientRect().height)
    handleRippleAnimation(e);
    //moveNavlinks(e.target, ref.current)
    gsap.to( window, { duration:1, scrollTo: {x:0, y:ref.current}} )
}
    return (
        <Row id="navbar" className="justify-content-end">
            <Col  xl={8} className=" d-flex justify-content-end align-items-center">
            <ul className="w-100 p-3 d-flex justify-content-around align-items-end">
                <li>
                <Link onClick={(e)=>{ handleClick(e,targetRefs.aboutRef) }} to="/about">
                <h6>.about()</h6>
                </Link>               
                </li>
                <li>
                <Link   onClick={(e)=>{ handleClick(e,targetRefs.projectsRef) }} to="/projects"> <h6>.projects()</h6></Link>
               
                </li>
                <li>
                <Link   onClick={(e)=>{ handleClick(e,targetRefs.technologiesRef) }} to="/technologies"> <h6>.technologies()</h6></Link>
               
                </li>
                <li>
                <Link   onClick={(e)=>{ handleClick(e,targetRefs.havefunRef) }} to="/havefun"> <h6>.haveFun()</h6></Link>
               
                </li>
            </ul>
            </Col>
        </Row>


    )

}