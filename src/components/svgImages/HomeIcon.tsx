import React, { ReactElement } from 'react'

interface HomeIconProps {
  className?: string
  onClick?: () => void
  id?: string
}

const HomeIcon: React.FC<HomeIconProps> = React.forwardRef<any, HomeIconProps>((props, ref): ReactElement => {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        d="M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
        fill="#F0F0F0"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 21V11H13V21" fill="#F0F0F0" />
      <path d="M7 21V11H13V21" stroke="#4F4F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

export default HomeIcon
