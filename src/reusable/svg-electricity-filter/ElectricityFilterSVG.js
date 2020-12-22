import React from "react"

export default function ElectricityFilterSVG({ id }) {
    return (
      <>
        <filter id={"shock" + id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.2"
            numOctaves="1"
            seed="2"
            result="noise"
          >
            <animate
              attributeType="XML"
              attributeName="seed"
              from="2"
              to="120"
              dur="12s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feMorphology
            in="SourceGraphic"
            operator="dilate"
            radius="5"
            result="morph1"
          />
          <feMorphology
            in="morph1"
            operator="dilate"
            radius="2"
            result="morph2"
          />
          <feComposite
            operator="out"
            in="morph2"
            in2="morph1"
            result="strokeText"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            in="strokeText"
            in2="noise"
            result="displacementMap"
            color-interpolation-filters="sRGB"
            scale="10"
          />
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="displacementMap" />
          </feMerge>
        </filter>
        <use
          xlinkHref={"#" + id}
          x="2"
          y="2"
          filter={`url(#shock${id})`}
          stroke="0"
          stroke-width="1"
          fill="#FFF"
        />
      </>
    );
  }