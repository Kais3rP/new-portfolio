import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import styled from "styled-components"



export default function Button({ children, onClick, isActive }) {

    return (
        <ButtonContainer onClick={onClick} className="control-button" isActive={isActive}>
            {children}
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`

    width:50px;
    height:50px;
    border-radius:50%;
    border: ${props => props.isActive ? "5px inset #66ccff" : "5px inset #000"};
    background:none;
    color: ${props => props.isActive ? "#ff6600" : "#000"};
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    pointer-events:auto;
   margin:20px;
   font-size:1.3rem;
 

&:hover {
    opacity:0.8;
}
`