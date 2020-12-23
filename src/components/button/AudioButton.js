import React, { useState, useEffect, useRef } from "react"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Button from "./index.js"
import { useSelector, useDispatch } from "react-redux"
import { toggleAudio } from "../../slices/mainSlice"

export default function AudioButton({ isActive }) {

    const isMuted = useSelector( state => state.main.isMuted )
    const dispatch = useDispatch()

    return (
        <Button
            isActive={isActive}
            onClick={() => {
               dispatch(toggleAudio())
            }}>
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </Button>
    )
}