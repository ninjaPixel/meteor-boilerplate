import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Snackbar from './Snackbar';
import { actionSnackClose } from '../../../controller/actions';
import { SNACKBAR_TYPES } from './constants';

function SnackbarConnected(props) {
  const { _id, open, message, variant, ...other } = props;
  const dispatch = useDispatch();
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    actionSnackClose({ dispatch, _id });
  }
  return <Snackbar onClose={handleClose} _id={_id} message={message} open={open} variant={variant} {...other} />;
}
SnackbarConnected.propTypes = {
  _id: PropTypes.number.isRequired,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([SNACKBAR_TYPES.error, SNACKBAR_TYPES.info, SNACKBAR_TYPES.warning, SNACKBAR_TYPES.success])
    .isRequired,
};
SnackbarConnected.defaultProps = {
  className: undefined,
};
export default SnackbarConnected;
