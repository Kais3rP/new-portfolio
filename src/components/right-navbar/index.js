import React, { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsActive } from "../../slices/mainSlice"
import { Row, Col } from "react-bootstrap"
import "./index.css"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import setTvEffect from "../../helpers/setTvEffect"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import AudioButton from "../button/AudioButton"
import { animated } from "react-spring";
import useDragElement from "../../custom-hooks/useDragElement"
import TouchIcon from "../../reusable/pointer-animations/TouchIcon"
import MoveLeft from "../../reusable/pointer-animations/MoveLeft"
import Logo from "../../reusable/logo/Logo"
import SvgDashoffset from "../../reusable/svg-dashoffset-animation/SvgDashoffset"
import ElectricityFilterSVG from "../../reusable/svg-electricity-filter/ElectricityFilterSVG"


const width = 528;
const AnimatedRow = animated(Row);
const windowWidth = window.innerWidth;

export default function RightNavbar({ handleAudio, isMuted }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const navCanvasContainerRef = useRef();
    const [bind, props] = useDragElement(isNavLarge, setIsNavLarge, width, "right");
   const dispatch = useDispatch()
    const isActive = useSelector( state => state.main.isActive)

    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);

        const rect = setTvEffect(app, Container, 1, navCanvasContainerRef, 0.5, 0, 0, 0.1, 0.1, 1)

        function handleResize(e) {
            app.renderer.resize(navCanvasContainerRef.innerWidth, window.innerHeight + 30);
            rect.height = window.innerHeight + 30;
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

function handleActive(bool){
    dispatch(setIsActive(bool))
}

    return (
        <AnimatedRow ref={navCanvasContainerRef}
            id="right-navbar"
            {...bind()}
            style={props}
            className="m-0 h-100" >
            <Col className=" d-flex justify-content-start m-0 p-0">
                <div id="nav-right-container"
                    className="d-flex flex-column justify-content-between align-items-center">
                    {!isNavLarge &&
                        <TouchIcon
                            Icon={MoveLeft}
                            direction={"left"}
                            isRotation={false}
                            style={
                                { width: "40px", position: "absolute", fill: "#66ccff" }
                            }
                            pos={
                                { x: -100, y: window.innerHeight - 100 }
                            } />}

                    <div style={{ width: "70%", marginTop: "50px" }}>
                        <Logo isActive={isActive}/>
                    </div>
                    <div className="right-navbar-svg">
                         <SvgDashoffset
                          d={d} 
                          viewBox={"0 0 170 620"} 
                          filter={(id) => <ElectricityFilterSVG id={id} />}
                          handleActive={handleActive} 
                          isActive={isActive}
                          style={{stroke: isActive ?"#66ccff" : "#ff6600"}}
                          />
                        </div>
                    <div id="nav-controls"
                        className="" >
                        <AudioButton handleAudio={handleAudio} isMuted={isMuted} isActive={isActive} />
                    </div>
                </div>

            </Col>
        </AnimatedRow>
    )
}


const d = "M102.62,581.86a18.56,18.56,0,0,0-1-9c-4.2-10.9-19.83-17.29-39-16v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-32h80v-30h-80v-29s41,0,40-30M106.5,7.5a5,5,0,1,0,5,5A5,5,0,0,0,106.5,7.5Zm1,569a5,5,0,1,0,5,5A5,5,0,0,0,107.5,576.5Zm92,5h-87m87-569h-88" 