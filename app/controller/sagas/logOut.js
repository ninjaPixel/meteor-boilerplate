import { eventChannel, END } from 'redux-saga';
import { call, put, takeEvery, take, takeLatest, select } from 'redux-saga/effects';
import {
  ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
  ACCOUNT_LOG_OUT,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_LOGGED_OUT,
  FORM_STATE_UPDATE,
} from '../actionTypes';
import { LOGIN_FORM_KEY } from '../reducers/constants';
import { dispatchErrorSnack } from './helpers';
import { Meteor } from 'meteor/meteor';

const getState = state => state.components[LOGIN_FORM_KEY];

function* updateFormState(key, value) {
  yield put({
    type: FORM_STATE_UPDATE,
    payload: {
      key: `components.${LOGIN_FORM_KEY}.${key}`,
      value,
    },
  });
}

function meteorLogout() {
  return eventChannel(emitter => {
    window.Meteor.logout(error => {
      if (error) {
        emitter({ error });
      } else {
        emitter({ success: true });
      }
      emitter(END);
    });

    // The subscriber must return an unsubscribe function
    return () => {};
  });
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logout() {
  try {
    if (window.Meteor) {
      const chan = yield call(meteorLogout);
      try {
        while (true) {
          // take(END) will cause the saga to terminate by jumping to the finally block
          const { success, error } = yield take(chan);
          if (error) {
            yield dispatchErrorSnack(error);
          } else {
            yield put({ type: ACCOUNT_LOGGED_OUT });
          }
        }
      } finally {
        // console.log('checkIfEmailExists terminated');
      }
    } else {
      yield put({ type: ACCOUNT_LOGGED_OUT });
    }
  } catch (e) {
    yield dispatchErrorSnack(e);
  }
}

function* logoutSagas() {
  yield takeEvery(ACCOUNT_LOG_OUT, logout);
}

export default logoutSagas;
