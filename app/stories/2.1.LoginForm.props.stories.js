import React from 'react';
import { actions } from '@storybook/addon-actions';
import ProofSheet from './ProofSheet';
import LoginForm from '../view/components/LoginForm/LoginForm';

export default {
  title: 'Login form [contacts]',
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

export const ContactSheetOne = () => (
  <>
    <LoginForm {...props} {...eventsFromNames} email="existing@email.com" password="123dfsdfsa" existingEmail />
    <LoginForm {...props} {...eventsFromNames} email="disabled@email.com" password="123dfsdfsa" disableEmail />
    <ProofSheet
      choices={{
        password: ['', 'aaa', 'a long enough password'],
        email: ['', 'blah', 'blah@blah.com'],
      }}
      component={LoginForm}
      fixedProps={{ ...props, ...eventsFromNames, email: 'tim@apple.com' }}
    />
  </>
);

export const ContactSheetTwo = () => {
  const propsTwo = {
    ...props,
    showProfileFields: true,
  };
  return (
    <>
      <LoginForm {...propsTwo} {...eventsFromNames} email="existing@email.com" password="123dfsdfsa" />
      <LoginForm {...propsTwo} {...eventsFromNames} termsAccepted />
    </>
  );
};
