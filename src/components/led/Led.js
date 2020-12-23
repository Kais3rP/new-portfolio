import React from 'react'
import { useSelector } from "react-redux"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

const Led = () => {
    const isActive = useSelector( state => state.main.isActive)
    const props = useSpring({
      from : { boxShadow: `0 0 2px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 4px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 8px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 12px #FFF, 0 0 16px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 20px ${isActive ? "#b5e550" : "#cc1c1c"}` },
      to : { boxShadow: `0 0 4px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 8px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 16px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 24px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 32px ${isActive ? "#b5e550" : "#cc1c1c"}, 0 0 40px ${isActive ? "#b5e550" : "#cc1c1c"}`},
      loop : { reverse: true}
    })
    return (
      <AnimatedDiv isActive={isActive} style={props}>

      </AnimatedDiv>
    )
}

const StyledDiv = styled.div`
width:30px;
height:30px;
border:5px inset  #ff6600;
border-radius:50%;
background-color: ${props => props.isActive ? "#b5e550" : "red"};
z-index:100;
position:absolute;
top:30px;
left:30px;
`
const AnimatedDiv = animated(StyledDiv)

export default Led
