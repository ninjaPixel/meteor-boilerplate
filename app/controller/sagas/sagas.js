import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { ACCOUNT_CHECK_IF_EMAIL_EXISTS, FORM_STATE_UPDATE } from '../actionTypes';
import { LOGIN_FORM_KEY } from '../reducers/constants';

const getState = state => state.components[LOGIN_FORM_KEY];

function fetchEmailExistsApi(email) {
  return window.Meteor.call();
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* checkIfEmailExists(action) {
  try {
    const loginFormState = yield select(getState);
    const { email } = loginFormState;
    if (window.Meteor) {
      // const result = window.Meteor.call('utility.checkIfEmailAddressExists', email);
      // console.log('result: ', result);
      // window.Meteor.call('utility.checkIfEmailAddressExists', email, (err, exists) => {
      //   if (err) {
      //     // todo
      //   } else {
      //
      //           yield put({
      //   type: FORM_STATE_UPDATE,
      //   payload: {
      //     key: `components.${LOGIN_FORM_KEY}.existingEmail`,
      //     value: exists,
      //   },
      // });
      //
      //
      //   }
      // });
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
