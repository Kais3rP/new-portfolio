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
filter.curvature=10;
filter.lineWidth = 0.5;
filter.noise=0.1;
filter.curvature=0.7;
filter.lineContrast=1.5;
app.ticker.add(updateCRTFilter)
   
    function updateCRTFilter(delta){
        filter.seed = Math.random();
            filter.time += 5;
    }

      function handlePointerEnter(e){
        filter.noiseSize = 1.2;  
      }
      function handlePointerLeave(e){
        filter.noiseSize = 1;      
      }
      

      localRef.addEventListener("pointerenter", handlePointerEnter)
      localRef.addEventListener("pointerleave", handlePointerLeave)
      return () => {
        localRef.removeEventListener("pointerenter", handlePointerEnter)
        localRef.removeEventListener("pointerleave", handlePointerLeave)
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