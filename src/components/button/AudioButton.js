import React, { useState, useEffect, useRef } from "react"
import "./index.css"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Button from "./index.js"

export default function AudioButton({handleAudio}) {
const [isMuted, setIsmuted] = useState(false)
    return (
       <Button onClick={()=>{ 
           console.log("button clicked")
           setIsmuted(!isMuted)
           handleAudio(isMuted) }}>
<FontAwesomeIcon icon={isMuted ? faVolumeMute :faVolumeUp}/>
       </Button>
    )
}