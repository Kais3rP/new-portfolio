import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

export default function useDragElement(isOpen, setIsOpen, width){
    //react-spring + gesture 
    const [props, set] = useSpring(() => ({
       left: window.innerWidth > 800 ? -(width - (1 / 3 * width)) : -width,
       immediate: 2
   }));
   const bind = useDrag(({ down, direction, distance }) => {
       distance = distance * (direction[0]);
       console.log(distance)
       if (distance > 0 && !down) setIsOpen(true);
       if (distance <= 0 && !down) setIsOpen(false);
       set({
           left: isOpen
               ? down
                   ? distance - (width - (1 / 3 * width))
                   : distance > 0
                       ? -(width - (1 / 3 * width))
                       : -width
               : down
                   ? distance - width
                   : distance > 100
                       ? -(width - (1 / 3 * width))
                       : -width,
           immediate: name => down && name === "x"
       });
   });
   
   return {
   bind,
   props
   }
   }