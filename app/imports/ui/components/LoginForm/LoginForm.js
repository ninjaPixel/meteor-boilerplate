import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Loading/Loading';
import snacks from '../../../modules/client/snacks';
import loginFormStyles from '../../styles/LoginForm';
import Legal from '../Legal/Legal';
import ModalCard from '../ModalCard/ModalCard';
import { buttonStyle, linkStyle, paperStyle } from '../../styles/common';
import ResponsivePaper from '../../components/ResponsivePaper/ResponsivePaper';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  legal: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2,
    alignSelf: 'flex-start',
  },
  ...loginFormStyles(theme),
  link: linkStyle(theme),
  paper: paperStyle(theme),
  button: buttonStyle(theme),
});

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: '',
      existingEmail: false,
      showProfileFields: false,
      first: '',
      last: '',
      phone: '',
      loading: false,
      loadingMessage: '',
      newAccountCreated: false,
      errorMessage: '',
      authenticationErrorMessage: '',
      loggingIn: false,
      termsAccepted: false,
      showLegalModal: false,
    };
    this.handleChange('email')({ target: { value: props.email } });

    this.handleCompleteRegistrationSubmit = this.handleCompleteRegistrationSubmit.bind(this);
    this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleLoginRequest = this.handleLoginRequest.bind(this);
    this.sendPasswordReset = this.sendPasswordReset.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.toggleLegalModal = this.toggleLegalModal.bind(this);
    this.minPasswordLength = 5;
  }

  handleCompleteRegistrationSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password, first, last, phone } = this.state;
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

    Accounts.createUser(user, (error) => {
      this.setState({ loading: false });
      if (error) {
        console.log(error);
        this.setState({ errorMessage: error.reason });
      } else {
        this.setState({ newAccountCreated: true });
      }
    });
  }

  handleChange(name) {
    return (event) => {
      const value = event.target.value;
      this.setState({
        [name]: value,
      });
    };
  }
  handleCheckboxChange(name, value) {
    return () => {
      this.setState({ [name]: value });
    };
  }

  onEmailBlur(event) {
    event.preventDefault();
    const value = this.state.email;
    // check if there is already an account associated with this email address.
    if (!value) {
      this.setState({ existingEmail: false });
    } else {
      Meteor.call('utility.checkIfEmailAddressExists', value, (error, success) => {
        if (error || success !== true) {
          if (error) {
            console.log('utility.checkIfEmailAddressExists.error: ', error);
          }
          this.setState({ existingEmail: false });
        }
        if (success === true) {
          this.setState({ existingEmail: true });
        }
      });
    }
  }

  sendPasswordReset() {
    const { email } = this.state;
    Meteor.call(
      'utility.sendPasswordResetEmail',
      { email, windowLocationOrigin: window.location.origin },
      (error, success) => {
        if (error) {
          snacks.set({ message: `Unable to send password reset email. ${error.reason}` });
        }
        if (success) {
          snacks.set({ message: `Password reset sent to ${email}` });
        }
      },
    );
  }

  onSubmitLoginForm(event) {
    event.preventDefault();
    const { password, loggingIn, email } = this.state;
    if (_.isEmpty(password) || loggingIn) {
      // do nothing
    } else {
      // do a final check to find out if this email address is recognized
      // autofilling of form means that an real address may be missed
      Meteor.call('utility.checkIfEmailAddressExists', email, (error, success) => {
        if (error || success !== true) {
          if (error) {
            console.log('utility.checkIfEmailAddressExists.error: ', error);
          }
        }
        if (success === true) {
          this.handleLoginRequest();
        } else {
          this.setState({ showProfileFields: true });
        }
      });
    }
  }

  handleLoginRequest() {
    this.setState({ authenticationErrorMessage: '', loggingIn: true });

    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (error, success) => {
      this.setState({ loggingIn: false });
      if (error) {
        this.setState({ authenticationErrorMessage: error.reason });
      } else {
        /*
        execute a login callback.
        for example, if the user just accepted a staff invitation, assign this now.
        */
        this.props.loginCallback();
      }
    });
  }

  renderLoginRegisterForm() {
    const { classes, disableEmail, disableAutoFocus, loginButtonText, registerButtonText } = this.props;
    const { password, email, existingEmail, loggingIn } = this.state;
    let buttonText = 'Login / Register';
    if (existingEmail) {
      buttonText = loginButtonText;
    } else if (disableEmail) {
      buttonText = registerButtonText;
    }

    return (
      <form onSubmit={this.onSubmitLoginForm} className={classes.form}>
        <TextField
          inputProps={{ 'data-e2e': 'login-form-email-input' }}
          label="Email"
          autoFocus={!disableAutoFocus}
          type="email"
          required
          value={email}
          onChange={this.handleChange('email')}
          onBlur={this.onEmailBlur}
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
          onChange={this.handleChange('password')}
          margin="normal"
          className={classes.input}
        />
        <div className={classes.inputCaptionContainer}>{this.renderPasswordHelperText()}</div>
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

  renderPasswordHelperText() {
    const { classes } = this.props;
    const { authenticationErrorMessage, password, existingEmail } = this.state;
    const resetLink = (
      <a className={classes.link}>
        <Typography variant="caption" color="primary" onClick={this.sendPasswordReset}>
          Forgot password? Click to reset.
        </Typography>
      </a>
    );
    if (authenticationErrorMessage) {
      return (
        <div>
          {resetLink}
          <Typography variant="caption" color="error">
            {authenticationErrorMessage}
          </Typography>
        </div>
      );
    }
    const needMoreCharactersInPassword = password.length && password.length < this.minPasswordLength;

    if (!existingEmail && needMoreCharactersInPassword) {
      return (
        <Typography variant="caption">{`Please use at least ${
          this.minPasswordLength
        } characters in your password.`}</Typography>
      );
    } else if (existingEmail) {
      return resetLink;
    }
    return null;
  }

  toggleLegalModal() {
    this.setState({ showLegalModal: !this.state.showLegalModal });
  }

  renderProfileForm() {
    const { classes, disableAutoFocus } = this.props;
    const { first, last, phone, termsAccepted, showLegalModal } = this.state;
    return (
      <form className={classes.form} onSubmit={this.handleCompleteRegistrationSubmit}>
        <TextField
          inputProps={{ 'data-e2e': 'login-form-first-name-input' }}
          key="autofocusmonkeypatch"
          label="First name"
          autoFocus
          required
          value={first}
          onChange={this.handleChange('first')}
          margin="normal"
          className={classes.input}
          autoComplete="given-name"
        />
        <TextField
          inputProps={{ 'data-e2e': 'login-form-last-name-input' }}
          label="Last name"
          required
          value={last}
          onChange={this.handleChange('last')}
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
                onChange={this.handleCheckboxChange('termsAccepted', !termsAccepted)}
                value="terms-accepted"
              />
            }
            label="I accept the terms & conditions and the privacy policy"
          />
          <Typography variant="caption">
            Read the{' '}
            <a data-e2e="login-form-tos-link" className={classes.link} onClick={this.toggleLegalModal}>
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
          show={showLegalModal}
          hideCancelButton
          onClose={this.toggleLegalModal}
          onRequestOk={this.toggleLegalModal}
        >
          <Legal />
        </ModalCard>
      </form>
    );
  }

  render() {
    const { classes, user, location } = this.props;
    const { showProfileFields, loading, errorMessage, newAccountCreated } = this.state;
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
        return <ResponsivePaper className={classes.paper}>{this.renderProfileForm()}</ResponsivePaper>;
      }
      return <ResponsivePaper className={classes.paper}>{this.renderLoginRegisterForm()}</ResponsivePaper>;
    };

    return <div className={classes.root}>{child()}</div>;
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  loginCallback: PropTypes.func,
  email: PropTypes.string,
  disableEmail: PropTypes.bool,
  loginButtonText: PropTypes.string,
  registerButtonText: PropTypes.string,
  disableAutoFocus: PropTypes.bool,
};

LoginForm.defaultProps = {
  user: null,
  loginCallback: () => {},
  email: '',
  disableEmail: false,
  disableAutoFocus: false,
  loginButtonText: 'Login',
  registerButtonText: 'Register',
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(LoginForm));
