import React, { useRef } from "react"
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import TouchIcon from "../pointer-animations/TouchIcon"
import SwipeLeft from "../pointer-animations/SwipeLeft"
import SwipeRight from "../pointer-animations/SwipeRight"

export default function SwipeCarousel({ pics, style, className }) {
const width = window.innerWidth;
    const containerStyle = {
      position: "relative",
      width: "100%",
      height:width > 768 ? "400px" : "200px",
      touchAction: "none",
      marginTop: "50px",
      marginBottom: "50px",
      cursor: "-webkit-grab",
      display: "flex",
      flexDirection:"column",
      justifyContent: "start",
      alignItems: "center",
      
    }
    const outerDivStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
    }
    const innerDivStyle = {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      width: "100%",
      height: "100%",
      willChange: "transform",
      boxShadow: "0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)"
    }
  
    const titleStyle = {
      zIndex: style.zIndex, 
      width:"100%", 
      padding:"15px", 
      textAlign:"center", 
      backgroundColor:"#181818",
      fontFamily: "Inter,sans-serif",
      letterSpacing: ".05em",
      fontSize:"2rem",
      cursor: "pointer",
      color:"#FFF",
      pointerEvents:"auto"
    }
  
    const index = useRef(0)
    const [props, set] = useSprings(pics.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
    const bind = useGesture({
      onDrag: ({ down, direction: [xDir], distance, cancel, event }) => {
        event.stopPropagation();
        if (down && distance > window.innerWidth / 2)
          cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pics.length - 1)))
        set(i => {
          if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
          const x = (i - index.current) * window.innerWidth + (down ? xDir > 0 ? +distance : -distance : 0)
          const sc = down ? 1 - distance / window.innerWidth / 2 : 1
          return { x, sc, display: 'block' }
        })
      }
    })
  
    return (
      <div className={className} style={containerStyle}>
        <div style={{marginTop:"100px"}} className="d-flex">
          <TouchIcon Icon={SwipeLeft} direction={"left"} isRotation={true} style={style}></TouchIcon>
          <TouchIcon Icon={SwipeRight} direction={"right"} isRotation={true} style={style}></TouchIcon>
        </div>
       
        {props.map(({ x, display, sc }, i) => (
          <animated.div  {...bind()} key={i} style={{ ...outerDivStyle, display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <animated.div style={{...titleStyle, transform: sc.interpolate(s => `scale(${s})`)}} onClick={() => { window.open(pics[index.current].link, "_blank") || window.location.replace(pics[index.current].link) }}>VISIT PAGE</animated.div>
            <animated.div style={{ ...innerDivStyle, transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pics[i].pic})` }} />
          </animated.div>
        ))}
      </div>
    )
  }
  
  function clamp(int, boundA, boundB) {
    return int < boundA ? boundA :
      int > boundB ? boundB : int
  }