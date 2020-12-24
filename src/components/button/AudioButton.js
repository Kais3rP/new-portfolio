import React from "react"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import Button from "./index.js"
import { useSelector, useDispatch } from "react-redux"
import { toggleAudio } from "../../slices/mainSlice"
import GenericLabel from "../label/GenericLabel"

export default function AudioButton({ isActive }) {

    const isMuted = useSelector(state => state.main.isMuted)
    const dispatch = useDispatch()

    return (
        <div className="d-flex flex-column justify-content-start align-items-start">
            <GenericLabel 
            style={{margin:"0px 0px 10px 10px", fontSize:"0.75rem" }} 
            brush={1} 
            brushWidth={"40%"}
            text={isMuted ? "MUTED" : "UNMUTED"} />
            <Button
                isActive={isActive}
                onClick={() => {
                    dispatch(toggleAudio())
                }}>
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
            </Button>
        </div>
    )
}