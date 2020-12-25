import React from "react"
import { useSpring, animated } from "react-spring"
import "./index.css"
import styled from "styled-components"



export default function Button({ children, onClick, isActive }) {

    const props = useSpring({
        from: { rotate:0 },
        to: {rotate: 360},
        loop : true
    })

    return (
        <ButtonContainer
        onClick={onClick} 
        isActive={isActive}
       
        >
        <AnimatedBorder isActive={isActive} style={isActive ? props : {}} />
            {children}
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`
    width:50px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:none;
    color: ${props => props.isActive ? "#ff6600" : "#222"};
  position:relative;
    cursor:pointer;
    pointer-events:${props => props.isActive ? "auto" : "none"};
    margin:20px;
    font-size:1.3rem;
    opacity:1;
    transition: all 0.5s linear;
&:hover {
   
}
`

const Border = styled.div`
 width:100%;
    height:100%;
 border-radius:50%;
    border: ${props => props.isActive ? "5px inset #66ccff" : "1px inset #ff6600"};
    position:absolute;
    top:0;
    left:0;
`
const AnimatedBorder = animated(Border)