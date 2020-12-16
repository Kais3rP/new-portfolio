import React from 'react'
import { animated, useSpring } from "react-spring"
import * as easings from 'd3-ease';

const ArrowRight = (props) => {

const springProps = useSpring({
    loop: { reverse:true},
    from : {x:0},
    to:{x:50},
    config: { duration: 300, easing: easings.easeSinInOut }
})

    return (
        <animated.svg {...props} style={{...springProps, fill:"#f60",stroke:"#6cf",strokeMiterlimit:10, width:"100%"}}
        id="svg5376" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 64.44 50.47">
        <path 
        d="M63.6,32,38.13,7.93v9.61H.4V46.46H38.13v9.61Z" 
        transform="translate(0.1 -6.77)"/>
        </animated.svg>
    )
}

export default ArrowRight
