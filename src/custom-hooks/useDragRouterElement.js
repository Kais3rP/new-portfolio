import React, { useState, useEffect } from "react";
import { useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import removeSlash from "../helpers/removeSlashFromPathname"
import * as easings from 'd3-ease';


export default function useDragRouterElement(location, history, handleScrollDirection) {


  //react-spring + gesture
  const width = window.innerWidth
  const widthThreshold = width / 3;

  //react spring  
  const [props, set] = useSpring(() => ({
    position: "absolute",
    transform: `scale(1)`,
    top: 0,
    left: 0,
    immediate: 2,
    config: config.gentle
  }));

  function moveElement({
    movement: [mx, my],
    down,
    cancel,
    location,
    offset: [ox, oy]
  }) {

    if ((mx > widthThreshold || mx < -widthThreshold)&&!down) {
     // if (mx < 0 && location.pathname === "/havefun") return;
      set({
        from: {
          left: mx > 0 ?
            width :
              -width
          ,
          top: 0,
          transform: `scale(0)`,
          immediate: name => down && name === "left",
        },
        to: async next => {
          await next({
            left: mx > 0 ?
              -width :
                +width
            ,
            top: 0,
            transform: `scale(0)`,
            immediate: name => down && name === "left",
          })
          await next({
            left: 0,
            top: 0,
            transform: `scale(1)`,
            immediate: name => down && name === "left",
          })

        },
        reset: true,
        /*     config: {
               duration: 600,
               easing: easings.easeSinInOut
             }*/

      });

    }
    else
      //console.log(widthThreshold, mx)
      set({
        left: down
          ?
          mx :
          0,
        top: my + oy,
        transform: `scale(${down ? 0.9 : 1}
          )`,
        immediate: name => down && name === "left"
      });
  }
  //use gesture   
  const bind = useDrag(
    ({ down, offset, direction, movement, cancel }) => {

      moveElement({ movement, down, offset, location, cancel });

      const xDir = direction[0];
      if (movement[0] > 0) handleScrollDirection(false)
      if (movement[0] < 0) handleScrollDirection(true)

      if ((movement[0] > widthThreshold || movement[0] < -widthThreshold) && !down) {
        if (
          !(location.pathname === "/home" && movement[0] >= 0) ||
          (location.pathname === "/havefun" && movement[0] <= 0)
        ) {
          console.log("pushing new history")
          return history.push(
            "/" +
            calculateNextPage(
              removeSlash(location.pathname)
              ,
              xDir
            )
          );
        }

      }
    }, {

    lockDirection: true
  });

  return [bind, props];
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
