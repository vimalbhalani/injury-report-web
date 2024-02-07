import React, { ReactElement } from 'react'

interface CheckboxUnCheckedProps {
  className?: string
  onClick?: () => void
}

const CheckIcon: React.FC<CheckboxUnCheckedProps> = React.forwardRef<any, CheckboxUnCheckedProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <rect x="0.75" y="0.75" width="19.5" height="19.5" rx="2.25" stroke="#069D55" strokeWidth="1.5" />
        <path
          d="M15 7L9.5 13L7 10.2727"
          stroke="#069D55"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
)

export default CheckIcon
