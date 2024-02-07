import React, { ReactElement } from 'react'

interface CalendarIconProps {
  className?: string
  onClick?: () => void
}

const CalendarIcon: React.FC<CalendarIconProps> = React.forwardRef<any, CalendarIconProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M14.2138 2.33398H2.4381C1.50903 2.33398 0.755859 3.08018 0.755859 4.00065V15.6673C0.755859 16.5878 1.50903 17.334 2.4381 17.334H14.2138C15.1429 17.334 15.896 16.5878 15.896 15.6673V4.00065C15.896 3.08018 15.1429 2.33398 14.2138 2.33398Z"
          stroke="#4F4F4F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11.6895 0.666992V4.00033" stroke="#4F4F4F" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.96277 0.666992V4.00033" stroke="#4F4F4F" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0.755859 7.33398H15.896" stroke="#4F4F4F" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
)

export default CalendarIcon
