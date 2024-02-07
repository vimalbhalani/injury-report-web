import React, { ReactElement } from 'react'

interface LikeIconProps {
  className?: string
  onClick?: (e: any) => void
  id?: string
}

const LikeIcon: React.FC<LikeIconProps> = React.forwardRef<any, LikeIconProps>((props, ref): ReactElement => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}>
      <path d="M19.1372 1.94889C18.0057 0.77202 16.4878 0.0814762 14.8872 0.0158562C13.2866 -0.0497638 11.7208 0.513832 10.5031 1.59442C8.82566 0.0974212 6.51839 -0.385836 4.4126 0.316972C2.30622 1.01978 0.703246 2.80869 0.180343 5.04039C-0.342559 7.27208 0.28906 9.62459 1.8489 11.2534L10.1208 19.8392C10.2207 19.9398 10.3542 19.9975 10.493 19.9999C10.6289 19.9968 10.7589 19.9392 10.8546 19.8392L18.5989 11.8011L19.1366 11.3074C20.3295 10.0711 20.9995 8.39375 20.9995 6.64409C20.9995 4.89443 20.3295 3.21713 19.1366 1.98078V1.94827L19.1372 1.94889Z" />
    </svg>
  )
})

export default LikeIcon
