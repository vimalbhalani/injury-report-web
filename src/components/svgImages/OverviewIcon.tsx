import React, { ReactElement } from 'react'

interface OverviewIconProps {
  className?: string
  onClick?: () => void
  id?: string
}

const OverviewIcon: React.FC<OverviewIconProps> = React.forwardRef<any, OverviewIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M19.1818 5.54544V17.3636H2.81818V5.54544"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 1H1V5.54545H21V1Z"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.18182 9.18182H12.8182"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
)

export default OverviewIcon
