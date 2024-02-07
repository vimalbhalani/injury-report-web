import React, { ReactElement } from 'react'

interface RoundRightIconProps {
  className?: string
  onClick?: () => void
}

const RoundRightIcon: React.FC<RoundRightIconProps> = React.forwardRef<any, RoundRightIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M21 9.92576V10.8296C20.9988 12.948 20.3005 15.0093 19.0093 16.7061C17.7182 18.4028 15.9033 19.6441 13.8354 20.2447C11.7674 20.8454 9.55726 20.7733 7.53447 20.0391C5.51168 19.3049 3.78465 17.9481 2.61096 16.1709C1.43727 14.3937 0.879791 12.2914 1.02168 10.1776C1.16356 8.0637 1.99721 6.05152 3.39828 4.44113C4.79935 2.83073 6.69279 1.70841 8.79619 1.24154C10.8996 0.774672 13.1003 0.988271 15.07 1.85048"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M21 2.97046L11 12.8042L8 9.85704" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default RoundRightIcon
