import { eventChannel, END } from 'redux-saga';
import { call, put, takeEvery, take, takeLatest, select } from 'redux-saga/effects';
import {
  ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
  ACCOUNT_LOGGED_IN,
  FORM_STATE_UPDATE,
} from '../actionTypes';
import { LOGIN_FORM_KEY } from '../reducers/constants';
import { dispatchErrorSnack } from './helpers';

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
function meteorLoginWithPassword({ email, password }) {
  return eventChannel(emitter => {
    window.Meteor.loginWithPassword(email, password, (error, success) => {
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
    const key = `components.${LOGIN_FORM_KEY}.existingEmail`;
    const type = FORM_STATE_UPDATE;
    if (email) {
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
                type,
                payload: {
                  key,
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
          type,
          payload: {
            key,
            value: exists,
          },
        });
      }
    }
  } catch (e) {
    yield dispatchErrorSnack(e);
  }
}

function* loginWithPassword() {
  yield put({
    type: FORM_STATE_UPDATE,
    payload: {
      key: `components.${LOGIN_FORM_KEY}.loggingIn`,
      value: true,
    },
  });
  yield checkIfEmailExists();
  const loginFormState = yield select(getState);
  const { email, password, existingEmail } = loginFormState;

  try {
    if (existingEmail) {
      if (window.Meteor) {
        // do meteor stuff
        const chan = yield call(meteorLoginWithPassword, { email, password });
        try {
          while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            const { success, error } = yield take(chan);
            if (error) {
              yield dispatchErrorSnack(error);
            } else {
              // the subscription to the user collection will update the store
            }
          }
        } finally {
          // console.log('checkIfEmailExists terminated');
        }
      } else {
        // mock the meteor call
        const user = {
          _id: 'test_user_id',
          email,
          profile: {
            name: {
              first: 'Testy',
              last: 'McTester',
            },
            phone: '',
          },
        };
        yield put({
          type: ACCOUNT_LOGGED_IN,
          payload: {
            user,
          },
        });
      }
    } else {
      yield updateFormState('showProfileFields', true);
      console.log('showProfileFields: ', true);
    }
  } catch (exception) {
    yield dispatchErrorSnack(exception);
  } finally {
    yield put({
      type: FORM_STATE_UPDATE,
      payload: {
        key: `components.${LOGIN_FORM_KEY}.loggingIn`,
        value: false,
      },
    });
  }
}

function* loginFormSagas() {
  yield takeLatest(ACCOUNT_CHECK_IF_EMAIL_EXISTS, checkIfEmailExists);
  yield takeLatest(ACCOUNT_LOG_IN_WITH_PASSWORD, loginWithPassword);
}

export default loginFormSagas;
