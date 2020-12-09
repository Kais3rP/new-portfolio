import  { useRef, useEffect } from "react"

export default function usePreviousLocation(location){
    const prevLocRef = useRef(location)
    useEffect(()=>{
        console.log("usePrevLoc", location)
        prevLocRef.current = location
    })

    return prevLocRef.current
}