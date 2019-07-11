import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import Notifications from '@material-ui/icons/Notifications';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { Store } from '../../store/Store';
import newRoutes from '../../../imports/modules/newRoutes';
import useWidthMUI from '../../hooks/useWidthMUI';
import NotificationList from './NotificationList';

const propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  notifications: PropTypes.array,
};
const defaultProps = {
  notifications: [],
};

const useStyles = makeStyles(theme => ({
  root: {},
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  notificationList: {
    padding: theme.spacing(3),
    maxWidth: 400,
    height: '100%',
    overflowY: 'auto',
  },
  notificationPaper: {
    position: 'absolute',
    right: theme.spacing(1),
    // marginTop: theme.spacing(1) * -1,
    maxHeight: '90vh',
    height: 400,
  },
}));

const NotificationBell = props => {
  const { className, history, location } = props;
  const { state } = React.useContext(Store);
  const [showNotificationsPopUp, setShowNotificationsPopUp] = React.useState(false);
  const { notifications } = state;

  const screenWidth = useWidthMUI();
  const unseenCount = notifications.filter(({ notificationSeen }) => !notificationSeen).length;

  const classes = useStyles();
  const rootClass = className || classes.root;
  const handleClick = () => {
    const notificationPath = newRoutes.notifications.getPath();
    const largeScreen = ['md', 'lg', 'xl'].includes(screenWidth);
    if (!largeScreen && location.pathname !== notificationPath) {
      history.push(notificationPath);
    } else if (largeScreen) {
      setShowNotificationsPopUp(!showNotificationsPopUp);
    }
  };
  return (
    <div>
      <Button className={rootClass} onClick={handleClick}>
        <Badge className={classes.margin} badgeContent={unseenCount} color="secondary">
          <Notifications />
        </Badge>
      </Button>
      {showNotificationsPopUp ? (
        <ClickAwayListener onClickAway={handleClick}>
          <Paper elevation={7} className={classes.notificationPaper}>
            <NotificationList className={classes.notificationList} />
          </Paper>
        </ClickAwayListener>
      ) : null}
    </div>
  );
};

NotificationBell.propTypes = propTypes;

NotificationBell.defaultProps = defaultProps;

export default NotificationBell;
