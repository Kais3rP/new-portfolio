import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";
import TypeIt from "typeit-react";
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
            <p style={{ color: "#66ccff" }}>this.projects()</p>
          </div>
          <div className="w-100 d-flex ml-4 mt-2">
            <p style={{ color: "#ff6600" }}>
              "Here are some projects I worked on, they are classified by categories, front end / full stack projects, proof of concepts, and games"
           </p>
          </div>
        </TypeIt>
        <TypeIt options={{
          waitUntilVisible: true
        }}>
          <div className="d-flex ml-4 mt-2">
            <p style={{ color: "#66ccff" }}>Full Projects:</p>
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
            <p style={{ color: "#66ccff" }}>Proof of concepts/Libraries:</p>
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
            <p style={{ color: "#66ccff" }}>Games:</p>
          </div>
        </TypeIt>
        <Carousel className="mt-4">
          {games.map(pic => <Carousel.Item key={pic.link}>
            <a href={pic.link} target="_blank" rel="noreferrer">
              <img className="carousel-pic" src={pic.pic} alt="project"></img>
            </a>
          </Carousel.Item>)}
        </Carousel>
      </Col>
    </Row>


  )
}