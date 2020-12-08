import React, { useRef, useEffect} from "react"
import { TimelineMax } from "gsap"

export default function TouchIcon({ Icon, direction, isRotation, style, pos }) {
    const svgRef = useRef();
    useEffect(() => {
      console.log(pos)
      new TimelineMax({ repeat: -1 })
      .set(svgRef.current, { transform:`translateX(${pos ? pos.x : 0}px) translateY(${pos ? pos.y : 0}px)`,opacity:0})
      .to(svgRef.current, 1.5, {
        x: direction === "right" ? "+=60px" : "-=60px",
        y: pos ? pos.y : 0,
        transform: isRotation ? `rotate(${direction === "right" ? "+20deg" : "-20deg"})` : "",
        opacity:1,
        ease:"ease-out"
      });
    }, []);
    return <Icon svgRef={svgRef} style={style} />;
  }
