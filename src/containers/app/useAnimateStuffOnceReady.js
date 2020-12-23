import { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"



export default function useAnimateStuffOnceReady({isReady, rippleAnimation, _dropSound, _rippleSprite, handleMenuLinks}   ){

const [isFirstStart, setIsFirstStart] = useState(true)
const isMuted = useSelector( state => state.main.isMuted)
  const location = useLocation()
  useEffect(() => {

    let rippleTimeout;
    if (isReady) {
     if (isFirstStart) handleMenuLinks(location.pathname, null)
     setIsFirstStart(false)
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