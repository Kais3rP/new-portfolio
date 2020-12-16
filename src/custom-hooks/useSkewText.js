import { useGesture } from "react-use-gesture";
import { useSpring } from "react-spring";

export default function useSkewText() {
    const [props, set] = useSpring(() => ({
      transform: "skewY(0deg)"
    }));
  
    const bind = useGesture(
      {
        onMove: ({ event, last }) => {
          const textOrigin = event.target.getBoundingClientRect().width / 2;
          const textXPos = event.target.getBoundingClientRect().x;
          set({
            transform: `skewY(${
              !last ? (event.clientX < textOrigin + textXPos ? -10 : +10) : 0
            }deg)`
          });
        }
      },
      {}
    );
  
    return [bind, props];
  }
  