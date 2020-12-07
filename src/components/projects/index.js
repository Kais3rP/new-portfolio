import React, { useState, useEffect, useRef } from "react"
import { Row, Col, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./index.css"
import TypeIt from "typeit-react"
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import TouchIcon from "../pointer-animations/TouchIcon"
import SwipeLeft from "../pointer-animations/SwipeLeft"
import SwipeRight from "../pointer-animations/SwipeRight"

import timer from "../../pics/projects/app-timer.png"
import chat from "../../pics/projects/chat.png"
import chrono from "../../pics/projects/chrono.png"
import cups from "../../pics/projects/cups.png"
import eComm from "../../pics/projects/e-comm.png"
import keyboard from "../../pics/projects/keyboard.png"
import school from "../../pics/projects/school.png"
import snake from "../../pics/projects/snake.png"
import forecast from "../../pics/projects/forecast.png"
import starRating from "../../pics/projects/star-rating.png"
import carousel from "../../pics/projects/carousel.png"


const proj = [
  {
    pic: timer,
    link: "https://working-time-recorder.netlify.app/"
  },
  {
    pic: chat,
    link: "https://minimalist-chat.glitch.me/"
  },
  {
    pic: eComm,
    link: "https://eharvest.herokuapp.com/"
  },
  {
    pic: forecast,
    link: "https://meteo-web.netlify.app/"
  },
  {
    pic: school,
    link: "https://school-homepage-template.netlify.app/"
  }
]
const poc = [
  {
    pic: starRating,
    link: "https://www.npmjs.com/package/star-rating-react-component"
  },
  {
    pic: carousel,
    link: "https://codepen.io/kais3rp/pen/wvWeVvx"
  }
]
const games = [
  {
    pic: cups,
    link: "https://cuppy-game.herokuapp.com/"
  },
  {
    pic: chrono,
    link: "https://simple-chrono.netlify.app/"
  },
  {
    pic: keyboard,
    link: "https://digital-piano.netlify.app/"
  },
  {
    pic: snake,
    link: "https://vanilla-snake.netlify.app/"
  }
]


export default function Projects({ projectsRef }) {
  const iconsStyle = {
    width: "40px",
    zIndex: 5
  }
  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column align-items-start">
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ fontSize: "1.2rem", color: "#66ccff" }}>this.projects()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ fontSize: "1rem", color: "#ff6600" }}>
              "Here are some projects I worked on, they are classified by categories, front end / full stack projects, proof of concepts, and games"
           </p>
          </div>
        </TypeIt>
        <Viewpager pics={proj} Icon={TouchIcon} style={iconsStyle} />
        <Viewpager pics={poc} Icon={TouchIcon} style={iconsStyle} />
        <Viewpager pics={games} Icon={TouchIcon} style={iconsStyle} />
      </Col>
    </Row>
  )
}


function Viewpager({ pics, Icon, style }) {

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    touchAction: "none",
    marginTop: "50px",
    marginBottom: "50px",
    cursor: "-webkit-grab",
    display: "flex",
    flexDirection:"column",
    justifyContent: "start",
    alignItems: "center"
  }
  const outerDivStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
  const innerDivStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    height: "100%",
    willChange: "transform",
    boxShadow: "0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)"
  }

  const titleStyle = {
    zIndex: style.zIndex, 
    width:"100%", 
    padding:"15px", 
    textAlign:"center", 
    backgroundColor:"#181818",
    fontFamily: "Inter,sans-serif",
    letterSpacing: ".05em",
    fontSize:"2rem",
    cursor: "pointer",
    color:"#FFF"
  }

  const index = useRef(0)
  const [props, set] = useSprings(pics.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useGesture({
    onDrag: ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      console.log("pressing carousel", down, xDelta, xDir, distance)
      if (down && distance > window.innerWidth / 2)
        cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pics.length - 1)))
      set(i => {
        if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
        const x = (i - index.current) * window.innerWidth + (down ? xDir > 0 ? +distance : -distance : 0)
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1
        return { x, sc, display: 'block' }
      })
    }
  })

  return (
    <div style={containerStyle}>
      <div style={{marginTop:"100px"}} className="d-flex">
        <Icon Icon={SwipeLeft} direction={"left"} isRotation={true} style={style}></Icon>
        <Icon Icon={SwipeRight} direction={"right"} isRotation={true} style={style}></Icon>
      </div>
     
      {props.map(({ x, display, sc }, i) => (
        <animated.div  {...bind()} key={i} style={{ ...outerDivStyle, display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
        <animated.div style={{...titleStyle, transform: sc.interpolate(s => `scale(${s})`)}} onClick={() => { window.open(pics[index.current].link, "_blank") || window.location.replace(pics[index.current].link) }}>VISIT PAGE</animated.div>
          <animated.div style={{ ...innerDivStyle, transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pics[i].pic})` }} />
        </animated.div>
      ))}
    </div>
  )
}

function clamp(int, boundA, boundB) {
  return int < boundA ? boundA :
    int > boundB ? boundB : int
}