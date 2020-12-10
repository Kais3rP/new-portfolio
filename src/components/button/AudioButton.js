import React, { useState, useEffect, useRef } from "react"
import "./index.css"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Button from "./index.js"

export default function AudioButton({handleAudio, isMuted}) {

    return (
       <Button onClick={()=>{ 
           console.log("audio button clicked", isMuted)
           handleAudio() }}>
<FontAwesomeIcon icon={isMuted ? faVolumeMute :faVolumeUp}/>
       </Button>
    )
}