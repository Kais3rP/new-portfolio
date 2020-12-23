import React from 'react'
import styled from "styled-components"
import mainBackground from "../../pics/main-background.jpg"

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
background:url(${mainBackground});
background-size:100% 100%;
left:0;
top:0;
z-index:100;
transition: opacity 0.5s linear;
opacity:0;
`

export default TurnedOffScreen
