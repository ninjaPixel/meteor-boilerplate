import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import NotificationListLine from './NotificationListLine';
import { useStoreNotifications } from '../../hooks/reduxSelectors';
import { actionNotificationsRead } from '../../../controller/actions';
import EmptyState from './EmptyState';

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
  const notifications = useStoreNotifications();
  const dispatch = useDispatch();

  React.useEffect(
    () =>
      // when the component unmounts, mark the notifications as 'read'
      () => {
        actionNotificationsRead({ dispatch, _ids: notifications.map(n => n._id) });
      },
    [],
  );
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      {notifications.length ? (
        notifications.map(notification => <NotificationListLine key={notification._id} notification={notification} />)
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

NotificationList.propTypes = propTypes;

NotificationList.defaultProps = defaultProps;

export default NotificationList;
