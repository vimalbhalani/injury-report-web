import React, { ReactElement } from 'react'

interface UserIconProps {
  className?: string
  onClick?: () => void
}

const UserIcon: React.FC<UserIconProps> = React.forwardRef<any, UserIconProps>((props, ref): ReactElement => {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        d="M13.4986 13.2849C13.4757 14.069 13.4334 14.7621 13.3541 15.3871C11.5761 16.7085 9.35474 17.5 6.97505 17.5C4.59637 17.5 2.35403 16.708 0.577382 15.3688C0.520508 14.7473 0.5 14.0747 0.5 13.292C0.5 11.0917 2.26711 9.15293 4.86591 8.43757L5.97849 8.13131L4.99418 7.52901C3.90479 6.8624 3.19371 5.66254 3.19371 4.30479C3.19371 2.2136 4.88575 0.5 6.99933 0.5C9.11483 0.5 10.8049 2.18992 10.8049 4.30479C10.8049 5.6803 10.0737 6.85964 9.00014 7.53169L8.03535 8.13564L9.1328 8.43758C11.7284 9.15172 13.4948 11.1117 13.4986 13.2849Z"
        stroke="white"
      />
    </svg>
  )
})

export default UserIcon
