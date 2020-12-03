import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { gsap, TimelineMax } from "gsap";
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
let icons = [html5, css3, git2, js, mongo, node, react, redux, webpack]

export default function Technologies({ technologiesRef }) {
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
    new TimelineMax()
    .to(refs.map(ref => ref.current),1, {y:(idx, target) => idx*120} )
  }, [])
  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column">
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ color: "#66ccff" }}>this.projects()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ color: "#ff6600" }}>
              "These is the stack of technologies I currently use and am proficient in:"
           </p>
          </div>
        </TypeIt>
        {myIcons.map(icon =>(
          <div key={icon.icon} ref={icon.ref} style={{ position: "absolute", top: 0, left: 0 }}>
            <img style={{ width: "100px" }} src={icon.icon}></img>
          </div>))}
      </Col>
    </Row>
  )
}