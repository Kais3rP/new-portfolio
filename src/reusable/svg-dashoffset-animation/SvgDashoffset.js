import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components"
import * as easings from "d3-ease"


export default function SvgDashOffset({
  d,
  viewBox,
  picSrc,
  startoff,
  style,
  handleActive,
  isActive,
  filter,
  onMove }) {

  const [length, setLength] = useState(null);
  const [{ stroke }, set] = useSpring(() => ({

    stroke:filter ? 1200 : 0,
    config: {
      //  duration:200,
      //  ease: easings.easeBackOut
    }
  }));

  const pathRef = useRef(null);
  const pathID = "path" + Math.random() * 10.000


  useEffect(() => {
    setLength(pathRef.current.getTotalLength());
  }, [pathRef]);

  const bind = useGesture({
    onMove: (state) => {
      const mouseY = state.event.pageY;
      const startY = state.event.target.parentNode?.getBoundingClientRect().y;
      const height = state.event.target.parentNode?.getBoundingClientRect().height;
    
      if (onMove)  //Boolean prop to decide if moving on mouse move or on drag only
        set({
          stroke:
            mouseY - startY < height - 50 ?
              transposeRange(
                mouseY,
                startY,
                height + startY,
                startoff ? startoff : 0,
                length
              ) : length
        });
      else
        if (state.down) {
          set({
            stroke:
              mouseY - startY < height - 50 ?
                transposeRange(
                  mouseY,
                  startY,
                  height + startY,
                  startoff ? startoff : 0,
                  length
                ) : length
          });

          //Managing audio and toggling state

          const relativePosition = transposeRange(
            mouseY,
            startY,
            height + startY,
            0,
            length
          )

          const hasToPower = relativePosition <= 235;
          
          if (handleActive) handleActive(hasToPower)
        }
    }
  });

  return (
    <div style={{ height: "100%", width: "100%" }} {...bind()}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
      >
        <AnimatedPath
          id={pathID}
          ref={pathRef}
          style={{
            fill: "none",
            stroke: "#ff6600",
            strokeMiterlimit: 1,
            strokeWidth: "5px",
            ...style
          }}
          strokeDasharray={length}
          strokeDashoffset={stroke?.to((val) => val)}
          d={d}
          transform="translate(10 10)"
        />
        {filter && isActive && filter(pathID)}
        {picSrc && <image
          id="my-pic"
          width="426"
          height="426"
          transform="translate(34 33) scale(0.32 0.32)"
          xlinkHref={picSrc} />}
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