import { SET_NOTIFICATIONS_READ } from './actionTypes';

export const actionSetNotificationsRead = ({ dispatch, notificationIds }) => {
  dispatch({
    type: SET_NOTIFICATIONS_READ,
    ids: notificationIds,
  });
};
