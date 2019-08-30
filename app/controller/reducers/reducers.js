import _ from 'lodash';
import produce from 'immer';

import {
  NOTIFICATION_ADD,
  SNACK_ADD,
  SNACK_CLOSE,
  NOTIFICATIONS_READ,
  ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  FORM_STATE_UPDATE,
  ACCOUNT_CREATE_NEW_USER,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
} from '../actionTypes';
import {
  initialStateLoginFormComponent,
  loginFormCheckIfEmailExists,
  loginFormHandleLogin,
  loginFormHandleRegistration,
} from './loginForm';
import { LOGIN_FORM_KEY } from './constants';

const initialState = {
  snacks: [],
  notifications: [],
  user: {},
  components: {
    [LOGIN_FORM_KEY]: initialStateLoginFormComponent,
  },
};

function updateFormState({ key, value, draft }) {
  _.set(draft, key, value);
}

/*
  This is the reducer used in 'lite' mode.
  It does not connect to the Meteor server.
 */
export function reducerLite(state = initialState, action) {
  /* eslint no-param-reassign:0 default-case:0 */
  return produce(state, draft => {
    switch (action.type) {
      case FORM_STATE_UPDATE:
        updateFormState({ ...action.payload, draft });
        break;
      case ACCOUNT_LOG_IN_WITH_PASSWORD:
        loginFormHandleLogin({ state, draft });
        break;
      case ACCOUNT_CHECK_IF_EMAIL_EXISTS:
        loginFormCheckIfEmailExists({ state, draft });
        break;
      case ACCOUNT_SEND_PASSWORD_RESET_EMAIL:
        draft.snacks = [
          {
            message: 'Email not sent as we are in lite mode',
            time: Date.now(),
            variant: 'info',
            open: true,
            _id: Date.now(),
          },
          ...draft.snacks,
        ];
        draft.components[LOGIN_FORM_KEY].showPasswordResetModal = false;
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
