import React from 'react'
import styled from "styled-components"

const TurnedOffScreen = ({style}) => {
    return (
        <StyledDiv style={{...style}}>

        </StyledDiv>
    )
}

const StyledDiv = styled.div`
width:100%;
height:100%;
position:absolute;
background-color:#000;
left:0;
top:0;
z-index:100;
transition: opacity 0.5s linear;
opacity:0;
pointer-events:none;
touch-events:none;
`

export default TurnedOffScreen
