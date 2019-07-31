import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import userTools from '../../../imports/modules/userTools';

const propTypes = {
  className: PropTypes.string,
  notification: PropTypes.object.isRequired,
};
const defaultProps = {
  className: undefined,
};

const RADIUS = 8;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  circle: {
    flexGrow: 0,
    flexShrink: 0,
    height: RADIUS,
    width: RADIUS,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: theme.spacing(2),
  },
  emptyCircle: {
    border: `1px solid ${theme.palette.text.primary}`,
    opacity: 0.75,
  },
  filledCircle: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const NotificationListLine = props => {
  const { className, notification } = props;
  const { message, notificationSeen } = notification;
  const classes = useStyles();
  const rootClass = className || classes.root;
  const circleClass = `${classes.circle} ${notificationSeen ? classes.emptyCircle : classes.filledCircle}`;
  return (
    <div className={rootClass}>
      <span className={circleClass} />
      <Typography noWrap>{message}</Typography>
    </div>
  );
};

NotificationListLine.propTypes = propTypes;

NotificationListLine.defaultProps = defaultProps;

export default NotificationListLine;
