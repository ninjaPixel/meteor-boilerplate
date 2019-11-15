import { eventChannel, END } from 'redux-saga';
import { call, put, takeEvery, take } from 'redux-saga/effects';
import { ACCOUNT_LOG_OUT, ACCOUNT_LOGGED_OUT } from '../actionTypes';
import { dispatchErrorSnack } from './helpers';

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
      const channel = yield call(meteorLogout);
      try {
        while (true) {
          // take(END) will cause the saga to terminate by jumping to the finally block
          const { error } = yield take(channel);
          if (error) {
            yield dispatchErrorSnack(error);
          } else {
            yield put({ type: ACCOUNT_LOGGED_OUT });
          }
        }
      } catch (ex) {
        yield dispatchErrorSnack(ex);
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
