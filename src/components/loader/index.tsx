import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <Backdrop style={{ opacity: 0.5 }} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress sx={{ color: '#0066ff' }} />
    </Backdrop>
  )
}

export default Loader
