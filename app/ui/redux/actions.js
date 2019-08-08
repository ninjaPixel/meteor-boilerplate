import {
  ADD_NOTIFICATION,
  ADD_SNACK,
  CLOSE_SNACK,
  SEND_PASSWORD_RESET_EMAIL,
  SET_NOTIFICATIONS_READ,
} from './actionTypes';

/*
  See https://github.com/redux-utilities/flux-standard-action
  for a high-level overview on structuring actions
 */

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

export function actionLogInWithPassword({ dispatch, email, password }) {}
export function actionSendPasswordResetEmail({ dispatch, email }) {
  dispatch({
    type: SEND_PASSWORD_RESET_EMAIL,
    payload: { email },
  });
}
