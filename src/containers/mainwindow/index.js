import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./index.css";
import { gsap, TimelineMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import createNewPixiApp from "../../helpers/createNewPixiApp"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"

gsap.registerPlugin(ScrollTrigger);


const MainWindowsHoc = React.memo(function ({ myRef, children }) {
   
 useEffect(()=>{
    if(myRef) 
       new TimelineMax({scrollTrigger: { trigger: myRef.current, toggleActions: 'play none none none' }})
  .to(myRef.current,5,{ css : {opacity:1 }, ease:"Back.easeOut"})

    const localRef = myRef.current;
    const {
        app,
        Container,
    } = createNewPixiApp(myRef.current.clientWidth, myRef.current.clientHeight, localRef);
let distortion = 0.5;
const firstContainer = new Container();
const rect = new PIXI.Graphics();
rect.scale.set(1);
rect.alpha = 0.2;
rect.beginFill(0x222222);
rect.lineStyle(5, 0x000000);
rect.drawRect(0, 0, myRef.current.clientWidth, myRef.current.clientHeight+30);

const filter = new CRTFilter();
firstContainer.addChild(rect)
firstContainer.filters = [filter]

app.stage.addChild(firstContainer);
filter.lineWidth = 5;
filter.noise=0.1;
filter.curvature=0.7;
app.ticker.add(updateCRTFilter)

    /*const turnOnTl = new TimelineMax()
                    .to(crtFilter, 1, {vignetting: 0, ease:"ease-in"})
                    .pause()
                    const turnOffTl = new TimelineMax()
                    .to0(crtFilter, 1, {vignetting: 1, ease:"ease-in"})
                    .pause()*/
    function updateCRTFilter(){
       // console.log(distortion)     
        filter.seed = Math.random();
        filter.time += 2;
    }

  /* function handleResize(e) {
        console.log("resizing content window...")
        console.log(localRef)   
        console.log(localRef.clientWidth, localRef.clientHeight)        
          app.renderer.resize(localRef.clientWidth, localRef.clientHeight+30);
          //localRef.height = window.innerHeight+30;
      }*/
    
      function handlePointermove(e){
        distortion = Math.random();      
      }
      function handlePointerEnter(e){
        //if (turnOffTl.isActive()) turnOffTl.invalidate()
        //turnOnTl.restart()
        distortion = 1;
      }
      function handlePointerLeave(e){
          // (turnOnTl.isActive()) turnOnTl.invalidate()
        //turnOffTl.restart()
     
      }
      
      //window.addEventListener("resize", handleResize)
      localRef.addEventListener("pointermove", handlePointermove)
      localRef.addEventListener("pointerenter", handlePointerEnter)
      localRef.addEventListener("pointerleave", handlePointerLeave)
      return () => {
      //window.removeEventListener("resize", handleResize)
      localRef.removeEventListener("pointermove", handlePointermove)
    }

}, [myRef])

    return (
        <Row className="justify-content-center align-items-center">
            <Col xs={6} id={myRef?.current ? myRef.current.id : null} ref={myRef} className={`window d-flex justify-content-center align-items-start p-5`}>
{children}
            </Col>
        </Row>
    )
})

export default MainWindowsHoc