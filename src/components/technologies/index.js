import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import { useSpring, animated } from "react-spring"
import "./index.css"
import TypeIt from "typeit-react"
import html5 from "../../pics/icons/html5.svg"
import css3 from "../../pics/icons/css3.svg"
import git2 from "../../pics/icons/git2.svg"
import js from "../../pics/icons/js.svg"
import mongo from "../../pics/icons/mongo.svg"
import node from "../../pics/icons/node.svg"
import react from "../../pics/icons/react.svg"
import redux from "../../pics/icons/redux.svg"
import webpack from "../../pics/icons/webpack.svg"
import uuid from "react-uuid"
import ArrowRight from "../arrow/ArrowRight"


const icons = [html5, css3, js, mongo, node, react, redux, webpack, git2]
const myIcons = icons.map((src, idx) => ({ src, key: uuid() }))

export default function Technologies() {


  const [items, set] = useState([...myIcons])


  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column align-items-start technologies-container">
        <div  className="window-text">
          <TypeIt>
            <div className="d-flex ml-4 mt-2">
              <p style={{ color: "#66ccff" }}>this.techs()</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
              <p style={{ color: "#ff6600" }}>
                "This is the stack of technologies I currently use and am proficient in:"
           </p>
            </div>
          </TypeIt>
        </div>
        <div className="tech-icons-container d-flex flex-column align-items-start" >
        {myIcons.map(({src,key}) => <TechAnimation key={key} src={src}/>)}

        </div>
      </Col>
    </Row>
  )
}

function TechIcon({ src }) {
  return (
    <img src={src} style={{width:"70px"}} alt="tech-icon"></img>
  )
}

function TechAnimation({ src }) {

  const [toggle, setToggle] = useState(false)
  const disappearProps = useSpring({ from: { x: 0, scale:1, opacity: 1 }, to: { x: toggle ? window.innerWidth : 0, scale: toggle ? 5 : 1, opacity: toggle ? 0.5 : 1 }, config: { duration: 1000 } })
  const appearProps = useSpring({ from: { x: -window.innerWidth, opacity: 0 }, to: { x:  toggle ? 0 : -window.innerWidth , opacity:  toggle ? 1 : 0 } })

  return (
    <div className="d-flex">
      <animated.div  style={{ ...disappearProps, width: "70px", marginBottom: "30px" }}>
        <ArrowRight onPointerEnter={() => { console.log("over"); setToggle(true) }} />
      </animated.div>
      <animated.div style={ appearProps }>
        <TechIcon src={src} />
      </animated.div>
    </div>
  )
}