import { put } from 'redux-saga/effects';
import { createSnackDispatch } from '../actions';

export function* dispatchErrorSnack(err) {
  const { error, message, reason } = err;
  const displayMessage = reason || error || message;
  yield put(createSnackDispatch({ variant: 'error', message: displayMessage }));
}
