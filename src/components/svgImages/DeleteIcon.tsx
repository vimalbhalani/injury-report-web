import React, { ReactElement } from 'react'

interface DeleteIconProps {
  className?: string
  onClick?: (e: any) => void
}

const DeleteIcon: React.FC<DeleteIconProps> = React.forwardRef<any, DeleteIconProps>((props, ref): ReactElement => {
  return (
    <svg width="11" height="12" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path d="M1 3.31143H2.15564H11.4008" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.2457 3.31128V11.4008C10.2457 11.7073 10.124 12.0012 9.90727 12.2179C9.69054 12.4347 9.3966 12.5564 9.0901 12.5564H3.31189C3.0054 12.5564 2.71145 12.4347 2.49473 12.2179C2.278 12.0012 2.15625 11.7073 2.15625 11.4008V3.31128M3.88971 3.31128V2.15564C3.88971 1.84915 4.01147 1.5552 4.22819 1.33848C4.44492 1.12175 4.73886 1 5.04536 1H7.35664C7.66314 1 7.95708 1.12175 8.1738 1.33848C8.39053 1.5552 8.51228 1.84915 8.51228 2.15564V3.31128"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.04492 6.20068V9.66761" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.35742 6.20068V9.66761" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})

export default DeleteIcon
