import React, { useRef, useEffect} from "react"
import { TimelineMax } from "gsap"

export default function TouchIcon({ Icon, direction, isRotation, style }) {
    const svgRef = useRef();
    useEffect(() => {
      new TimelineMax({ repeat: -1, yoyo: true }).to(svgRef.current, 0.7, {
        x: direction === "right" ? "+=100px" : "-=100px",
        transform: isRotation ? `rotate(${direction === "right" ? "+20deg" : "-20deg"})` : "",
        opacity:0.3,
        ease:"circ"
      });
    }, []);
    return <Icon svgRef={svgRef} style={style} />;
  }
