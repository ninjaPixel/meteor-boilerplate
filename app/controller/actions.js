import {
  NOTIFICATION_ADD,
  SNACK_ADD,
  SNACK_CLOSE,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
  ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  NOTIFICATIONS_READ,
  ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  FORM_STATE_UPDATE,
  ACCOUNT_CREATE_NEW_USER,
  ACCOUNT_LOG_OUT,
  ACCOUNT_LOGGED_IN,
} from './actionTypes';
import { LOGIN_FORM_KEY } from './reducers/constants';

/*
  See https://github.com/redux-utilities/flux-standard-action
  for a high-level overview on structuring actions
 */

export const createSnackDispatch = ({ message, variant = 'info' }) => {
  return {
    type: SNACK_ADD,
    payload: {
      message,
      variant,
      _id: Date.now(),
      time: new Date(),
      open: true,
    },
  };
};

export const actionSnackAdd = ({ dispatch, message, variant }) => {
  dispatch(createSnackDispatch({ message, variant }));
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

export function actionAccountLogIn({ dispatch }) {
  dispatch({
    type: ACCOUNT_LOG_IN_WITH_PASSWORD,
  });
}

export function actionAccountLogOut({ dispatch }) {
  dispatch({
    type: ACCOUNT_LOG_OUT,
  });
}
export function actionAccountSendPasswordResetEmail({ dispatch }) {
  dispatch({
    type: ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  });
}

export function actionAccountCheckIfEmailExists({ dispatch }) {
  dispatch({
    type: ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  });
}

export function actionUpdateComponentLoginForm({ dispatch, key, value }) {
  dispatch({
    type: FORM_STATE_UPDATE,
    payload: { key: `components.${LOGIN_FORM_KEY}.${key}`, value },
  });
}

export function actionAccountCreateUser({ dispatch }) {
  dispatch({ type: ACCOUNT_CREATE_NEW_USER });
}

export function actionAccountLoggedIn({ dispatch, user }) {
  dispatch({ type: ACCOUNT_LOGGED_IN, payload: { user } });
}
