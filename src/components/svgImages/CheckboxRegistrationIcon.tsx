import React, { ReactElement } from 'react'

interface CheckboxRegistrationIconProps {
  className?: string
  onClick?: () => void
}

const CheckboxRegistrationIcon: React.FC<CheckboxRegistrationIconProps> = React.forwardRef<
  any,
  CheckboxRegistrationIconProps
>((props, ref): ReactElement => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <g filter="url(#filter0_i_1616_29601)">
        <rect width="14" height="14" rx="1" fill="white" />
      </g>
      <rect x="0.25" y="0.25" width="13.5" height="13.5" rx="0.75" strokeWidth="0.5" />
      <path d="M11.1998 4.20023L5.4248 9.80023L2.7998 7.25477" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <filter
          id="filter0_i_1616_29601"
          x="0"
          y="0"
          width="14"
          height="14"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1616_29601" />
        </filter>
      </defs>
    </svg>
  )
})

export default CheckboxRegistrationIcon
