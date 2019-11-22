import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import ProofSheet from './ProofSheet';
import LoginForm from '../view/components/LoginForm/LoginForm';

export default {
  title: 'Login form',
  decorators: [withKnobs],
};

const eventsFromNames = actions(
  'onClosePasswordResetModal',
  'onEmailBlurOrPasswordFocus',
  'onForgotPasswordClick',
  'onInputChange',
  'onSubmitLoginForm',
  'onSubmitPasswordReset',
  'onSubmitRegistration',
  'onToggleLegalModal',
  'onToggleTermsAccepted',
);
const props = {
  authenticationErrorMessage: '',
  disableAutoFocus: true,
  disableEmail: false,
  email: '',
  errorMessage: '',
  existingEmail: false,
  first: 'Tim',
  last: 'Cook',
  loading: false,
  location: { pathname: '/blah' },
  loggingIn: false,
  loginButtonText: 'Login',
  newAccountCreated: false,
  password: '',
  registerButtonText: 'Register',
  showLegalModal: false,
  showProfileFields: false,
  showPasswordResetModal: false,
  termsAccepted: false,
};

export const loginForm = () => (
  <LoginForm
    {...props}
    {...eventsFromNames}
    authenticationErrorMessage={text('authenticationErrorMessage', '')}
    disableEmail={boolean('disableEmail', false)}
    email={text('email', 'tim@apple.com')}
    existingEmail={boolean('existingEmail', false)}
    password={text('password', '123')}
    showProfileFields={boolean('showProfileFields', false)}
  />
);
export const PasswordReset = () => (
  <LoginForm {...props} {...eventsFromNames} showPasswordResetModal email="forgetfull@acme.com" />
);

export const LegalModal = () => <LoginForm {...props} {...eventsFromNames} showLegalModal showProfileFields />;

export const Finished = () => <LoginForm {...props} {...eventsFromNames} newAccountCreated />;
