import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

export default function TransitionText({text1, text2}) {
  const [toggle, setToggle] = useState(true);

  const transition = useTransition(toggle, {
    from: { position:"absolute", opacity: 0, scale: 1 },
    enter: { opacity: 1, scale:1 },
    leave: { opacity: 0, scale: 0 }
  });

  const transitionRender = transition((style, toggle) => {
    return toggle ? (
      <animated.div
        onPointerEnter={() => {
          setToggle(false);
        }}
        style={style}
      >
       {text1}
      </animated.div>
    ) : (
      <animated.div
        onPointerLeave={() => {
          setToggle(true);
        }}
        style={style}
      >
        {text2}
      </animated.div>
    );
  });

  return transitionRender
}
