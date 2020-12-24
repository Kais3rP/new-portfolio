import React from 'react'
import { useSelector } from "react-redux"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

const Led = () => {
    const isActive = useSelector( state => state.main.isActive)
    const props = useSpring({
      from : { boxShadow: `0 0 2px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 4px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 8px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 12px #FFF, 0 0 16px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 20px ${isActive ? " #66ccff" : " #ff6600"}` },
      to : { boxShadow: `0 0 4px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 8px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 16px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 24px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 32px ${isActive ? " #66ccff" : " #ff6600"}, 0 0 40px ${isActive ? " #66ccff" : " #ff6600"}`},
      loop : { reverse: true}
    })
    return (
      <AnimatedDiv isActive={isActive} style={props}>

      </AnimatedDiv>
    )
}

const StyledDiv = styled.div`
width:20px;
height:20px;
border:2px inset  #ff6600;
border-radius:50%;
background-color: ${props => props.isActive ? " #66ccff" : " #ff6600"};
z-index:100;
position:absolute;
top:30px;
left:30px;
`
const AnimatedDiv = animated(StyledDiv)

export default Led
