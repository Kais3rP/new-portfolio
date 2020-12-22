import React, { useState, useEffect, useRef, useCallback } from "react"
import { Row, Col } from "react-bootstrap"
import "./index.css"
import { gsap, TimelineMax } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
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
import StrokeDashSVG from "../../reusable/strokedash-svg/StrokeDashSVG"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

const width = 528;
const AnimatedRow = animated(Row);
const windowWidth = window.innerWidth;

export default function RightNavbar({ handleAudio, isMuted, stroke, handleLength, svgLength }) {
    const [isNavLarge, setIsNavLarge] = useState(window.innerWidth > 800 ? true : false);
    const navCanvasContainerRef = useRef();
    const [bind, props] = useDragElement(isNavLarge, setIsNavLarge, width, "right");


    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);

        const firstContainer = new Container();
        const rect = new PIXI.Graphics();
        const filter = new CRTFilter();
        setTvEffect(app, rect, 1, filter, firstContainer, navCanvasContainerRef, 0.5, 0, 0, 0.1, 0.1, 1)

        function handleResize(e) {
            app.renderer.resize(navCanvasContainerRef.innerWidth, window.innerHeight + 30);
            rect.height = window.innerHeight + 30;
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])



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
                        <Logo />
                    </div>
                    <div style={{ width: "70%" }}>
                    <StrokeDashSVG
                            handleLength={handleLength}
                            length={svgLength}
                            stroke={stroke}
                            style={{ stroke: "red" }}
                            d={
                                "M4.57,595a6,6,0,0,0,1.4-2.8c.28-1.35,2-4,3.57-5.91,8.25-9.88,29.35-18.63,77-32.14,54.77-15.51,66.12-19,80.75-25.11,13.5-5.63,21.66-10.75,26.17-16.58,2.06-2.6,2.15-3.49,2.15-12.11,0-10.29-.84-12.52-6.84-17.32-5.26-4.15-5.16-4.1-2.54-5.82,7.88-5.22,10-9.78,9.66-20.64-.28-7.63-.37-8.05-3.18-11.64-8.63-10.81-29.45-19.33-86.48-35.4-29-8.15-44.73-12.85-55.8-16.58-12.66-4.33-13.23-4.56-12.1-5,5.72-2.56,31-10.48,55.24-17.28,29.45-8.29,40.42-11.5,53-15.6,26.26-8.52,40.33-15.7,46.61-23.85,2.16-2.84,2.44-3.91,2.72-10.85.38-10.8-1.31-14.53-9.19-20.63l-2.9-2.24,2.81-1.95c7.41-5.17,8.82-7.69,9.19-17.33.38-9.36-.75-12.76-5.63-17.42-10.69-10.06-29.26-17.23-87.22-33.67-17.54-5-36.11-10.39-41.27-12-11.06-3.45-23.91-8-23.91-8.43,0-.93,26.35-9.36,51.11-16.3,59.37-16.68,74.94-21.85,90-29.9,7.41-4,12.19-7.69,14.82-11.51,2.44-3.49,3.09-17.37,1-21.84-1.41-3.17-4.88-6.85-8.63-9.36-2.16-1.45-2.25-1.68-1-2.66,9.75-7.78,10.41-8.89,10.78-18.35a43.07,43.07,0,0,0-.65-10.48c-2.72-7.78-15.66-16.21-36.67-23.84-9.1-3.36-25.42-8.34-46.71-14.35C63.18,34.34,45.93,28.89,31.86,23,17.23,16.74,7.19,9,6.16,3.18,5.88,1.6,5.22.2,4.66,0c-1-.33-.09,4.47,1.78,8.61,4.88,10.9,20.63,21,48.68,31.3C67,44.31,79,48.08,108.3,56.74c40.89,12.07,52.71,16,65.37,22.08q15.89,7.55,19.69,14.53c.94,1.68.75,2.38-.75,4.52-2.34,3.4-7.31,7.36-13,10.53L174.89,111l-3.57-1.49c-15.85-6.62-29.92-11.09-72.59-23.2-43.89-12.43-57.68-17-72.59-24C15.26,57.21,7,50.08,6.16,45.05c-.28-1.53-.94-2.93-1.31-3.07-1.22-.37-1,1.49.56,6.1C9.16,58.84,21.82,68.43,44.24,77.66,60,84.13,72.56,88.23,112.52,100c22.13,6.47,36.76,11,45,14.11,4.13,1.49,4.88,2,3.94,2.51-3.56,2.15-27.19,9.36-73.06,22.31-46.42,13-65.84,20.64-76.9,30-5.91,5-6.85,7.4-6.85,17S6,198.33,12.72,203.6l4.13,3.16-3.75,2.8a28.57,28.57,0,0,0-6,6.1c-2.25,3.12-2.35,4-2.35,12,0,10.2,1.13,12.62,8.63,18.39,12,9,31.14,16.21,81.22,30.28,39,11,57.21,16.53,65.56,20l2.81,1.16-2.81,1.16c-8.35,3.5-26.54,9-65.56,20-55.52,15.6-76,23.71-85.44,34-3.94,4.19-5,7.73-4.69,16.3.19,6.1.47,7.41,2.53,10.34a33.71,33.71,0,0,0,6.19,6.15l3.76,2.8L14.6,389.8c-3.84,2.52-8.53,7.92-9.47,10.9-.47,1.49-.75,6-.56,10,.18,6,.65,7.78,2.25,10.25,3,4.43,7.87,8.1,16.78,12.72,15.29,7.82,29.08,12.43,80.1,26.78,26.17,7.31,43.24,12.53,53.18,16.16l5.81,2.09-4.12,1.45c-7.32,2.65-21.57,7-46.24,14-41.64,11.92-55.71,16.48-71.28,23.19-16.6,7.13-27,14.25-32.26,22.12-2.44,3.64-4.88,10.16-4.79,13,.1,1.77,1.6-.33,2.16-3,.84-3.49,6.75-9.31,13.41-13.27,14.26-8.34,31.42-14.16,91.35-31,23.07-6.47,44.46-13.27,53.84-17.09,3-1.21,6.47-2.65,7.78-3.17l2.35-.93,4.69,2.56c5.62,3.08,11.34,7.78,13.41,11,1.5,2.28,1.4,2.47-.38,5.07-3,4.2-7.41,7.5-15.57,11.65-12.47,6.38-25.88,10.85-70.34,23.52-12.94,3.68-28.14,8.15-33.76,9.92-38.36,12.06-59.46,23.8-66,36.65C5,588.17,3.35,595.57,4.57,595ZM9,405c3.19-3.73,14.73-11.56,17.07-11.56a11.29,11.29,0,0,1,3.38,1.22c7.31,3.91,32.54,12.11,66.5,21.61,51.77,14.48,67.43,19.74,82.15,27.62,7.32,3.95,11.73,7.31,14.54,11.22,1.78,2.66,1.78,2.79.28,5.26-2.06,3.31-6.66,7-13.13,10.72L174.6,474l-6.75-2.84c-10.78-4.47-29.35-10.53-54.58-17.65-39.11-11-47.37-13.46-59.56-17.47-26.26-8.62-41.08-16.44-46-24.31C6.07,409,6.25,408.25,9,405Zm2.35-44.44c8.91-8.71,32.64-18,80.38-31.39,50.08-14.11,61.71-17.79,78.78-24.92l4.5-1.86,3.75,2.1c5.53,3.07,10.51,7,13.41,10.71,2.54,3.21,2.54,3.21.85,5.68-5.07,7.83-19.6,15.6-44.55,23.85-12.95,4.33-24.29,7.68-48.77,14.48C65.15,368.8,47.61,374.34,34,379.88l-8,3.26-4-1.95c-5.53-2.71-11.16-7.08-13.79-10.81-2.15-3.12-2.15-3.17-.47-5.54A37.94,37.94,0,0,1,11.32,360.55Zm-2-137.67C12,220,18,215.7,22.48,213.56L26,211.79l8,3.31c13.78,5.68,28.79,10.39,71.74,22.45,40.24,11.27,55.15,16.3,68.94,23.15,9.47,4.65,14.82,8.57,17.82,12.94l2.16,3.12-2.44,2.94A43.33,43.33,0,0,1,179.48,290l-4.5,2.56-8.25-3.4c-12.29-5-28.14-10-66.31-20.91-47-13.41-54.78-15.88-69.59-22.22-14.54-6.14-25.89-15.41-24-19.56A23.57,23.57,0,0,1,9.35,222.88Zm.56-42.43c9-9.78,30.58-18.49,80.38-32.47,46.61-13.08,64.06-18.49,77.56-24.17L174.6,121l5,2.75c6.09,3.35,10.41,6.89,13,10.52,1.78,2.61,1.88,2.8.38,5.08-2.35,3.63-8.44,8.39-15.29,12-14.54,7.64-31.79,13.41-81.78,27.38-34.42,9.6-58.9,17.61-66.5,21.61A10.84,10.84,0,0,1,26,201.55c-1.5,0-12-6.48-14.63-9-3.47-3.4-5.16-6.48-4.5-8.06A23.94,23.94,0,0,1,9.91,180.45Z"
                            }
                        />
                        </div>
                    <div id="nav-controls"
                        className="" >
                        <AudioButton handleAudio={handleAudio} isMuted={isMuted} />
                    </div>
                </div>

            </Col>
        </AnimatedRow>
    )
}