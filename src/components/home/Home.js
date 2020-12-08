import React, { useEffect } from "react"

export default function Home({ myRef, setCurrentLocation }){
    useEffect(() => {
      //Setting location
      const location = /\w+$/.exec(window.location.href) ? /\w+$/.exec(window.location.href)[0] : "home"
      setCurrentLocation(location)
    },[])
  
    return (
      <div id="home-window" ref={myRef}></div>
    )
  }