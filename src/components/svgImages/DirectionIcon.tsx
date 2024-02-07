import React, { ReactElement } from 'react'

interface DirectionIconProps {
  className?: string
  onClick?: () => void
}

const DirectionIcon: React.FC<DirectionIconProps> = React.forwardRef<any, DirectionIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="512"
        height="512"
        x="0"
        y="0"
        viewBox="0 0 426.667 426.667"
        {...props}
        ref={ref}
      >
        <g transform="matrix(0.9999999999999998,0,0,0.9999999999999998,1.4210854715202004e-13,2.842170943040401e-14)">
          <path
            d="m420.327 198.24-192-192c-8.32-8.32-21.867-8.32-30.08 0l-192 192c-8.32 8.32-8.32 21.867 0 30.187l192 191.893v.107c8.32 8.32 21.867 8.32 30.187 0l192-192c8.319-8.427 8.319-21.867-.107-30.187zm-164.374 68.373V213.28H170.62v64h-42.667v-85.333a21.259 21.259 0 0 1 21.333-21.333h106.667V117.28l74.667 74.667-74.667 74.666z"
            fill="#000000"
            data-original="#000000"
          ></path>
        </g>
      </svg>
    )
  },
)

export default DirectionIcon
