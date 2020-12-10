import { useState, useEffect } from "react"
import { gsap, TimelineMax } from "gsap"


export default function useAnimateStuffOnceReady(isReady, rippleAnimation, _dropSound, _rippleSprite, isMuted   ){

  useEffect(() => {
  
    let rippleTimeout;
    if (isReady) {
      //Play the ripple continuous animation
      playRippleAnimation();


      function playRippleAnimation() {
        rippleAnimation?.restart()
        if (!isMuted) _dropSound?.play()
        _rippleSprite?.position.set(0, 0)
        rippleTimeout = setTimeout(playRippleAnimation, 6000)
      }
    }
    return () => { clearTimeout(rippleTimeout) }
  }, [isReady, isMuted])
}