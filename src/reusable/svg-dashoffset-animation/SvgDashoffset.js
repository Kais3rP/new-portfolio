import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components"
import me from "../../pics/me.png"

export default function App() {
  const [length, setLength] = useState(null);
  const [{ stroke }, set] = useSpring(() => ({
    stroke: 0
  }));
  const pathRef = useRef(null);

  useEffect(() => {
    setLength(pathRef.current.getTotalLength());
  }, [pathRef]);

  const bind = useGesture({
    onMove: (state) => {
      // console.log(state.event.pageY)
      //console.log(state.xy[1], length);
      const mouseY = state.event.pageY;
      const height = state.event.target.parentNode.getBoundingClientRect().height;
      set({
        stroke:
          mouseY < length
            ? transposeRange(mouseY, 0, height+50, 250, length)
            : length
      });
    }
  });
  return (
    <div style={{}} {...bind()}>
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
  strokeWidth: "5px"}}
          strokeDasharray={length}
          strokeDashoffset={stroke?.to((val) => val)}
          d="M91.5,8A83.5,83.5,0,1,1,8,91.5,83.6,83.6,0,0,1,91.5,8m0-7A90.5,90.5,0,1,0,182,91.5,90.5,90.5,0,0,0,91.5,1Z"
          transform="translate(10 10)"
        />
        <image 
        id="my-pic"
        width="426" 
        height="426" 
        transform="translate(34 33) scale(0.32 0.32)" 
        xlinkHref={me}/>
      </svg>
    </div>
  );
}

//utility
function transposeRange(value, x1, y1, x2, y2) {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}


const StyledPath = styled.path`
fill: none;
  stroke: #000;
  stroke-miterlimit: 10;
  stroke-width: 10px;
`

const AnimatedPath = animated(StyledPath)