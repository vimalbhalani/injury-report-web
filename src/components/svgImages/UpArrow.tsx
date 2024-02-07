import React, { ReactElement } from 'react'

interface UpArrowProps {
  className?: string
  onClick?: () => void
}

const UpArrow: React.FC<UpArrowProps> = React.forwardRef<any, UpArrowProps>((props, ref): ReactElement => {
  return (
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.02245 0.192034L0.197642 4.86393C-0.0658805 5.13586 -0.0658805 5.55192 0.197642 5.80796C0.461165 6.06401 0.905713 6.06401 1.16924 5.80796L5.5 1.60006L9.83076 5.80796C10.1106 6.06386 10.5388 6.06386 10.8024 5.80796C11.0659 5.55192 11.0659 5.13601 10.8024 4.86394L5.99405 0.192034C5.71418 -0.0640126 5.28598 -0.0640126 5.02245 0.192034Z"
      />
    </svg>
  )
})

export default UpArrow
