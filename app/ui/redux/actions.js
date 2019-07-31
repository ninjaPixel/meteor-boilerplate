import { ADD_NOTIFICATION, ADD_SNACK, REMOVE_SNACK, SET_NOTIFICATIONS_READ } from './actionTypes';

export const actionSetNotificationsRead = ({ dispatch, ids }) => {
  dispatch({
    type: SET_NOTIFICATIONS_READ,
    ids,
  });
};

export const actionAddSnack = ({ dispatch, message, variant = 'info' }) => {
  dispatch({
    type: ADD_SNACK,
    message,
    variant,
    id: Date.now(),
  });
};

export const actionRemoveSnack = ({ dispatch, id }) => {
  dispatch({
    type: REMOVE_SNACK,
    id,
  });
};

export const actionAddNotification = ({ dispatch, message }) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: { message, time: new Date(), notificationSeen: false, itemSeen: false, _id: new Date().toISOString() },
  });
};
