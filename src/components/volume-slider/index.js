import React, { useState } from 'react'
import { useSelector } from "react-redux"
import styled from "styled-components"
import * as PIXISound from "pixi-sound"
import GenericLabel from "../label/GenericLabel"

const VolumeSlider = () => {

    const isActive = useSelector(state => state.main.isActive)
    const [volume, setVolume] = useState(0.5)
    return (
        <div className="d-flex flex-column justify-content-start align-items-start" >
            <GenericLabel
                style={{margin:"0px 0px 10px 10px", fontSize: "0.75rem" }}
                brush={1}
                brushWidth={"40%"}
                text={`VOLUME: ${Math.round(volume * 10)}`} />
            <StyledInput
            onPointerDown={(e)=>{ e.stopPropagation()}}
                onChange={(e) => {
                    e.stopPropagation()
                    PIXISound.default.volumeAll = e.target.value
                   setVolume(e.target.value)
                }}
                isActive={isActive}
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                 >
            </StyledInput>
        </div>
    )
}

const StyledInput = styled.input`
width:100px;
/*transform: rotate(270deg);*/
margin:0 !important;
margin-top:35px !important;
cursor:-webkit-grab;
cursor:-moz-grab;
cursor:grab;
background:red;
transition: all 1s ease-in;
opacity: ${props => props.isActive ? 1 : 0.2};
pointer-events: ${props => props.isActive ? "auto" : "none"};
&:active{
    cursor:-webkit-grabbing;
    cursor:-moz-grabbing;
    cursor:grabbing;
    }
`


export default VolumeSlider
