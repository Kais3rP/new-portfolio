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

const paths = [
  "m 148.16666,173.86904 -31.08373,-7.8558 -25.094903,30.75049 -2.134096,-31.98996 -37.000201,-14.36425 29.76479,-11.91509 2.22752,-39.628078 20.52975,24.626038 38.37688,-10.12726 -17.07671,27.13482 z",
  "m 148.16666,173.86904 -17.47659,15.57873 -38.702043,7.31596 -20.216814,-11.80714 -18.917483,-34.54707 4.981915,-22.87594 27.010395,-28.667228 23.29581,-2.33097 35.61082,16.829748 9.41569,21.43532 z",
  "m 115.66071,157.99404 45.38031,54.4251 -63.999863,-51.47605 -37.738059,59.97751 29.179591,-76.77446 -68.70371,-17.35695 82.033841,4.02683 -4.723172,-70.704709 21.520112,79.263179 65.78463,-26.34096 z"
]

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
        <div className="tech-svg-container">
        <MorphingSvg paths={paths} icons={myIcons}/>
        </div>
        
        {/*<div className="tech-icons-container d-flex flex-column align-items-start" >
          {myIcons.map(({ src, key }) => <TechAnimation key={key} src={src}/> )}
        </div>*/}
      </Col>
    </Row>
  )
}

function MorphingSvg({paths, style, icons}){

  const [state, setState] = useState(null);
  const [range, setRange] = useState([])

useEffect(()=>{
  const arr = []
 for (let i = 0; i < paths.length; i++)
    arr.push(i)
  setRange(arr)
},[])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState((state) => (state < paths.length-1 ? state + 1 : 0));
    }, 500);
    return () => clearTimeout(timeout);
  }, [state]);

  const { x, scale } = useSpring({
    config: { duration: 800 },
    x: state ? state : 0,
  });
console.log("morphing", state)
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="30 70 150 200"
        style={{...style, width:"100%", opacity:0.7}}
      >
        <animated.path
          style={{}}
          d={x.to({
            range: range,
            output: paths
          })}
        />
      </svg>
  );
}



function TechIcon({ src }) {
  return (
    <img src={src} style={{ width: "70px" }} alt="tech-icon"></img>
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



