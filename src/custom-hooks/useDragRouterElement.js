import React, { useState } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import removeSlash from "../helpers/removeSlashFromPathname"

export default function useDragRouterElement(location, history) {
    //react-spring + gesture
    const widthThreshold = window.innerWidth/3;
    const [isScrollingLeft, setisScrollingLeft] = useState(true);
    const [currentPos, setCurrentPos] = useState([0,0]);
   
      const [props, set] = useSpring(() => ({
        transform: `scale(1)`,
        top: 0,
        left: 0,
        immediate: 2
      }));
    
      function moveElement({
        movement: [mx, my],
        down,
        currentPos: [currX, currY],
        event
      }) {
    
       //if (currX === 0) event.target.style.left = 0;
        set({
          left: down
            ? mx
            : 0,
          top: my + currY,
          transform: `scale(${down ? 0.85 : 1}
          )`,
          immediate: name => down && name === "left"
        });
      }
    
      const bind = useDrag(
        ({ down, event, direction, previous, movement, offset, cancel }) => {
          moveElement({ movement, down, currentPos, location, cancel, event });
    
          if (!down)
            setCurrentPos(curr => [curr[0] + movement[0], curr[1] + movement[1]]);
    
          const xDir = direction[0];
          //console.log("xDir",xDir)
          setisScrollingLeft(xDir > 0 ? false : true);
          if ((movement[0] > widthThreshold || movement[0] < -widthThreshold) && !down) {
       if (
         (location.pathname === "/home" && xDir >= 0) ||
         (location.pathname === "/havefun" && xDir <= 0)
       )
         return;
       history.push(
         "/" +
           calculateNextPage(
               removeSlash(location.pathname)
               ,
             xDir
           )
       );
       setCurrentPos([0,0]);
     
     }
   }, {lockDirection:true});
 
   return [bind, props, isScrollingLeft, setisScrollingLeft, currentPos];
 }

function calculateNextPage(path, dir) {
 

    return (path === "home" || path === "") && dir < 0
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
