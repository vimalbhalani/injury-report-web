import React, { ReactElement } from 'react'

interface ClockIconProps {
  className?: string
  onClick?: () => void
}

const ClockIcon: React.FC<ClockIconProps> = React.forwardRef<any, ClockIconProps>((props, ref): ReactElement => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        stroke="#4F4F4F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 3.80005V8.00005L10.8 9.40005" stroke="#4F4F4F" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

export default ClockIcon
