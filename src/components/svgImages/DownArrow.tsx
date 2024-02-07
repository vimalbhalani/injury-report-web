import React, { ReactElement } from 'react'

interface DownArrowIconProps {
  className?: string
  onClick?: () => void
}

const DownArrowIcon: React.FC<DownArrowIconProps> = React.forwardRef<any, DownArrowIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg width="12" height="6" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
        <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default DownArrowIcon
