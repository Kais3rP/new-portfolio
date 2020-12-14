import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import createNewPixiApp from "../../helpers/createNewPixiApp"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import Word from "./Word"
import setTvEffect from "../../helpers/setTvEffect"
import uuid from "react-uuid"
import { animated } from "react-spring";
import useDragRouterElement from "../../custom-hooks/useDragRouterElement"
import { words } from "../../data/words"


gsap.registerPlugin(ScrollTrigger);

const AnimatedRow = animated(Row);
const MainWindowsHoc = React.memo(function ({ children }) {

  const rowRef = useRef();
  const colRef = useRef();


  const width = window.innerWidth;
  const widthThreshold = width / 3;

  const [wordsArr, setWordsArr] = useState([]);
  const [wordsIds, setWordsIds] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const [isScrollingLeft, setIsScrollingLeft] = useState(location.pathname === "/home" ? true : false)


  //Animation on mounting and unmounting
  useEffect(() => {
    const DOMnode = rowRef.current

    new TimelineMax()
      .set(DOMnode, {
        position: "absolute",
        left:
          isScrollingLeft ? width : -width,
        top: 0,
        transform: "scale(0)"
      })
      .to(DOMnode, 0.9, { left: 0, top: 0, transform: "scale(1)", ease: "back" });

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
    const firstContainer = new Container();
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
    const rect = new PIXI.Graphics();
    const filter = new CRTFilter();
    //if (window.innerWidth > 900)
    setTvEffect(app, rect, 0.2, filter, firstContainer, colRef, 5, 10, 0.5, 0, 0, 5)

    function handlePointerEnter(e) {
      filter.noiseSize = 1.2;
    }
    function handlePointerLeave(e) {
      filter.noiseSize = 1;
    }

    function handleResize() {
      rect.width = localRef.clientWidth;
      rect.height = localRef.scrollHeight;
    }
    window.addEventListener("resize", handleResize)
    localRef.addEventListener("pointerenter", handlePointerEnter)
    localRef.addEventListener("pointerleave", handlePointerLeave)
    return () => {
      localRef.removeEventListener("pointerenter", handlePointerEnter)
      localRef.removeEventListener("pointerleave", handlePointerLeave)
      //Clean all the PIXI WebGL assets on unmount during react router navigation
      app.destroy({
        children: true,
        texture: true,
        baseTexture: true
      }
      );

    }

  }, [colRef])

  useEffect(() => {

  })

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
        {children}
        {wordsArr.map((data, i) => <Word
          key={wordsIds[i]}
          position={{ x: data.x, y: data.y }}
          text={data.text} />)}
      </Col>
    </AnimatedRow>
  )
})

function checkIfHomeRoot(str){
  return str === "/home" || str === "/" || str === "/index.html"
}
export default MainWindowsHoc