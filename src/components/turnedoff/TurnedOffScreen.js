import React from 'react'
import styled from "styled-components"
import mainBackground from "../../pics/main-background.jpg"
import {  useSelector } from "react-redux"

const TurnedOffScreen = ({style}) => {
    const isActive = useSelector(state => state.main.isActive)
    return (
        <StyledDiv isActive={isActive} style={{...style}}>

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
z-index:10;
transition: opacity 1.5s ease-in;
opacity:${ props => props.isActive ? 0 : 1};
touch-events: ${ props => props.isActive ? "none" : "none" } !important;
pointer-events: ${ props => props.isActive ? "none" : "none" } !important;
`

export default TurnedOffScreen
