import React, { ReactElement } from 'react'

interface CheckboxUnCheckedProps {
  className?: string
  onClick?: () => void
}

const CheckboxUnChecked: React.FC<CheckboxUnCheckedProps> = React.forwardRef<any, CheckboxUnCheckedProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <g filter="url(#filter0_i_248_7619)">
          <rect width="12.0225" height="12.0225" rx="1" fill="white" />
        </g>
        <rect x="0.25" y="0.25" width="11.5225" height="11.5225" rx="0.75" strokeWidth="0.5" />
        <defs>
          <filter
            id="filter0_i_248_7619"
            x="0"
            y="0"
            width="12.0234"
            height="12.0225"
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
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_248_7619" />
          </filter>
        </defs>
      </svg>
    )
  },
)

export default CheckboxUnChecked
