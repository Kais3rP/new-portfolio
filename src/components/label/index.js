import React from 'react'
import styled from "styled-components"
import brush from "../../pics/brush.png"
import brush2 from "../../pics/brush2.png"
import brush3 from "../../pics/brush3.png"

const index = (props) => {
    function returnSrc(num){
        switch (num){
            case 1 : return brush;
            case 2 : return brush2;
            case 3 : return brush3;
            default : return brush3;
        }
    }
    return (
        <StyledImg {...props} src={returnSrc(props.brush)}>

        </StyledImg>
    )
}

const StyledImg = styled.img`
position:absolute;
top: 6px;
left:-10px;
z-index:0;
width:100%;
min-width:100px;
max-width:400px;
opacity:1;
`

export default index
