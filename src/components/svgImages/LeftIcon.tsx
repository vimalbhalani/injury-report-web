import React, { ReactElement } from 'react'

interface LeftIconProps {
  className?: string
  onClick?: () => void
}

const LeftIcon: React.FC<LeftIconProps> = React.forwardRef<any, LeftIconProps>((props, ref): ReactElement => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path d="M15 8H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 15L1 8L8 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

export default LeftIcon
