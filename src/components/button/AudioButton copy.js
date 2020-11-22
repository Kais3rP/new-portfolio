import React, { useState, useEffect, useRef } from "react"
import "./index.css"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Button from "./index.js"

export default function AudioButton() {

    return (
        <Button>
            <FontAwesomeIcon icon={faVolumeUp} />
        </Button>
    )
}