import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green, lightBlue, red, brown } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SNACKBAR_TYPES } from './constants';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[50],
    color: green[800],
    border: `2px solid ${green[900]}`,
  },
  error: {
    backgroundColor: red[50],
    color: red[800],
    border: `2px solid ${red[900]}`,
  },
  info: {
    backgroundColor: lightBlue[50],
    color: lightBlue[900],
    border: `2px solid ${lightBlue[900]}`,
  },
  warning: {
    backgroundColor: amber[100],
    color: brown[600],
    border: `2px solid ${brown[600]}`,
  },
  snackContentRoot: {
    flexWrap: 'nowrap',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    marginRight: theme.spacing(2),
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  message: {
    // fontSize: theme.typography.h6.fontSize,
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  const rootClass = classNames({
    [className]: className,
    [classes[variant]]: true,
  });

  const iconClass = classNames({
    [classes.icon]: true,
    [classes.iconVariant]: true,
  });

  return (
    <SnackbarContent
      className={rootClass}
      classes={{ root: classes.snackContentRoot }}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.messageContainer}>
          <Icon className={iconClass} />
          <Typography className={classes.message}>{message}</Typography>
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([SNACKBAR_TYPES.error, SNACKBAR_TYPES.info, SNACKBAR_TYPES.warning, SNACKBAR_TYPES.success])
    .isRequired,
};

MySnackbarContentWrapper.defaultProps = {
  className: undefined,
};

function CustomizedSnackbar(props) {
  const { _id, open, onClose, ...other } = props;
  const dispatch = useDispatch();

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    onClose({ dispatch, _id });
  }

  /*
    Note that I have disabled the autoClose duration, this means that
    snacks will just pile up on top of each other.
    If you want to enable autoClose then make sure you have a way of displaying
    multiple snacks at a time, otherwise the user may miss messages.
   */
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      // autoHideDuration={6000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper onClose={handleClose} {...other} />
    </Snackbar>
  );
}
CustomizedSnackbar.propTypes = {
  _id: PropTypes.number.isRequired,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([SNACKBAR_TYPES.error, SNACKBAR_TYPES.info, SNACKBAR_TYPES.warning, SNACKBAR_TYPES.success])
    .isRequired,
};

CustomizedSnackbar.defaultProps = {
  className: undefined,
};
export default CustomizedSnackbar;
