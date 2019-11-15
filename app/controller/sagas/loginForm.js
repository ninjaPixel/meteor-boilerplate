import { eventChannel, END } from 'redux-saga';
import { call, put, takeEvery, take, takeLatest, select } from 'redux-saga/effects';
import {
  ACCOUNT_CHECK_IF_EMAIL_EXISTS,
  ACCOUNT_LOG_IN_WITH_PASSWORD,
  ACCOUNT_LOGGED_IN,
  ACCOUNT_SEND_PASSWORD_RESET_EMAIL,
  FORM_STATE_UPDATE,
} from '../actionTypes';
import { LOGIN_FORM_KEY } from '../reducers/constants';
import { dispatchErrorSnack, dispatchSnack } from './helpers';

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

function* sendPasswordResetEmail() {
  const loginFormState = yield select(getState);
  const { email } = loginFormState;
  const { valid, message } = thisLooksLikeAValidEmail(email);
  if (!valid) {
    dispatchErrorSnack({ message });
  } else {
    if (window.Meteor) {
    } else {
      dispatchSnack({ message: 'Check your email for a link to reset your password' });
    }
  }
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

function thisLooksLikeAValidEmail(email) {
  if (!email.includes('@')) {
    return {
      valid: false,
      message: 'The email address does not contain an @.',
    };
  }
  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      valid: false,
      message: 'The email address contains multiple @s.',
    };
  }
  const domain = parts[1];
  if (!domain.contains('.')) {
    return {
      valid: false,
      message: 'The domain does not have a "."',
    };
  }
  return { valid: true };
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
        const channel = yield call(meteorLoginWithPassword, { email, password });
        try {
          while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            const { success, error } = yield take(channel);
            if (error) {
              yield dispatchErrorSnack(error);
            } else {
              /*
                 the subscription to the user collection will update the store
                 we don't need to do anything here
               */
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
  yield takeLatest(ACCOUNT_SEND_PASSWORD_RESET_EMAIL, sendPasswordResetEmail);
}

export default loginFormSagas;
