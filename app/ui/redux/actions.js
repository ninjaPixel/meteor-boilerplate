import { ADD_NOTIFICATION, ADD_SNACK, CLOSE_SNACK, SET_NOTIFICATIONS_READ } from './actionTypes';

export const actionSetNotificationsRead = ({ dispatch, _ids }) => {
  dispatch({
    type: SET_NOTIFICATIONS_READ,
    payload: { _ids },
  });
};

export const actionAddSnack = ({ dispatch, message, variant = 'default' }) => {
  dispatch({
    type: ADD_SNACK,
    payload: {
      message,
      variant,
      _id: Date.now().toString(),
      time: new Date(),
      open: true,
    },
  });
};

export const actionCloseSnack = ({ dispatch, _id }) => {
  dispatch({
    type: CLOSE_SNACK,
    payload: { _id },
  });
};

export const actionAddNotification = ({ dispatch, message }) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: { message, time: Date.now(), notificationSeen: false, itemSeen: false, _id: Date.now() },
  });
};
