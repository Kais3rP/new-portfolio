import React from 'react'
import { useSelector } from "react-redux"
import styled from "styled-components"

const Led = () => {
    const isActive = useSelector( state => state.main.isActive)
    return (
      <StyledDiv isActive={isActive}>

      </StyledDiv>
    )
}

const StyledDiv = styled.div`
width:30px;
height:30px;
border:5px inset #FFF;
border-radius:50%;
background-color: ${props => props.isActive ? "green" : "red"};
z-index:100;
position:absolute;
top:30px;
left:30px;
`

export default Led
