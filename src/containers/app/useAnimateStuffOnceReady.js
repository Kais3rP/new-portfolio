import { useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom";



export default function useAnimateStuffOnceReady({isReady, rippleAnimation, _dropSound, _rippleSprite, isMuted, handleMenuLinks}   ){

  const location = useLocation()
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