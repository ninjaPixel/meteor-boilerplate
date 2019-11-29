/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Loading/Loading';
import Legal from '../Legal/Legal';
import ModalCard from '../ModalCard/ModalCard';
import { buttonStyle, linkStyle, stackStyle } from '../../styles/common';
import LinkButton from '../LinkButton/LinkButton';
import newRoutes from '../../../imports/modules/routes';

const minPasswordLength = 5;

const propTypes = {
  authenticationErrorMessage: PropTypes.string,
  disableAutoFocus: PropTypes.bool,
  disableEmail: PropTypes.bool,
  email: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  existingEmail: PropTypes.bool,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loggingIn: PropTypes.bool,
  loginButtonText: PropTypes.string,
  loginRegisterButtonText: PropTypes.string,
  newAccountCreated: PropTypes.bool,
  onClosePasswordResetModal: PropTypes.func.isRequired,
  onEmailBlurOrPasswordFocus: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmitLoginForm: PropTypes.func.isRequired,
  onSubmitPasswordReset: PropTypes.func.isRequired,
  onSubmitRegistration: PropTypes.func.isRequired,
  onToggleLegalModal: PropTypes.func.isRequired,
  onToggleTermsAccepted: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  registerButtonText: PropTypes.string,
  showLegalModal: PropTypes.string.bool,
  showPasswordResetModal: PropTypes.bool,
  showProfileFields: PropTypes.bool.isRequired,
  termsAccepted: PropTypes.bool.isRequired,
  user: PropTypes.object,
};
const defaultProps = {
  user: null,
  authenticationErrorMessage: null,
  disableAutoFocus: false,
  disableEmail: false,
  loading: false,
  loggingIn: false,
  loginButtonText: 'Login',
  loginRegisterButtonText: 'Login / Register',
  newAccountCreated: false,
  errorMessage: null,
  existingEmail: false,
  registerButtonText: 'Register',
  showLegalModal: false,
  showPasswordResetModal: false,
};

const useStyles = makeStyles(theme => ({
  root: {
    ...stackStyle(theme, 5),
    width: theme.spacing(13),
    maxWidth: '100%',
    // border: '1px dashed',
  },
  legal: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 0),
    alignSelf: 'flex-start',
  },
  form: {
    ...stackStyle(theme),
    width: '100%',
    padding: 0,
    minHeight: '100%',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
  },
  inputCaptionContainer: {
    /*
      This height rule serves two purposes:
      1 - Make sure that the Register btn doesn't jump up/down when there is caption below the password field
      2 - It keeps the Register button at the same height as the 'Complete Registration' button on the second form
     */
    minHeight: theme.spacing(5) + theme.spacing(1),
  },
  link: linkStyle(theme),
  button: buttonStyle(theme),
  forgotPasswordLink: {
    color: theme.custom.link.color,
    cursor: 'pointer',
    alignSelf: 'center',
  },
  loggedInButtons: {
    ...stackStyle(theme),
    alignItems: 'center',
  },
  tosCheckbox: {
    fontSize: theme.typography.caption.fontSize,
  },
  welcomeOnBoardText: {
    ...theme.typography.h4,
  },
}));

const LoginForm = props => {
  const {
    authenticationErrorMessage,
    disableAutoFocus,
    disableEmail,
    email,
    errorMessage,
    existingEmail,
    first,
    last,
    loading,
    location,
    loggingIn,
    loginButtonText,
    loginRegisterButtonText,
    newAccountCreated,
    onClosePasswordResetModal,
    onEmailBlurOrPasswordFocus,
    onForgotPasswordClick,
    onInputChange,
    onSubmitLoginForm,
    onSubmitPasswordReset,
    onSubmitRegistration,
    onToggleLegalModal,
    onToggleTermsAccepted,
    password,
    registerButtonText,
    showLegalModal,
    showPasswordResetModal,
    showProfileFields,
    termsAccepted,
    user,
  } = props;
  const classes = useStyles();

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
    let buttonText = loginRegisterButtonText;
    if (existingEmail) {
      buttonText = loginButtonText;
    } else if (disableEmail) {
      buttonText = registerButtonText;
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitLoginForm(e);
        }}
        className={classes.form}
      >
        <TextField
          inputProps={{ 'data-e2e': 'login-form-email-input' }}
          label="Email"
          autoFocus={!disableAutoFocus}
          type="email"
          required
          value={email}
          onChange={onInputChange('email')}
          onBlur={onEmailBlurOrPasswordFocus}
          margin="normal"
          className={classes.input}
          autoComplete="email"
          disabled={disableEmail}
          variant="outlined"
        />
        <TextField
          inputProps={{ 'data-e2e': 'login-form-password-input' }}
          label="Password"
          required
          type="password"
          value={password}
          onChange={onInputChange('password')}
          margin="normal"
          className={classes.input}
          variant="outlined"
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

  function renderProfileForm() {
    return (
      <>
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();
            onSubmitRegistration(e);
          }}
        >
          <TextField
            inputProps={{ 'data-e2e': 'login-form-first-name-input' }}
            key="autofocusmonkeypatch"
            label="First name"
            autoFocus
            required
            value={first}
            onChange={onInputChange('first')}
            margin="normal"
            className={classes.input}
            autoComplete="given-name"
            variant="outlined"
          />
          <TextField
            inputProps={{ 'data-e2e': 'login-form-last-name-input' }}
            label="Last name"
            required
            value={last}
            onChange={onInputChange('last')}
            margin="normal"
            className={classes.input}
            autoComplete="family-name"
            variant="outlined"
          />
          <div className={classes.legal}>
            <FormControlLabel
              classes={{ label: classes.tosCheckbox }}
              control={
                <Checkbox
                  data-e2e="login-form-tos-checkbox"
                  checked={termsAccepted}
                  onChange={onToggleTermsAccepted}
                  value="terms-accepted"
                />
              }
              label="I accept the terms & conditions, and the privacy policy"
            />
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
        </form>
        <Typography variant="caption">
          Read the{' '}
          <a role="button" data-e2e="login-form-tos-link" className={classes.link} onClick={onToggleLegalModal}>
            terms & conditions, and our privacy policy, here
          </a>
          .
        </Typography>
        <ModalCard
          okText="Close"
          show={showLegalModal}
          hideCancelButton
          onClose={onToggleLegalModal}
          onRequestOk={onToggleLegalModal}
        >
          <Legal />
        </ModalCard>
      </>
    );
  }

  function renderResetPasswordModal() {
    return (
      <ModalCard
        show={showPasswordResetModal}
        okText="Reset password"
        onClose={onClosePasswordResetModal}
        onRequestOk={onSubmitPasswordReset}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmitPasswordReset();
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
            onChange={onInputChange('email')}
            onBlur={onEmailBlurOrPasswordFocus}
            margin="normal"
            className={classes.input}
            autoComplete="email"
          />
        </form>
      </ModalCard>
    );
  }

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
        <div>
          <Typography className={classes.welcomeOnBoardText} data-e2e="new-account-welcome-message">
            We've created your account.
          </Typography>
          <Typography className={classes.welcomeOnBoardText}>
            Welcome on board!{' '}
            <span role="img" aria-label="ship">
              🚢
            </span>
          </Typography>
        </div>
      );
    }
    if (showProfileFields) {
      return renderProfileForm();
    }
    return (
      <>
        {renderLoginRegisterForm()}
        <Typography onClick={onForgotPasswordClick} className={classes.forgotPasswordLink}>
          Forgot password?
        </Typography>
        {renderResetPasswordModal()}
      </>
    );
  };

  return <div className={classes.root}>{child()}</div>;
};

LoginForm.propTypes = propTypes;

LoginForm.defaultProps = defaultProps;

export default LoginForm;
