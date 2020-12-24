import React, { useState, useEffect, useRef } from "react"
import "./index.css"
import SvgDashoffsetAuto from "../../reusable/svg-dashoffset-animation/SvgDashoffsetAuto"
import SvgDashoffset from "../../reusable/svg-dashoffset-animation/SvgDashoffset"
import me from "../../pics/me.png"
import Label from "../label/index"

const circlePath = "M91.5,8A83.5,83.5,0,1,1,8,91.5,83.6,83.6,0,0,1,91.5,8m0-7A90.5,90.5,0,1,0,182,91.5,90.5,90.5,0,0,0,91.5,1Z"

export default function About() {


  return (
    <div id="pic-container" >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <SvgDashoffset
          d={circlePath}
          viewBox={"0 0 200 200"}
          startoff={520}
          picSrc={me}
          onMove={true}
        />
      </div>
    </div>
  )
}