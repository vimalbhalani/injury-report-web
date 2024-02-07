import React, { ReactElement } from 'react'

interface LeftArrowIconProps {
  className?: string
  onClick?: () => void
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = React.forwardRef<any, LeftArrowIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
        <path d="M7 1L1 7L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default LeftArrowIcon
