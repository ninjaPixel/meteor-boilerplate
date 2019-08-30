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
  actionAccountSendPasswordResetEmail,
  actionSnackAdd,
} from '../../../controller/actions';
import { useStoreLoginForm } from '../../hooks/reduxSelectors';

const propTypes = {
  ...commonProps.propTypes,
  onCreateUser: PropTypes.func.isRequired,
  onCheckIfEmailExists: PropTypes.func.isRequired,
  onSendPasswordResetEmail: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
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
}));
const LoginFormComponent = props => {
  const { user, location, disableEmail, disableAutoFocus, loginButtonText, registerButtonText } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [authenticationErrorMessage, setAuthenticationErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    first: '',
    last: '',
    phone: '',
  });
  const { email, password, first, last, phone } = formValues;

  const [errorMessage, setErrorMessage] = useState('');
  // const state = useStoreLoginForm();
  // const { existingEmail } = state;
  const [existingEmail, setExistingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [newAccountCreated, setNewAccountCreated] = useState(false);

  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showProfileFields, setShowProfileFields] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  function handleCompleteRegistrationSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const user = {
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

    const createUserCallback = error => {
      setLoading(false);
      if (error) {
        console.log(error);
        setErrorMessage(error.reason);
      } else {
        setNewAccountCreated(true);
      }
    };
    props.onCreateUser(user, createUserCallback);
  }

  function handleChange(name) {
    return event => {
      const { value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  }

  function onEmailBlurOrPasswordFocus(event) {
    event.preventDefault();
    actionAccountCheckIfEmailExists({
      dispatch,
      email,
      callback: (error, value) => {
        setExistingEmail(value);
      },
    });
  }

  function sendPasswordReset() {
    setShowPasswordResetModal(false);
    actionAccountSendPasswordResetEmail({ dispatch, email });
  }
  function handleLoginRequest() {
    setAuthenticationErrorMessage('');
    setLoggingIn(true);

    const loginCallback = (error, success) => {
      setLoggingIn(false);
      if (error) {
        setAuthenticationErrorMessage(error.reason);
      } else {
        /*
        execute a login callback.
        for example, if the user just accepted a staff invitation, assign this now.
        */
        props.loginCallback();
      }
    };
    // Meteor.loginWithPassword(email, password, loginCallback);
    props.onLogin(email, password, loginCallback);
  }

  function onSubmitLoginForm(event) {
    event.preventDefault();
    if (_.isEmpty(password) || loggingIn) {
      // do nothing
    } else {
      const checkEMailCallback = (error, success) => {
        if (error || success !== true) {
          if (error) {
            console.log('utility.checkIfEmailAddressExists.error: ', error);
          }
        }
        if (success === true) {
          handleLoginRequest();
        } else {
          setShowProfileFields(true);
        }
      };

      // do a final check to find out if this email address is recognized
      // autofilling of form means that an real address may be missed
      // Meteor.call('utility.checkIfEmailAddressExists', email, checkEMailCallback);
      actionAccountCheckIfEmailExists({ dispatch, email, callback: checkEMailCallback });
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
    setShowLegalModal(!showLegalModal);
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
            control={
              <Checkbox
                data-e2e="login-form-tos-checkbox"
                checked={termsAccepted}
                onChange={setTermsAccepted(!termsAccepted)}
                value="terms-accepted"
              />
            }
            label="I accept the terms & conditions and the privacy policy"
          />
          <Typography variant="caption">
            Read the{' '}
            <a data-e2e="login-form-tos-link" className={classes.link} onClick={toggleLegalModal}>
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
        <ModalCard show={showLegalModal} hideCancelButton onClose={toggleLegalModal} onRequestOk={toggleLegalModal}>
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
          setShowPasswordResetModal(false);
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
          onSubmit={() => {
            sendPasswordReset();
            setShowPasswordResetModal(false);
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
            <Grid item xs={12} align="center">
              <Typography>Default screen.</Typography>
            </Grid>
          </Grid>
        );
      }
      if (newAccountCreated) {
        return (
          <Typography variant="h6" data-e2e="new-account-welcome-message">
            We've created your account. Welcome on board! 🚢
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
              setShowPasswordResetModal(true);
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
