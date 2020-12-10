import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { gsap, TimelineMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";
import TypeIt from "typeit-react";
import html5 from "../../pics/icons/html5.svg"
import css3 from "../../pics/icons/css3.svg"
import git2 from "../../pics/icons/git2.svg"
import js from "../../pics/icons/js.svg"
import mongo from "../../pics/icons/mongo.svg"
import node from "../../pics/icons/node.svg"
import react from "../../pics/icons/react.svg"
import redux from "../../pics/icons/redux.svg"
import webpack from "../../pics/icons/webpack.svg"
import underConstr from "../../pics/under-constr.svg"

gsap.registerPlugin(ScrollTrigger);
let icons = [html5, css3, js, mongo, node, react, redux, webpack, git2]

export default function Technologies() {
  const htmlRef = useRef();
  const cssRef = useRef();
  const gitRef = useRef();
  const jsRef = useRef();
  const mongoRef = useRef();
  const nodeRef = useRef();
  const reactRef = useRef();
  const reduxRef = useRef();
  const webpackRef = useRef();
  const refs = [htmlRef, cssRef, gitRef, jsRef, mongoRef, nodeRef, reactRef, reduxRef, webpackRef]
  const myIcons =  icons.map((icon, idx) => ({ icon, ref: refs[idx] }))

  useEffect(() => {
   /* new TimelineMax({ })
    .to(refs.map(ref => ref.current),2, {y:(idx, target) => idx*20 , ease:"elastic"} )*/
  }, [])

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column technologies-container">
        <TypeIt>
          <div className="d-flex ml-4 mt-2">
            <p style={{ color: "#66ccff" }}>this.technologies()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ color: "#ff6600" }}>
              "This is the stack of technologies I currently use and am proficient in:"
           </p>
          </div>
        </TypeIt>
        <img className="under-construction" src={underConstr} style={{width:"20%"}} alt="under construction"/>
        {/*myIcons.map((icon,idx) =>(        
          <div key={idx+idx-2} className="tech-icons-container" ref={icon.ref}>
            <img style={{ height: "70px", pointerEvents:"none !important" }} src={icon.icon} alt="tech icon"></img>
          </div>
          ))*/}
         
      </Col>
    </Row>
  )
}