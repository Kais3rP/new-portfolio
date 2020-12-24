import React from 'react'
import styled from "styled-components"

const VolumeSlider = () => {
    return (
        <StyledInput onPointerDown={(e) => {
            e.stopPropagation()
        }} style={{ width: "60px" }} type="range" min={0} max={1} step={0.05} >
        </StyledInput>
    )
}

const StyledInput = styled.input`
transform: rotate(90deg);
cursor:-webkit-grab;
cursor:-moz-grab;
cursor:grab;
background:red;
&:active{
    cursor:-webkit-grabbing;
    cursor:-moz-grabbing;
    cursor:grabbing;
    }
`


export default VolumeSlider
