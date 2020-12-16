import React, { useState, useEffect, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"
import { useSpring, animated, useTransition } from "react-spring"
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
const myIcons = icons.map(src => ({ src, key: uuid() }))

export default function Technologies() {

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column align-items-start technologies-container">
        <div className="window-text">
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
          {myIcons.map(({ src, key }) => <TechAnimation key={key} src={src}/> )}

        </div>
      </Col>
    </Row>
  )
}

function TechIcon({ src }) {
  return (
    <img src={src} style={{ width: "70px" }} alt="tech-icon"></img>
  )
}

function TechAnimation({ src }) {

  const [toggle, setToggle] = useState(false)
  const disappearProps = useSpring({ from: { x: 0, scale: 1, opacity: 1 }, to: async next => {
await next({ x: toggle ? 500 : 0, scale: toggle ? 5 : 1, opacity: toggle ? 0 : 1 }) 
//await next({display:toggle ? "none" : "flex"})  
}
} )
  const appearProps = useSpring({ from: { x: -window.innerWidth, opacity: 0 }, to: async next => {
    await next({ x: toggle ? 0 : -window.innerWidth, opacity: toggle ? 1 : 0 })
    while (true){
      await next({scale:0.9}) 
      await next({scale:1}) 
    } 
  }
})
  //const blinkProps = useSpring({ from: {scale:1}, to:{scale:0.8}, loop:{reverse:true}, config : {duration:400}})

  return (
    <div className="d-flex">
      <AnimatedArrowContainer style={disappearProps}>
        <ArrowRight onPointerEnter={() => { setToggle(true) }} />
      </AnimatedArrowContainer>
      <AnimatedIconContainer style={{...appearProps}}>
        <TechIcon src={src} />
      </AnimatedIconContainer>
    </div>
  )
}

const ArrowContainer = styled.div`
width:70px;
margin-bottom:20px;
`

const IconContainer = styled.div`
width:100px;
height:100px;
border-radius:50%;
background:#FFF;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:10px;
cursor:pointer;
`
const AnimatedIconContainer = animated(IconContainer)
const AnimatedArrowContainer = animated(ArrowContainer)

function TransitionSlideRight({Comp1, Comp2, src}){
  const [toggle, setToggle] = useState(true);

  const transition = useTransition(toggle, {
    from: { opacity: 0, scale: 1, x:0 },
    enter: { opacity: 1, scale:1, x:0 },
    leave: { opacity: 0, scale: 2, x:window.innerWidth }
  });

  const transitionRender = transition((style, toggle) => {
    return toggle ? (
      <animated.div
        onMouseEnter={() => {
          setToggle(false);
        }}
        style={{...style, width: "70px", marginBottom: "30px" }}
      >
       <Comp1 />
      </animated.div>
    ) : (
      <animated.div
        onMouseLeave={() => {
          setToggle(true);
        }}
        style={{...style, width: "70px", marginBottom: "30px" }}
      >
        <Comp2 src={src}/>
      </animated.div>
    );
  });

  return transitionRender
}



