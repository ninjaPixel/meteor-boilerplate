import { SET_NOTIFICATIONS_READ } from './actionTypes';

export const actionSetNotificationsRead = ({ dispatch, ids }) => {
  dispatch({
    type: SET_NOTIFICATIONS_READ,
    ids,
  });
};
