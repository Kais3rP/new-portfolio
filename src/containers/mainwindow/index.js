import React, { useState, useEffect, useRef } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import "./index.css"
import { TimelineMax } from "gsap"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import Word from "./Word"
import setTvEffect from "../../helpers/setTvEffect"
import uuid from "react-uuid"
import { animated } from "react-spring"
import useDragRouterElement from "../../custom-hooks/useDragRouterElement"
import { words } from "../../data/words"
import TurnedOffScreen from "../../components/turnedoff/TurnedOffScreen"
import Led from "../../components/led/index"


const AnimatedRow = animated(Row);
const MainWindowsHoc = React.memo(function ({ children, text }) {

  const rowRef = useRef();
  const colRef = useRef();

  const width = window.innerWidth;
  const widthThreshold = width / 3;

  const [wordsArr, setWordsArr] = useState([]);
  const [wordsIds, setWordsIds] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const [isScrollingLeft, setIsScrollingLeft] = useState(location.pathname === "/home")
  const isActive = useSelector(state => state.main.isActive)

  //Animation on mounting and unmounting
  useEffect(() => {
    const DOMnode = rowRef.current
    //This animation manages the router switch made through link navigation
    new TimelineMax()
      .set(DOMnode, {
        position: "absolute",
        left:
          isScrollingLeft ? width : -width,
        top: 0,
        transform: "scale(0)"
      })
      .to(DOMnode, 0.9, { left: 0, top: 0, transform: "scale(1)", ease: "back" });
    //----------------------------------------------------------------------------------------
    if (location.pathname === "/home")
      setIsScrollingLeft(true)
    if (location.pathname === "/havefun")
      setIsScrollingLeft(false)
  }, [location])

  useEffect(() => {

    //Setting up PIXI canvas
    const windowWidth = window.innerWidth;
    const localRef = colRef.current;
    const width = colRef.current.clientWidth;
    const height = colRef.current.clientHeight;

    const {
      app,
      Container,
    } = createNewPixiApp(width, height, localRef);

    //Monitor Words animation
    const wordsArr = [];
    const wordsIds = []
    if (windowWidth > 900) {
      for (let i = 0; i < words.length; i++) {
        const x = Math.floor(Math.random() * (width - 200))
        const y = Math.floor(Math.random() * (height - 30))
        const text = words[Math.floor(Math.random() * words.length)]
        wordsArr.push({ x, y, text })
        wordsIds.push(uuid())
      }
      setWordsArr(wordsArr);
      setWordsIds(wordsIds)
    }

    //if (window.innerWidth > 900)
    const rect = setTvEffect(app, Container, 0.2, colRef, 5, 10, 0.5, 0, 0, 5)



    function handleResize() {
      rect.width = localRef.clientWidth;
      rect.height = localRef.scrollHeight;
    }
    window.addEventListener("resize", handleResize)
    return () => {
      //Clean all the PIXI WebGL assets on unmount during react router navigation
      app.destroy({
        children: true,
        texture: true,
        baseTexture: true
      }
      );

    }

  }, [])

  const [bind, springProps] = useDragRouterElement(
    location,
    history,
    handleScrollDirection
  );

  function handleScrollDirection(bool) {
    setIsScrollingLeft(bool);
  }

  return (
    <AnimatedRow
      ref={rowRef}
      {...bind()}
      style={
        {
          ...springProps,
          pointerEvents: "none",
          visibility: checkIfHomeRoot(location.pathname) ?
            "hidden" :
            "visible"
        }}
      className="window-container w-100 justify-content-center align-items-center">
      <Col
        ref={colRef}
        xs={12}
        lg={8}
        id={colRef?.current ? colRef.current.id : null}
        className={`window d-flex justify-content-center align-items-start p-0 p-md-5`}>
        <TurnedOffScreen />
        <Led />
        {wordsArr.map((data, i) => <Word
          key={wordsIds[i]}
          position={{ x: data.x, y: data.y }}
          text={data.text} />)}
        <Row className="w-100">
          <Col className="w-100 d-flex flex-column justify-content-around ">
            <div className="window-text">            
                <div className="d-flex justify-content-start ml-4 mt-2">
                  <p style={{ fontSize: "1.2rem", color: "#66ccff" }}>{text?.title}</p>
                </div>
                <div className="w-100 d-flex ml-4 mt-2">
                  <p style={{ fontSize: "1rem", color: "#ff6600" }}>
                    {text?.content}
         </p>
                </div>              
            </div>
            {children}
          </Col>
        </Row>
      </Col>
    </AnimatedRow>
  )
})

function checkIfHomeRoot(str) {
  return str === "/home" || str === "/" || str === "/index.html"
}
export default MainWindowsHoc