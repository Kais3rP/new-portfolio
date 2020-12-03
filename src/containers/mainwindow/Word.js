import React, { useEffect, useRef } from "react"
import { TimelineMax } from "gsap";

export default function Word ({ position, text }){
  const wordRef = useRef();
  useEffect(()=>{
    const time = Math.random() + 3
  new TimelineMax({ repeat: -1, yoyo:true}).to(wordRef.current,time, { opacity:0})
  },[])
  return (
    <h5 ref={wordRef} style={{zIndex: -1, opacity:0.5, fontSize:"10px", position:"absolute",left:position.x+"px", top:position.y+"px"}}>{text}</h5>
  )
}