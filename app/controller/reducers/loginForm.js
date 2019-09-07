/* eslint no-param-reassign:0 */

import { LOGIN_FORM_KEY } from './constants';

function getStates({ draft, state }) {
  const draftState = draft.components[LOGIN_FORM_KEY];
  const formState = state.components[LOGIN_FORM_KEY];
  return { draftState, formState };
}
export const initialStateLoginFormComponent = {
  email: '',
  password: '',
  first: '',
  last: '',
  phone: '',
  errorMessage: '',
  existingEmail: false,
  loading: false,
  loggingIn: false,
  newAccountCreated: false,
  showLegalModal: false,
  showPasswordResetModal: false,
  showProfileFields: false,
  termsAccepted: false,
};

function createUserObjectFromStore({ state, draft }) {
  const { formState } = getStates({ state, draft });

  const { email, password, first, last, phone } = formState;
  const user = {
    _id: 'some_user_id',
    email,
    password,
    profile: {
      name: {
        first,
        last,
      },
      phone,
    },
  };
  return user;
}

export function loginFormHandleRegistration({ state, draft }) {
  const { draftState } = getStates({ state, draft });

  draftState.loading = true;
  draftState.errorMessage = '';
  // todo Meteor create user
  const user = createUserObjectFromStore({ state, draft });
  draft.user = user;
  draftState.newAccountCreated = true;
  draftState.loading = false;
}

export function loginFormReset({ state, draft }) {
  const { draftState } = getStates({ state, draft });
  draftState.email = '';
  draftState.password = '';
  draftState.first = '';
  draftState.last = '';
  draftState.phone = '';
  draftState.errorMessage = '';
  draftState.existingEmail = false;
  draftState.loading = false;
  draftState.loggingIn = false;
  draftState.newAccountCreated = false;
  draftState.showLegalModal = false;
  draftState.showPasswordResetModal = false;
  draftState.showProfileFields = false;
  draftState.termsAccepted = false;
}

export function loginFormSendPasswordResetEmail({ state, draft }) {
  const { draftState, formState } = getStates({ state, draft });
  const { email } = formState;
  // todo create a more robust test
  if (!email.includes('@') || !email.includes('.')) {
    draft.snacks = [
      {
        message: 'Please enter your email address',
        time: Date.now(),
        variant: 'warning',
        open: true,
        _id: Date.now(),
      },
      ...draft.snacks,
    ];
  } else {
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
    draftState.showPasswordResetModal = false;
  }
}

export function loginFormUserLoggedIn({ state, draft, action }) {
  const { payload } = action;
  const { user } = payload;
  draft.user = user;

  // clean up the login form
  const { draftState } = getStates({ state, draft });
  draftState.password = '';
  draftState.loggingIn = false;
}
