import React, { ReactElement } from 'react'

interface RightArrowIconProps {
  className?: string
  onClick?: () => void
}

const RightArrowIcon: React.FC<RightArrowIconProps> = React.forwardRef<any, RightArrowIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
        <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default RightArrowIcon
