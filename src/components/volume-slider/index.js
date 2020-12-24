import React from 'react'
import { useSelector } from "react-redux"
import styled from "styled-components"
import * as PIXISound from "pixi-sound"

const VolumeSlider = () => {

    const isActive = useSelector( state => state.main.isActive )

    return (
        <StyledInput onChange={(e) => {
            e.stopPropagation();
            PIXISound.default.volumeAll = e.target.value;
        }} isActive={isActive} style={{ width: "60px", opacity: isActive ? 1 : 0.2 }} type="range" min={0} max={1} step={0.05} >
        </StyledInput>
    )
}

const StyledInput = styled.input`
width:60px;
transform: rotate(270deg);
cursor:-webkit-grab;
cursor:-moz-grab;
cursor:grab;
background:red;
transition: all 1s ease-in;
opacity: ${ props => props.isActive ? 1 : 0.2};
pointer-events: ${ props => props.isActive ? "auto" : "none"};
&:active{
    cursor:-webkit-grabbing;
    cursor:-moz-grabbing;
    cursor:grabbing;
    }
`


export default VolumeSlider
