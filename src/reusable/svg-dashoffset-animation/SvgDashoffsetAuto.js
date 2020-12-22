import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components"
import * as easings from "d3-ease"


export default function SvgDashOffset({d, picSrc, style}) {
  const [length, setLength] = useState(null);
  const [{ stroke }, set] = useSpring(() => ({
    from:{stroke: 0},
    to:{stroke:length},
    loop: { reverse: true },
    config : {
      duration:1000,
      ease: easings.easeBackOut
    }
  }));
  const pathRef = useRef(null);

  useEffect(() => {
    setLength(pathRef.current.getTotalLength());
  }, [pathRef]);

  return (
    <div style={{}}>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <AnimatedPath
          ref={pathRef}
          style={{  
              fill: "none",
  stroke: "#ff6600",
  strokeMiterlimit: 1,
  strokeWidth: "5px",
  ...style}}
          strokeDasharray={length}
          strokeDashoffset={stroke?.to((val) => val)}
          d={d}
          transform="translate(10 10)"
        />
       {picSrc && <image 
        id="my-pic"
        width="426" 
        height="426" 
        transform="translate(34 33) scale(0.32 0.32)" 
        xlinkHref={picSrc}/> }
      </svg>
    </div>
  );
}


const StyledPath = styled.path`
fill: none;
  stroke: #000;
  stroke-miterlimit: 10;
  stroke-width: 10px;
`

const AnimatedPath = animated(StyledPath)