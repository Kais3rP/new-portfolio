  import React , { useEffect, useRef } from "react"
  import { TimelineMax } from "gsap"
  
  export default function Logo(props){
const localLogoRef = useRef(null);
    useEffect(()=>{
        const moveLogo = new TimelineMax({ repeat: -1, yoyo: true })
        .to(props.logoRef ? props.logoRef.current : localLogoRef.current, 1, { scale: "+=0.1", boxShadow: "0px 0px 1px 1px #ff6600, inset 0px 0px 15px #ff6600" })
    },[])


      const containerStyle = {
        width: "100%",
        position: "relative",
        border: "2px outset #ff6600",
        borderRadius : "20px",
        padding:"25px",
        backgroundImage: "linear-gradient(to top, #070707, #171717)",
        boxShadow: "0px 0px 20px 5px #ff6600, inset 0px 2px 6px #ff6600",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }

const pathStyle = {
    stroke: "#66ccff",
    strokeMiterlimit: 10,
    fill: "url(#grad1)"
}

      return (
        <div {...{...props, style: {...props.style,...containerStyle}, ref:props.logoRef ? props.logoRef : localLogoRef}}    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 185.78 200.51"
           style={{width:"80%"}}
        >
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={props.loadProgress ? props.loadProgress : 100 + "%" } style={{ stopColor: "#66ccff", stopOpacity: 1 }} />
                    <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text x="170" y="200" fill="#ff6600">©</text>
            <path
                            style={pathStyle} d="M104.5,198v2C-12.89,192.52-26.82,30.4,87.5,3V35l-.4,0C16.49,62.46,29.76,160.17,104.5,169v29Z"
                            transform="translate(-8.22 -0.42)" />
                        <path
                             style={pathStyle}
                            d="M135.5,197V166.5c20.58-7.12,45.3-25,58-41V154h-.15c-13.28,20.53-33.91,36.34-57.84,42.08"
                            transform="translate(-8.22 -0.42)" />
                        <path
                             style={pathStyle}
                            d="M159.5,46.5a16,16,0,0,1-1,6c-3.54,9.37-16.32,14.9-32,15v-35c15.55-2.86,28.42.42,32,8A11.78,11.78,0,0,1,159.5,46.5ZM96.5,2.1C97,54,97,106,96.5,157.5a44,44,0,0,0,18,4v39a20,20,0,0,0,3,0,20.26,20.26,0,0,0,9-3V96.5c2,.18,34.06,2.67,51-21a50.19,50.19,0,0,0,9-27,37.45,37.45,0,0,0-3-18c-10.11-22.45-45-33.65-87-28"
                            transform="translate(-8.22 -0.42)" />
        </svg>
    </div>                  
      )
  }