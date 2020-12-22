import { useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

export default function useSetStrokeOnMove(length) {
    const [{ stroke }, set] = useSpring(() => ({
      stroke: length
    }));
    const bind = useGesture({
      onMove: (state) => {
        const mouseY = state.event.pageY;
        const height = state.event.target.parentNode.getBoundingClientRect()
          .height;
        //console.log(transposeRange(mouseY, 0, height, length/3, length+200))
        set({
          stroke:
            mouseY < length
              ? transposeRange(mouseY, 0, height, length/3, length+200)
              : length
        });
      }
    });
    return [bind, stroke];
  }

  //utility
function transposeRange(value, x1, y1, x2, y2) {
    return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
  }
  