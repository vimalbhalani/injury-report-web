import { createTheme } from '@mui/material'

const fontFamily = 'Poppins'

//override material ui components styles
export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiFormHelperText-root': {
              fontFamily: fontFamily,
              margin: '2px 0 0 0',
              color: 'red',
            },
          },
        },
      ],
    },
  },
})
