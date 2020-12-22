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
//import StrokeDashSVG from "../../reusable/strokedash-svg/StrokeDashSVG"
import SvgDashoffset from "../../reusable/svg-dashoffset-animation/SvgDashoffset"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

const width = 528;
const AnimatedRow = animated(Row);
const windowWidth = window.innerWidth;

export default function RightNavbar({ handleAudio, isMuted }) {
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
                    <div style={{ width: "100%" }}>
                         <SvgDashoffset d={d} viewBox={"0 0 170 600"}/>
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


const d = "M74.5,576.5a18.57,18.57,0,0,0-1-9c-4.2-10.89-19.83-17.29-39-16v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-35h80v-35h-80v-32h80v-30h-80v-29s41,0,40-30"