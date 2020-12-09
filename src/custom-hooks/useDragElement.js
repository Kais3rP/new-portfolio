import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

export default function useDragElement(isOpen, setIsOpen, width, dir) {
    //react-spring + gesture
    const [props, set] = useSpring(() => ({
      [dir]: window.innerWidth > 800 ? -(width - (1 / 3) * width) : -width,
      immediate: 2
    }));
    const bind = useDrag(({ down, movement }) => {
      const distance = dir === "left" ? movement[0] : -movement[0];
      if (distance > 30 && !down) setIsOpen(true);
      if (distance <= -30 && !down) setIsOpen(false);
      
      set({
        [dir]: isOpen
          ? down
            ? distance - (width - (1 / 3) * width) //it closes gradually
            : distance <= -30
            ? -width
            : -(width - (1 / 3) * width)
          : down
          ? distance - width
          : distance > 30
          ? -(width - (1 / 3) * width) //it opens
          : -width,
        immediate: name => down && name === "x"
      });
    });
  
    return [bind, props];
  }
  