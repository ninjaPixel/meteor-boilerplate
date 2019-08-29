import {
  NOTIFICATION_ADD,
  SNACK_ADD,
  SNACK_CLOSE,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
  ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  NOTIFICATIONS_READ,
} from './actionTypes';

/*
  See https://github.com/redux-utilities/flux-standard-action
  for a high-level overview on structuring actions
 */

export const actionSnackAdd = ({ dispatch, message, variant = 'info' }) => {
  dispatch({
    type: SNACK_ADD,
    payload: {
      message,
      variant,
      _id: Date.now(),
      time: new Date(),
      open: true,
    },
  });
};

export const actionSnackClose = ({ dispatch, _id }) => {
  dispatch({
    type: SNACK_CLOSE,
    payload: { _id },
  });
};

export const actionNotificationAdd = ({ dispatch, message }) => {
  dispatch({
    type: NOTIFICATION_ADD,
    payload: { message, time: Date.now(), notificationSeen: false, itemSeen: false, _id: Date.now() },
  });
};

export const actionNotificationsRead = ({ dispatch, _ids }) => {
  dispatch({
    type: NOTIFICATIONS_READ,
    payload: { _ids },
  });
};

export function actionAccountLogIn({ dispatch, email, password }) {
  dispatch({
    type: ACCOUNT_LOG_IN_WITH_PASSWORD,
    payload: { email, password },
  });
}
export function actionAccountSendPasswordResetEmail({ dispatch, email }) {
  dispatch({
    type: ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
    payload: { email },
  });
}
