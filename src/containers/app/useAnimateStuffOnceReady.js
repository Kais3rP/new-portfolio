import { useState, useEffect } from "react"
import { gsap, TimelineMax } from "gsap"


export default function useAnimateStuffOnceReady(isReady, homeRef, arrowDownRef, havefunRef, arrowUpRef, handleMenuLinks, homeLinkRef, previousLinkRef, rippleAnimation, _dropSound, _rippleSprite   ){

  useEffect(() => {
    console.log("test ref inside app component", homeRef.current)
    let rippleTimeout;
    if (isReady) {
      //Play the ripple continuous animation
      playRippleAnimation();
      //Play the Arrows infinite animation
      const arrowTlDown = new TimelineMax()
        .to(arrowDownRef.current, 0.3, { repeat: -1, yoyo: true, y: 15 })
        .to(arrowDownRef.current, 1, {
          rotate: 180,
          scrollTrigger: { trigger: havefunRef.current, start: "center bottom", toggleActions: 'restart reset restart reset' }
        })
      gsap.set(arrowUpRef.current, { rotate: 180 });
      const arrowTlUp = new TimelineMax()
        .to(arrowUpRef.current, 0.3, { repeat: -1, yoyo: true, y: -15 })
        .to(arrowUpRef.current, 1, {
          rotate: 180,
          scrollTrigger: { trigger: homeRef.current, start: "top top", toggleActions: 'restart reset restart reset' }
        })
      //Move the first nav menu link on load
      handleMenuLinks(homeLinkRef, previousLinkRef);

      function playRippleAnimation() {
        rippleAnimation?.restart()
        _dropSound?.play()
        _rippleSprite?.position.set(0, 0)
        rippleTimeout = setTimeout(playRippleAnimation, 6000)
      }
    }
    return () => { clearTimeout(rippleTimeout) }
  }, [isReady])
}