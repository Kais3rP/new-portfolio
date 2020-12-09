import React, { useState } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import removeSlash from "../helpers/removeSlashFromPathname"

export default function useDragRouterElement(location, history) {
    //react-spring + gesture

    const [isScrollingLeft, setisScrollingLeft] = useState(false);
    const [currentPos, setCurrentPos] = useState([0,0]);
    const [props, set] = useSpring(() => ({
      transform: `translate(0px, 0px)`,
      immediate: 2
    }));
  
    function moveElementX([mx, my], down, [currX,currY]) {
      //console.log("inside movement", mx, my,currX, currY);
     console.log("mx,my",mx,my,  "currX:",currX)
      set({
        transform: `translate(${mx+currX  }px,${my +  currY }px)`,
        immediate: name => down && name === "xy"
      });
     //  if (my >= 70 || my <= -70)
     /* set({
      transform: `translate(0px,${my + currY}px)`,
        immediate: name => down && name === "xy"
      });*/
    }
  
    const bind = useDrag(({ down, event, direction, previous, movement, offset, cancel }) => {
      const elementWidth = event.target.getBoundingClientRect().width;
      moveElementX(movement, down, currentPos);
      if (!down) setCurrentPos(curr => [curr[0]+movement[0], curr[1]+movement[1]]);
       
       const xDir = direction[0]
      if (xDir < 0) setisScrollingLeft(true);
      if (xDir > 0) setisScrollingLeft(false);
      //Manage location change on certain conditions
      /*console.log(
        "isScrollingLeft",
        isScrollingLeft,
        "distance:",
        direction,
        "scrolled:",
        window.innerHeight + currentPos,
        "currentPos:",
        currentPos
      );*/
      if (
        false
      ) {
        if (
          (location.pathname === "/1" && xDir >= 0) ||
          (location.pathname === "/5" && xDir <= 0)
        )
          return;
        history.push(
          "/" +
            calculateNextPage(
              removeSlash(location.pathname)
                ? removeSlash(location.pathname)[0]
                : 1,
              xDir
            )
        );
        setCurrentPos([0,0]);
      
      }
    }, {lockDirection:true});
  
    return [bind, props, isScrollingLeft, currentPos];
  }

function calculateNextPage(path, dir) {
    console.log(path, dir);

    return (path === "home" || path === "/") && dir < 0
            ? "about"
            : path === "about" && dir < 0
                ? "projects"
                : path === "about" && dir > 0
                    ? "home"
                    : path === "projects" && dir < 0
                        ? "technologies"
                        : path === "projects" && dir > 0
                            ? "about"
                            : path === "technologies" && dir < 0
                                ? "havefun"
                                : path === "technologies" && dir > 0
                                    ? "projects"
                                    : path === "havefun" && dir < 0
                                        ? "havefun"
                                        : path === "havefun" && dir > 0
                                            ? "technologies"
                                            : path;
}
