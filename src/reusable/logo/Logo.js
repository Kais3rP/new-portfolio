import React, { useState } from "react"
import { animated, useSpring } from "react-spring"
import * as easings from 'd3-ease';
import styled from "styled-components"

export default function Logo(props) {


    const springProps = useSpring({
        loop: { reverse: true },
        from: { transform: `scale(1)`, boxShadow: "0px 0px 20px 5px #ff6600, inset 0px 2px 6px #ff6600", },
        to: { transform: `scale(1.2)`, boxShadow: "0px 0px 1px 1px #ff6600, inset 0px 0px 20px #ff6600" }
        , reset: true, config: { duration: 600, easing: easings.easeSinInOut },
    })

    return (
        <AnimatedDiv  {...{ ...props, style: { ...props.style,  ...props.isActive ? springProps : {}  } }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 185.78 200.51"
                style={{ width: "80%" }}
            >             
                <text x="170" y="200" fill="#ff6600">©</text>
                <MyPath
                 isActive={props.isActive}
                    d="M104.5,198v2C-12.89,192.52-26.82,30.4,87.5,3V35l-.4,0C16.49,62.46,29.76,160.17,104.5,169v29Z"
                    transform="translate(-8.22 -0.42)" />
                <MyPath
                     isActive={props.isActive}
                    d="M135.5,197V166.5c20.58-7.12,45.3-25,58-41V154h-.15c-13.28,20.53-33.91,36.34-57.84,42.08"
                    transform="translate(-8.22 -0.42)" />
                <MyPath
                    isActive={props.isActive}
                    d="M159.5,46.5a16,16,0,0,1-1,6c-3.54,9.37-16.32,14.9-32,15v-35c15.55-2.86,28.42.42,32,8A11.78,11.78,0,0,1,159.5,46.5ZM96.5,2.1C97,54,97,106,96.5,157.5a44,44,0,0,0,18,4v39a20,20,0,0,0,3,0,20.26,20.26,0,0,0,9-3V96.5c2,.18,34.06,2.67,51-21a50.19,50.19,0,0,0,9-27,37.45,37.45,0,0,0-3-18c-10.11-22.45-45-33.65-87-28"
                    transform="translate(-8.22 -0.42)" />
            </svg>
        </AnimatedDiv>
    )
}


const MyDiv = styled.div`
    width: 100%;
    position: relative;
    border: 2px outset #ff6600;
    border-radius : 20px;
    padding:25px;
    background-image: linear-gradient(to top, #070707, #171717);
    //box-shadow: 0px 0px 20px 5px #ff6600, inset 0px 2px 6px #ff6600;
    display:flex;
    justify-content:center;
    align-items:center;
`
const MyPath = styled.path`
    stroke: #66ccff;
    stroke-miterlimit: 10;
    fill: ${props => props.isActive ? "#66ccff" : "none"};
    transition: all 0.5s linear;
`
const AnimatedDiv = animated(MyDiv)