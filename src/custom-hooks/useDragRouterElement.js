import React, { useState } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import removeSlash from "../helpers/removeSlashFromPathname"

export default function useDragRouterElement(location, history) {
    //react-spring + gesture
    const width = window.innerWidth
    const widthThreshold = width/3;
    const [isScrollingLeft, setisScrollingLeft] = useState(true);
    const [currentPosY, setCurrentPosY] = useState(0);
 //react spring  
      const [props, set] = useSpring(() => ({
        position:"absolute",
        transform: `scale(1)`,
        top: 0,
        left: 0,
        immediate: 2
      }));
    
      function moveElement({
        movement: [mx, my],
        down,
        currentPosY:currY,
        cancel,
        location
      }) {

    if (mx > widthThreshold || mx < -widthThreshold) {
      cancel();
      set({
        left: mx > 0 ?        
        width :
        location.pathname === "/havefun" ?
        0 :
        -width
        ,
        top: 0,
        transform: `scale(${mx < 0 && location.pathname === "/havefun" ? 1 : 0.85})`,
        immediate: name => down && name === "left"
      });

    }
    else
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
 //use gesture   
      const bind = useDrag(
        ({ down, event, direction, movement, cancel }) => {
          moveElement({ movement, down, currentPosY, location, cancel });
    
          if (!down)
            setCurrentPosY(curr =>curr + movement[1]);
    
          const xDir = direction[0];
        
         if (movement[0] > 0) setisScrollingLeft( false )
         if (movement[0] < 0) setisScrollingLeft( true )
          if ((movement[0] > widthThreshold || movement[0] < -widthThreshold) && !down) {
       if (
         (location.pathname === "/home" && movement[0] >= 0) ||
         (location.pathname === "/havefun" && movement[0] <= 0)
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
       setCurrentPosY(0);
     
     }
   }, {lockDirection:true});
 
   return [bind, props, isScrollingLeft, setisScrollingLeft, currentPosY];
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
