import _ from 'lodash';
import produce from 'immer';

import {
  NOTIFICATION_ADD,
  SNACK_ADD,
  SNACK_CLOSE,
  NOTIFICATIONS_READ,
  ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  FORM_STATE_UPDATE,
  ACCOUNT_CREATE_NEW_USER,
  ACCOUNT_LOG_OUT,
  ACCOUNT_LOGGED_IN,
  USER_CHANGE_PUBLISHED,
  ACCOUNT_LOGGED_OUT,
} from '../actionTypes';
import {
  initialStateLoginFormComponent,
  loginFormHandleRegistration,
  loginFormReset,
  loginFormSendPasswordResetEmail,
  loginFormUserLoggedIn,
} from './loginForm';
import { LOGIN_FORM_KEY } from './constants';

const initialState = {
  snacks: [],
  notifications: [],
  user: {},
  userReady: true,
  components: {
    [LOGIN_FORM_KEY]: initialStateLoginFormComponent,
  },
};

function updateFormState({ key, value, draft }) {
  _.set(draft, key, value);
}

export function reducer(state = initialState, action) {
  /* eslint no-param-reassign:0 default-case:0 */
  return produce(state, draft => {
    const { payload } = action;
    switch (action.type) {
      case FORM_STATE_UPDATE:
        updateFormState({ ...payload, draft });
        break;
      case USER_CHANGE_PUBLISHED:
        draft.user = payload.user;
        draft.userReady = payload.ready;
        break;
      case ACCOUNT_LOGGED_OUT:
        loginFormReset({ state, draft });
        draft.user = {};
        draft.userReady = true;
        break;
      case ACCOUNT_LOGGED_IN:
        loginFormUserLoggedIn({ state, draft, action });
        break;
      case ACCOUNT_SEND_PASSWORD_RESET_EMAIL:
        loginFormSendPasswordResetEmail({ state, draft });
        break;
      case ACCOUNT_CREATE_NEW_USER:
        loginFormHandleRegistration({ state, draft });
        break;
      case NOTIFICATION_ADD:
        draft.notifications = [action.payload, ...draft.notifications];
        break;
      case NOTIFICATIONS_READ:
        action.payload._ids.forEach(_id => {
          _.find(draft.notifications, { _id }).notificationSeen = true;
        });
        break;
      case SNACK_ADD:
        draft.snacks = [action.payload, ...draft.snacks];
        break;
      case SNACK_CLOSE:
        _.find(draft.snacks, { _id: action.payload._id }).open = false;
        break;
    }
  });
}
