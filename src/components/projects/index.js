import React, { useRef } from "react"
import { Row, Col } from "react-bootstrap"
import "./index.css"
import TypeIt from "typeit-react"
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
import covid from "../../pics/projects/covid.png"
import SwipeCarousel from "../../reusable/swipe-carousel/SwipeCarousel"


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
  },
  {
    pic: covid,
    link: "https://covid-deaths.netlify.app/"
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
    zIndex: 5,
    pointerEvents:"none"
  }
  return (
    <Row className="w-100">
      <Col className="w-100 d-flex flex-column align-items-start">
      <div className="window-text">
        <TypeIt>
          <div>
            <p style={{ fontSize: "1.2rem", color: "#66ccff" }}>this.projects()</p>
          </div>
          <div>
            <p style={{ fontSize: "1rem", color: "#ff6600" }}>
              "Here are some projects I worked on, they are classified by categories, front end / full stack projects, proof of concepts, and games"
           </p>
          </div>
        </TypeIt>
        </div>
        <SwipeCarousel pics={proj}  style={iconsStyle} className={"carousel-container"} />
        <SwipeCarousel pics={poc}  style={iconsStyle} className={"carousel-container"}/>
        <SwipeCarousel pics={games}  style={iconsStyle} className={"carousel-container"}/>
      </Col>
    </Row>
  )
}


