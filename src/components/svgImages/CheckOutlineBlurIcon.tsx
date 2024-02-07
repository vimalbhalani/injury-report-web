import React, { ReactElement } from 'react'

interface CheckboxUnCheckedProps {
  className?: string
  onClick?: () => void
}

const CheckOutlineBlurIcon: React.FC<CheckboxUnCheckedProps> = React.forwardRef<any, CheckboxUnCheckedProps>(
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
        <rect x="0.75" y="0.75" width="19.5" height="19.5" rx="2.25" stroke="#A4A4A4" strokeWidth="1.5" />
      </svg>
    )
  },
)

export default CheckOutlineBlurIcon
