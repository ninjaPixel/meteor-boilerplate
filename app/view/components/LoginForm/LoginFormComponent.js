/* eslint react/jsx-one-expression-per-line:0 */

import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Loading/Loading';
import loginFormStyles from './styles';
import Legal from '../Legal/Legal';
import ModalCard from '../ModalCard/ModalCard';
import { buttonStyle, linkStyle, paperStyle } from '../../styles/common';
import ResponsivePaper from '../ResponsivePaper/ResponsivePaper';
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
import LinkButton from '../LinkButton/LinkButton';
import newRoutes from '../../../imports/modules/routes';

const propTypes = {
  ...commonProps.propTypes,
  location: PropTypes.object.isRequired,
};
const minPasswordLength = 5;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // flex: 1,
    width: '100%',
  },
  legal: {
    margin: theme.spacing(2, 0),
    alignSelf: 'flex-start',
  },
  ...loginFormStyles(theme),
  link: linkStyle(theme),
  paper: paperStyle(theme),
  button: buttonStyle(theme),
  permanentPasswordResetLink: {
    color: theme.palette.primary.light,
    marginTop: theme.spacing(7),
    cursor: 'pointer',
  },
  loggedInButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  tosCheckbox: {
    fontSize: theme.typography.subtitle2.fontSize,
  },
}));
const LoginFormComponent = props => {
  const { user, location, disableEmail, disableAutoFocus, loginButtonText, registerButtonText } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [authenticationErrorMessage] = useState('');
  const state = useStoreComponentLoginForm();
  const {
    email,
    password,
    first,
    last,
    // phone,
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

  function renderPasswordHelperText() {
    if (authenticationErrorMessage) {
      return (
        <div>
          <Typography variant="caption" color="error">
            {authenticationErrorMessage}
          </Typography>
        </div>
      );
    }
    const needMoreCharactersInPassword = password.length && password.length < minPasswordLength;

    if (!existingEmail && needMoreCharactersInPassword) {
      return (
        <Typography variant="caption">{`Please use at least ${minPasswordLength} characters in your password.`}</Typography>
      );
    }
    return null;
  }

  function renderLoginRegisterForm() {
    let buttonText = 'Login / Register';
    if (existingEmail) {
      buttonText = loginButtonText;
    } else if (disableEmail) {
      buttonText = registerButtonText;
    }

    return (
      <form onSubmit={onSubmitLoginForm} className={classes.form}>
        <TextField
          inputProps={{ 'data-e2e': 'login-form-email-input' }}
          label="Email"
          autoFocus={!disableAutoFocus}
          type="email"
          required
          value={email}
          onChange={handleChange('email')}
          onBlur={onEmailBlurOrPasswordFocus}
          margin="normal"
          className={classes.input}
          autoComplete="email"
          disabled={disableEmail}
        />
        <TextField
          inputProps={{ 'data-e2e': 'login-form-password-input' }}
          label="Password"
          required
          type="password"
          value={password}
          onChange={handleChange('password')}
          margin="normal"
          className={classes.input}
        />
        <div className={classes.inputCaptionContainer}>{renderPasswordHelperText()}</div>
        <Button
          data-e2e="login-form-submit-button"
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
          disabled={loggingIn}
        >
          {buttonText}
        </Button>
      </form>
    );
  }

  function toggleLegalModal() {
    actionUpdateComponentLoginForm({ dispatch, key: 'showLegalModal', value: !showLegalModal });
  }

  function renderProfileForm() {
    return (
      <form className={classes.form} onSubmit={handleCompleteRegistrationSubmit}>
        <TextField
          inputProps={{ 'data-e2e': 'login-form-first-name-input' }}
          key="autofocusmonkeypatch"
          label="First name"
          autoFocus
          required
          value={first}
          onChange={handleChange('first')}
          margin="normal"
          className={classes.input}
          autoComplete="given-name"
        />
        <TextField
          inputProps={{ 'data-e2e': 'login-form-last-name-input' }}
          label="Last name"
          required
          value={last}
          onChange={handleChange('last')}
          margin="normal"
          className={classes.input}
          autoComplete="family-name"
        />
        <div className={classes.legal}>
          <FormControlLabel
            classes={{ label: classes.tosCheckbox }}
            control={
              <Checkbox
                data-e2e="login-form-tos-checkbox"
                checked={termsAccepted}
                onChange={() => {
                  actionUpdateComponentLoginForm({ dispatch, key: 'termsAccepted', value: !termsAccepted });
                }}
                value="terms-accepted"
              />
            }
            label="I accept the terms & conditions and the privacy policy"
          />
          <Typography variant="caption">
            Read the{' '}
            <a role="button" data-e2e="login-form-tos-link" className={classes.link} onClick={toggleLegalModal}>
              terms & conditions, and our privacy policy here
            </a>
            .
          </Typography>
        </div>
        <Button
          data-e2e="login-form-submit-button"
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={!termsAccepted}
        >
          Complete registration
        </Button>
        <ModalCard
          okText="Close"
          show={showLegalModal}
          hideCancelButton
          onClose={toggleLegalModal}
          onRequestOk={toggleLegalModal}
        >
          <Legal />
        </ModalCard>
      </form>
    );
  }

  function renderResetPasswordModal() {
    return (
      <ModalCard
        show={showPasswordResetModal}
        okText="Reset password"
        onClose={() => {
          actionUpdateComponentLoginForm({
            dispatch,
            key: 'showPasswordResetModal',
            value: false,
          });
        }}
        onRequestOk={() => {
          if (email) {
            sendPasswordReset();
          } else {
            actionSnackAdd({ dispatch, message: 'Please enter an email address' });
          }
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            sendPasswordReset();
          }}
          className={classes.form}
        >
          <Typography>Forgot your password? It happens! enter your email and we'll send you a reset link.</Typography>
          <TextField
            inputProps={{ 'data-e2e': 'login-form-password-reset-input' }}
            label="Email"
            autoFocus
            type="email"
            required
            value={email}
            onChange={handleChange('email')}
            onBlur={onEmailBlurOrPasswordFocus}
            margin="normal"
            className={classes.input}
            autoComplete="email"
          />
        </form>
      </ModalCard>
    );
  }

  function render() {
    const child = () => {
      if (loading) {
        return <Loading />;
      }
      if (errorMessage) {
        return (
          <Typography color="error" variant="body1">
            {errorMessage}
          </Typography>
        );
      }
      if (user && user._id) {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" gutterBottom>
                Hey, {user.profile.name.first}! You're all logged in!
              </Typography>
              {location.pathname.includes('/login') ? null : <Loading linear text="Loading page..." />}
            </Grid>
            <div className={classes.loggedInButtons}>
              <LinkButton color="primary" to="/">
                Home
              </LinkButton>
              <LinkButton color="primary" to={newRoutes.account.getPath(user._id)}>
                My account
              </LinkButton>
            </div>
          </Grid>
        );
      }
      if (newAccountCreated) {
        return (
          <Typography variant="h6" data-e2e="new-account-welcome-message">
            We've created your account. Welcome on board!{' '}
            <span role="img" aria-label="ship">
              🚢
            </span>
          </Typography>
        );
      }
      if (showProfileFields) {
        return <ResponsivePaper className={classes.paper}>{renderProfileForm()}</ResponsivePaper>;
      }
      return (
        <>
          <ResponsivePaper>{renderLoginRegisterForm()}</ResponsivePaper>
          <Typography
            onClick={() => {
              actionUpdateComponentLoginForm({
                dispatch,
                key: 'showPasswordResetModal',
                value: true,
              });
            }}
            className={classes.permanentPasswordResetLink}
          >
            Forgot password?
          </Typography>
          {renderResetPasswordModal()}
        </>
      );
    };

    return <div className={classes.root}>{child()}</div>;
  }

  return render();
};

LoginFormComponent.propTypes = propTypes;

export default withRouter(LoginFormComponent);
