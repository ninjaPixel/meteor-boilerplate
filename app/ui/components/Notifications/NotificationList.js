import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { Store } from '../../store/Store';
import NotificationListLine from './NotificationListLine';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
}));

const NotificationList = props => {
  const { className } = props;
  const classes = useStyles();
  const { state, eventHandlers } = React.useContext(Store);
  const { notifications } = state;
  React.useEffect(
    () =>
      // when the component unmounts, mark the notifications as 'read'
      () => {
        eventHandlers.notifications.setRead(notifications.map(n => n._id));
      },
    [],
  );
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      {notifications.map(notification => (
        <NotificationListLine key={notification._id} notification={notification} />
      ))}
    </div>
  );
};

NotificationList.propTypes = propTypes;

NotificationList.defaultProps = defaultProps;

export default NotificationList;
