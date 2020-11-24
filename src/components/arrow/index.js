import React, { useState, useEffect, useRef } from "react"
import "./index.css"

export default function Arrow({myRef, onClick, id, dataName, style, className}) {
const [isMuted, setIsmuted] = useState(false)
    return (
     <>
    <svg onPointerDown={onClick} 
    ref={myRef}
              id={id}
              style={style}
              className={className}
              data-name={dataName}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 560 320.01">
              <g
                id="Rounded_Rectangle_33_copy_4"
                data-name="Rounded Rectangle 33 copy 4">
                <path
                  d="M480,344.18,268.87,131.89a40.16,40.16,0,0,0-57.06,0,40.81,40.81,0,0,0,0,57.43L449.45,428.26a45.73,45.73,0,0,0,61.1,0L748.19,189.32a40.81,40.81,0,0,0,0-57.43,40.16,40.16,0,0,0-57.06,0Z"
                  transform="translate(-200 -119.99)"
                  />
              </g>
            </svg>
     </>
    )
}