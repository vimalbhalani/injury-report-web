import React, { ReactElement } from 'react'

interface LikeOutlinedProps {
  className?: string
  onClick?: (e: any) => void
  id?: string
}

const LikeOutlined: React.FC<LikeOutlinedProps> = React.forwardRef<any, LikeOutlinedProps>(
  (props, ref): ReactElement => {
    return (
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M12.8845 1.99297C12.5699 1.67817 12.1963 1.42845 11.7851 1.25807C11.3739 1.08769 10.9332 1 10.4881 1C10.043 1 9.60223 1.08769 9.19104 1.25807C8.77985 1.42845 8.40625 1.67817 8.0916 1.99297L7.43858 2.64599L6.78556 1.99297C6.14998 1.35739 5.28795 1.00033 4.3891 1.00033C3.49026 1.00033 2.62823 1.35739 1.99265 1.99297C1.35707 2.62855 1 3.49059 1 4.38943C1 5.28828 1.35707 6.15031 1.99265 6.78589L2.64566 7.43891L7.43858 12.2318L12.2315 7.43891L12.8845 6.78589C13.1993 6.47124 13.449 6.09764 13.6194 5.68645C13.7898 5.27526 13.8775 4.83453 13.8775 4.38943C13.8775 3.94434 13.7898 3.50361 13.6194 3.09242C13.449 2.68122 13.1993 2.30763 12.8845 1.99297V1.99297Z"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
)

export default LikeOutlined
