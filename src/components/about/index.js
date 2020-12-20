import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import TypeIt from "typeit-react"
import "./index.css"
import me from "../../pics/me.png"
import { gsap, TimelineMax } from "gsap"
import { useSpring, animated } from "react-spring"
import { useMove } from "react-use-gesture"

export default function About() {


  function useMoveMask() {
    const [props, set] = useSpring(() => ({
      width: 0
    })
    )
    const bind = useMove(({ moving, event }) => {

      const targetX = event.target.getBoundingClientRect().x
      const mouseX = event.clientX

      set({
        width: Math.floor(mouseX - targetX)
      })
    })
    return [props, bind]
  }

  const [springProps, bind] = useMoveMask()

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column justify-content-around ">
        <div className="window-text">
          <TypeIt>
            <div className="d-flex justify-content-start ml-4 mt-2">
              <p style={{ fontSize: "1.2rem", color: "#66ccff" }}>this.about()</p>
            </div>
            <div className="w-100 d-flex ml-4 mt-2">
              <p style={{ fontSize: "1rem", color: "#ff6600" }}>
                "My name is Cesare and I'm a Web Developer"
         </p>
            </div>
          </TypeIt>
        </div>
        <div {...bind()} id="pic-container" >
          <img id="my-pic" src={me} alt="My pic" draggable="false"></img>
          <animated.div style={springProps} id="filter" className="d-none d-md-block"></animated.div>
        </div>
      </Col>
    </Row>
  )
}