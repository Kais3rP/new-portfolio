import React, { useState, useEffect, useRef, useCallback } from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./index.css"
import { gsap, TimelineMax } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import Arrow from "../arrow/index"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import setTvEffect from "../../helpers/setTvEffect"
import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"
import { useSpring, animated } from "react-spring"
import { useDrag } from "react-use-gesture"
import AudioButton from "../button/AudioButton"


gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollToPlugin);

const width = 495;
const windowWidth = window.innerWidth;

export default function RightNavbar({ handleAudio }) {
    const [isNavLarge, setIsNavLarge] = useState(false);
    const [moveNavTl, setMoveNavTl] = useState(null);
    const navCanvasContainerRef = useRef();
    const [props, set] = useSpring(() => ({
        right: -width,
        immediate: 2
    }));
    const bind = useDrag(({ down, direction, distance }) => {
        distance = distance * (-direction[0]);
        console.log(distance)
        if (distance > 0 && !down) setIsNavLarge(true);
        if (distance <= 0 && !down) setIsNavLarge(false);
        set({
            right: isNavLarge
                ? down
                    ? distance - (width - (1 / 3 * width))
                    : distance > 0
                        ? -(width - (1 / 3 * width))
                        : -width
                : down
                    ? distance - width
                    : distance > 100
                        ? -(width - (1 / 3 * width))
                        : -width,
            immediate: name => down && name === "x"
        });
    });

    
    useEffect(()=>{
        console.log("closed/opened nav",isNavLarge, moveNavTl)
        if (window.innerWidth < 800) return;
    if (!moveNavTl){
         //set the nav tl
         const moveNavTl = new TimelineMax({repeat:-1, yoyo:true})
         .to(navCanvasContainerRef.current, 0.5, { x:-5, boxShadow:"0px -1px 20px 10px #ff6600, inset 0px 2px 10px #ff6600" })                
         setMoveNavTl(moveNavTl)
    }
    if (isNavLarge){
        moveNavTl?.pause();
        //moveNavTl?.clear();
    }
    else moveNavTl?.restart()
    },[isNavLarge, moveNavTl])

    useEffect(() => {
        const {
            app,
            Container,
        } = createNewPixiApp(navCanvasContainerRef.current.clientWidth, navCanvasContainerRef.current.scrollHeight, navCanvasContainerRef.current);

        const firstContainer = new Container();
        const rect = new PIXI.Graphics();
        const filter = new CRTFilter();
        //if (window.innerWidth > 900)
        setTvEffect(app, rect, 1, filter, firstContainer, navCanvasContainerRef, 0.5, 0, 0, 0.1, 0.1, 1)

        function handleResize(e) {
            console.log("resizing...")
            app.renderer.resize(navCanvasContainerRef.innerWidth, window.innerHeight + 30);
            rect.height = window.innerHeight + 30;
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])



    return (
            <AnimatedRow ref={navCanvasContainerRef}  id="right-navbar"
            {...bind()}
            style={props} className="m-0 h-100">
                <Col className="nav-container d-flex flex-column justify-content-between align-items-center" >
   
                <div id="nav-controls" className="">
                        <AudioButton handleAudio={handleAudio} />
                    </div>
                </Col>
            </AnimatedRow>
    )
}

const AnimatedRow = animated(Row);