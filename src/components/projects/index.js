import React, { useState, useEffect, useRef } from "react"
import { Row, Col, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./index.css"
import TypeIt from "typeit-react"
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
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


const proj = [{ pic: timer, link: "https://working-time-recorder.netlify.app/" }, { pic: chat, link: "http://minimalist-chat.glitch.me/" }, { pic: eComm, link: "http://eharvest.herokuapp.com/" }, { pic: forecast, link: "https://meteo-web.netlify.app/" }, { pic: school, link: "https://school-homepage-template.netlify.app/" }]
const poc = [{ pic: starRating, link: "https://www.npmjs.com/package/star-rating-react-component" }, { pic: carousel, link: "https://codepen.io/kais3rp/pen/wvWeVvx" }]
const games = [{ pic: cups, link: "https://cuppy-game.herokuapp.com/" }, { pic: chrono, link: "https://simple-chrono.netlify.app/" }, { pic: keyboard, link: "https://digital-piano.netlify.app/" }, { pic: snake, link: "https://vanilla-snake.netlify.app/" }]


export default function Projects({ projectsRef }) {

  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column">
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ fontSize:"1.2rem", color: "#66ccff" }}>this.projects()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ fontSize:"1rem", color: "#ff6600" }}>
              "Here are some projects I worked on, they are classified by categories, front end / full stack projects, proof of concepts, and games"
           </p>
          </div>
        </TypeIt>
        {/*<TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ fontSize:"1rem", color: "#66ccff" }}>Full Projects:</p>
          </div>
        </TypeIt>
        <Carousel className="mt-4">
          {proj.map(pic => <Carousel.Item key={pic.link}>
            <a href={pic.link} target="_blank" rel="noreferrer">
              <img className="carousel-pic" src={pic.pic} alt="project"></img>
            </a>
          </Carousel.Item>)}
        </Carousel>
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ fontSize:"1rem", color: "#66ccff" }}>Proof of concepts/Libraries:</p>
          </div>
        </TypeIt>
        <Carousel className="mt-4">
          {poc.map(pic => <Carousel.Item key={pic.link}>
            <a href={pic.link} target="_blank" rel="noreferrer">
              <img className="carousel-pic" src={pic.pic} alt="project"></img>
            </a>
          </Carousel.Item>)}
        </Carousel>
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ fontSize:"1rem", color: "#66ccff" }}>Games:</p>
          </div>
        </TypeIt>
        <Carousel className="mt-4">
          {games.map(pic => <Carousel.Item key={pic.link}>
            <a href={pic.link} target="_blank" rel="noreferrer">
              <img className="carousel-pic" src={pic.pic} alt="project"></img>
            </a>
          </Carousel.Item>)}
        </Carousel>*/}
        <div className="carousel-container">
        <Viewpager />
       </div>
       
      </Col>
    </Row>


  )
}


function Viewpager() {
  const index = useRef(0)
  const pages = proj.map( proj => proj.pic)
  console.log(pages)
  const [props, set] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useGesture({
    onDrag: ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    console.log("pressing carousel", down, xDelta, xDir, distance)
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDir > 0 ? +distance : -distance : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
  }
})
  return (
  props.map(({ x, display, sc }, i) => (
    <animated.div {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pages[i]})` }} />
    </animated.div>  
  ))
  )
}

function clamp(int, boundA, boundB){
  return int < boundA ? boundA :
  int > boundB ? boundB : int
  }