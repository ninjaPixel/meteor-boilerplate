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

export function loginFormCheckIfEmailExists({ state, draft }) {
  const { draftState, formState } = getStates({ state, draft });
  const { email } = formState;
  let exists = false;

  if (email) {
    // todo Call Meteor
    if (email === 'test@test.com') {
      exists = true;
    }
  }
  draftState.existingEmail = exists;
}

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

export function loginFormHandleLogin({ state, draft }) {
  /*
    If this is an existing account, log them in.
    Else, ask for more details, so that we can create an account for them.
   */
  const { draftState, formState } = getStates({ state, draft });
  draftState.errorMessage = '';
  // do a final check to find out if this email address is recognized
  // autofilling of form means that an real address may be missed
  loginFormCheckIfEmailExists({ state, draft });
  if (draftState.existingEmail) {
    draftState.showProfileFields = false;
    draftState.loggingIn = true;
    const { email, password } = formState;

    // todo Call meteor
    // Meteor.call('utility.checkIfEmailAddressExists', email, checkEMailCallback);

    draft.user = {
      _id: '1234567',
      email,
      profile: {
        name: {
          first: 'Steve',
          last: 'Jobs',
        },
        phone: '',
      },
    };

    draftState.loggingIn = false;
  } else {
    draftState.showProfileFields = true;
  }
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
