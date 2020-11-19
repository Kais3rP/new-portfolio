import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin)

export default function moveLink(link, target){
    console.log(target)
    gsap.to(link, {
        motionPath: {
          path: [
          {x:0, y:(target.getBoundingClientRect().y - link.getBoundingClientRect().y)/2},{x:(target.getBoundingClientRect().x - link.getBoundingClientRect().x)/2, y:(target.getBoundingClientRect().y - link.getBoundingClientRect().y)/2},
            {x:target.getBoundingClientRect().x - link.getBoundingClientRect().x, y:target.getBoundingClientRect().y - 50 }
          ],         
        },
        duration: 5,
        transformOrigin: "50% 50%",
        ease: "power1.inOut"
      });
}