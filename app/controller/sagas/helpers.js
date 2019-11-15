import { put } from 'redux-saga/effects';
import { createSnackDispatch } from '../actions';
import { SNACKBAR_TYPES } from '../../view/components/Snackbar/constants';

export function* dispatchErrorSnack(err) {
  const { error, message, reason } = err;
  const displayMessage = reason || error || message;
  yield put(createSnackDispatch({ variant: SNACKBAR_TYPES.error, message: displayMessage }));
}

export function* dispatchSnack({ variant = SNACKBAR_TYPES.info, message }) {
  yield put(createSnackDispatch({ variant, message }));
}
