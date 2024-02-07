import React, { ReactElement } from 'react'

interface ViewIconProps {
  className?: string
  onClick?: () => void
  id?: string
}

const ViewIcon: React.FC<ViewIconProps> = React.forwardRef<any, ViewIconProps>((props, ref): ReactElement => {
  return (
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        d="M1 6.5C1 6.5 3.75 1 8.5625 1C13.375 1 16.125 6.5 16.125 6.5C16.125 6.5 13.375 12 8.5625 12C3.75 12 1 6.5 1 6.5Z"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5625 8.56238C9.70159 8.56238 10.625 7.63897 10.625 6.49988C10.625 5.36079 9.70159 4.43738 8.5625 4.43738C7.42341 4.43738 6.5 5.36079 6.5 6.49988C6.5 7.63897 7.42341 8.56238 8.5625 8.56238Z"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

export default ViewIcon
