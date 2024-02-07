import React, { ReactElement } from 'react'

interface ExpandMoreIconProps {
  className?: string
  onClick?: () => void
}

const ExpandMoreIcon: React.FC<ExpandMoreIconProps> = React.forwardRef<any, ExpandMoreIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="20"
        height="12"
        viewBox="0 0 20 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path d="M2 2L10 10L18 2" stroke="#4F4F4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default ExpandMoreIcon
