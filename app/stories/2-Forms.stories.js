import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import LoginForm from '../view/components/LoginForm/LoginForm';

export default {
  title: 'Forms',
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
  disableAutoFocus: true,
  errorMessage: '',
  first: 'Tim',
  last: 'Cook',
  loading: false,
  location: { pathname: '/blah' },
  loggingIn: false,
  loginButtonText: 'Login',
  newAccountCreated: false,
  registerButtonText: 'Register',
  showLegalModal: false,
  showPasswordResetModal: false,
  termsAccepted: false,
};

export const loginForm = () => (
  <LoginForm
    authenticationErrorMessage={text('authenticationErrorMessage', '')}
    disableEmail={boolean('disableEmail', false)}
    email={text('email', 'tim@apple.com')}
    existingEmail={boolean('existingEmail', false)}
    password={text('password', '123')}
    showProfileFields={boolean('showProfileFields', false)}
    {...props}
    {...eventsFromNames}
  />
);
