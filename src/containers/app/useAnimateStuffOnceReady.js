import { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"



export default function useAnimateStuffOnceReady({isReady, rippleAnimation, _dropSound, _electricSound, _rippleSprite, handleMenuLinks}   ){

const [isFirstStart, setIsFirstStart] = useState(true)
const isMuted = useSelector( state => state.main.isMuted)
const isActive = useSelector( state => state.main.isActive)

  const location = useLocation()
  useEffect(() => {
 
    let rippleTimeout;
    if (isReady) {
     if (isFirstStart) {
       handleMenuLinks(location.pathname, null)
       _electricSound?.play()
     }
     setIsFirstStart(false)
     playRippleAnimation();
    

      function playRippleAnimation() {      
        rippleAnimation?.restart()
        if (!isMuted && isActive) _dropSound?.play()
        _rippleSprite?.position.set(0, 0)
        rippleTimeout = setTimeout(playRippleAnimation, 6000)
        
      }
    }
    return () => { clearTimeout(rippleTimeout) }
  }, [isReady, isMuted, isActive])
}