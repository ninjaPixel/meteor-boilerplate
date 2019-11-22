/* eslint react/jsx-one-expression-per-line:0 */

import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { commonProps } from './props';
import {
  actionAccountCheckIfEmailExists,
  actionAccountCreateUser,
  actionAccountLogIn,
  actionAccountSendPasswordResetEmail,
  actionSnackAdd,
  actionUpdateComponentLoginForm,
} from '../../../controller/actions';
import { useStoreComponentLoginForm } from '../../hooks/reduxSelectors';
import LoginForm from './LoginForm';

const propTypes = {
  ...commonProps.propTypes,
  location: PropTypes.object.isRequired,
};
const LoginFormWiredUp = props => {
  const { user, location, disableEmail, disableAutoFocus, loginButtonText, registerButtonText } = props;

  const dispatch = useDispatch();
  const [authenticationErrorMessage] = useState('');
  const state = useStoreComponentLoginForm();
  const {
    email,
    password,
    first,
    last,
    errorMessage,
    existingEmail,
    loading,
    loggingIn,
    newAccountCreated,
    showLegalModal,
    showPasswordResetModal,
    showProfileFields,
    termsAccepted,
  } = state;

  function handleCompleteRegistrationSubmit(event) {
    event.preventDefault();
    actionAccountCreateUser({ dispatch });
  }

  function handleChange(name) {
    return event => {
      const { value } = event.target;

      actionUpdateComponentLoginForm({
        dispatch,
        key: name,
        value,
      });
    };
  }

  function onEmailBlurOrPasswordFocus(event) {
    event.preventDefault();
    actionAccountCheckIfEmailExists({ dispatch });
  }

  function sendPasswordReset() {
    actionAccountSendPasswordResetEmail({ dispatch });
  }

  function onSubmitLoginForm(event) {
    event.preventDefault();
    if (_.isEmpty(password) || loggingIn) {
      // do nothing
    } else {
      actionAccountLogIn({ dispatch });
    }
  }

  function toggleLegalModal() {
    actionUpdateComponentLoginForm({ dispatch, key: 'showLegalModal', value: !showLegalModal });
  }

  return (
    <LoginForm
      authenticationErrorMessage={authenticationErrorMessage}
      disableAutoFocus={disableAutoFocus}
      user={user}
      email={email}
      password={password}
      first={first}
      last={last}
      errorMessage={errorMessage}
      existingEmail={existingEmail}
      loading={loading}
      loggingIn={loggingIn}
      newAccountCreated={newAccountCreated}
      showLegalModal={showLegalModal}
      showPasswordResetModal={showPasswordResetModal}
      showProfileFields={showProfileFields}
      termsAccepted={termsAccepted}
      registerButtonText={registerButtonText}
      loginButtonText={loginButtonText}
      onEmailBlurOrPasswordFocus={onEmailBlurOrPasswordFocus}
      disableEmail={disableEmail}
      onInputChange={handleChange}
      location={location}
      onToggleLegalModal={toggleLegalModal}
      onSubmitRegistration={handleCompleteRegistrationSubmit}
      onSubmitLoginForm={onSubmitLoginForm}
      onSubmitPasswordReset={() => {
        if (email) {
          sendPasswordReset();
        } else {
          actionSnackAdd({ dispatch, message: 'Please enter an email address' });
        }
      }}
      onClosePasswordResetModal={() => {
        actionUpdateComponentLoginForm({
          dispatch,
          key: 'showPasswordResetModal',
          value: false,
        });
      }}
      onForgotPasswordClick={() => {
        actionUpdateComponentLoginForm({
          dispatch,
          key: 'showPasswordResetModal',
          value: true,
        });
      }}
      onToggleTermsAccepted={() => {
        actionUpdateComponentLoginForm({ dispatch, key: 'termsAccepted', value: !termsAccepted });
      }}
    />
  );
};

LoginFormWiredUp.propTypes = propTypes;

export default withRouter(LoginFormWiredUp);
