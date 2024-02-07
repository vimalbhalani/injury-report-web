import React, { ReactElement } from 'react'

interface PhotosIconProps {
  className?: string
  onClick?: () => void
  id?: string
}

const PhotosIcon: React.FC<PhotosIconProps> = React.forwardRef<any, PhotosIconProps>((props, ref): ReactElement => {
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
      id="photo-icon"
    >
      <g clipPath="url(#clip0_2218_726)">
        <path
          d="M18.3585 4.66781H17.6353L16.8158 0.0800781L0.882812 2.84691L4.06459 20.4884L7.17405 19.9445V22.5694H23.3722V9.56297L18.3585 4.66781ZM18.6477 6.27589L21.709 9.2792H18.6477V6.27589ZM4.83593 19.3769L1.99161 3.60365L16.0444 1.16789L16.6712 4.66781L7.14994 4.64417V18.9749L4.83593 19.3769ZM8.11412 21.5999V5.59009L17.6835 5.61374V10.2251H22.3839V21.5999H8.11412Z"
          fill="#4F4F4F"
        />
        <path
          d="M16.3343 17.0356L13.7792 13.7012L9.89844 19.7787H20.6249L17.6841 15.7586L16.3343 17.0356Z"
          fill="#4F4F4F"
        />
        <path
          d="M19.708 13.4651C19.708 14.1441 19.1472 14.6948 18.4546 14.6948C17.762 14.6948 17.2012 14.1441 17.2012 13.4651C17.2012 12.786 17.7625 12.2354 18.4546 12.2354C19.1467 12.2354 19.708 12.786 19.708 13.4651Z"
          fill="#4F4F4F"
        />
      </g>
      <defs>
        <clipPath id="clip0_2218_726">
          <rect width="22.4894" height="22.4894" fill="white" transform="translate(0.882812 0.0800781)" />
        </clipPath>
      </defs>
    </svg>
  )
})

export default PhotosIcon
