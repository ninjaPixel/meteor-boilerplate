import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import { Accounts } from 'meteor/accounts-base';
import snacks from '../../../modules/client/snacks';

class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { success: false, password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { match } = this.props;
    const token = match.params.token;
    console.log('submit reset. Token = token: ', token);
    const { password } = this.state;
    Accounts.resetPassword(token, password, (error, success) => {
      console.log('success: ', success);
      console.log('error: ', error);
      if (error) {
        snacks.handleMethodError(error);
      } else {
        this.setState({ success: true });
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

  render() {
    const { classes } = this.props;
    const { password, success } = this.state;
    if (success) {
      return (<Typography variant="h5">Your password has been updated 🔓</Typography>);
    }
    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <TextField
          label="New password"
          required
          type="password"
          value={password}
          onChange={this.handleChange('password')}
          margin="normal"
          className={classes.input}
        />
        <Button type="submit" variant="contained" color="primary">Reset password</Button>
      </form>
    );
  }
}


ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


const style = theme => ({
  root: {
  },
  form: {
    width: '90%',
    maxWidth: 350,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
  },
});

export default withStyles(style)(ResetPassword);
