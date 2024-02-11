import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const Spinner = ({ showSpinner }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showSpinner}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Spinner.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
};

export default Spinner;
