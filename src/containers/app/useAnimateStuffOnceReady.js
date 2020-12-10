import { useEffect } from "react"



export default function useAnimateStuffOnceReady({isReady, rippleAnimation, _dropSound, _rippleSprite, isMuted, handleMenuLinks, location}   ){

  useEffect(() => {
  
    let rippleTimeout;
    if (isReady) {
      handleMenuLinks(location.pathname, null)
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