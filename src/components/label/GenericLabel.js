import React from 'react'
import { useSelector } from "react-redux"
import styled from "styled-components"
import brush from "../../pics/brush.png"
import brush2 from "../../pics/brush2.png"
import brush3 from "../../pics/brush3.png"

const GenericLabel = (props) => {

const isActive = useSelector( state => state.main.isActive)

    function returnSrc(num) {
        switch (num) {
            case 1: return brush;
            case 2: return brush2;
            case 3: return brush3;
            default: return brush3;
        }
    }
    return (
        <StyledDiv {...props} isActive={isActive}>
            <StyledText>{props.text}</StyledText>
            <StyledImg width={props.brushWidth} src={returnSrc(props.brush)} />
        </StyledDiv>
    )
}


const StyledDiv = styled.div`
position:relative;
width:100%;
opacity:${props => props.isActive ? 1 : 0.2}
`

const StyledText = styled.p`
position:absolute;
top:0;
left:0;

`

const StyledImg = styled.img`
position:absolute;
top: 8px;
left:0px;
z-index:0;
width: ${ props => props.width ? props.width : "100%"};
opacity:1;
`

export default GenericLabel
