import React, { useEffect, useState, useRef } from "react";
import { animated } from "react-spring";

export default function StrokeDashSVG({ d, style, stroke, handleLength, length }) {
    const pathRef = useRef(null);
    useEffect(() => {
      handleLength(pathRef.current.getTotalLength());
    }, [pathRef]);
  
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197 600">
          <animated.path
            ref={pathRef}
            style={{
              fill: "none",
              stroke: "#000",
              strokeMiterlimit: 10,
              strokeWidth: "5px",
              ...style
            }}
            d={d}
            transform="translate(-1.5 2.5)"
            strokeDasharray={length}
            strokeDashoffset={stroke?.to((val) => val)}
          />
        </svg>
      </div>
    );
  }