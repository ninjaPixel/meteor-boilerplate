import { eventChannel, END } from 'redux-saga';
import { call, put, takeEvery, take, takeLatest, select } from 'redux-saga/effects';
import { ACCOUNT_CHECK_IF_EMAIL_EXISTS, FORM_STATE_UPDATE } from '../actionTypes';
import { LOGIN_FORM_KEY } from '../reducers/constants';
import { dispatchErrorSnack } from './helpers';

const getState = state => state.components[LOGIN_FORM_KEY];

function meteorFetchEmailExists(email) {
  return eventChannel(emitter => {
    window.Meteor.call('utility.checkIfEmailAddressExists', email, (error, success) => {
      if (error) {
        emitter({ error });
      } else {
        emitter({ success });
      }

      emitter(END);
    });

    // The subscriber must return an unsubscribe function
    return () => {};
  });
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* checkIfEmailExists() {
  try {
    const loginFormState = yield select(getState);
    const { email } = loginFormState;
    if (window.Meteor) {
      const chan = yield call(meteorFetchEmailExists, email);
      try {
        while (true) {
          // take(END) will cause the saga to terminate by jumping to the finally block
          const { success, error } = yield take(chan);
          if (error) {
            yield dispatchErrorSnack(error);
          } else {
            yield put({
              type: FORM_STATE_UPDATE,
              payload: {
                key: `components.${LOGIN_FORM_KEY}.existingEmail`,
                value: success,
              },
            });
          }
        }
      } finally {
        // console.log('checkIfEmailExists terminated');
      }
    } else {
      let exists = false;
      if (email === 'test@test.com') {
        exists = true;
      }
      yield put({
        type: FORM_STATE_UPDATE,
        payload: {
          key: `components.${LOGIN_FORM_KEY}.existingEmail`,
          value: exists,
        },
      });
    }
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest(ACCOUNT_CHECK_IF_EMAIL_EXISTS, checkIfEmailExists);
}

export default mySaga;
