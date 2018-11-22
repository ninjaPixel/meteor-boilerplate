import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, TextField, Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import AdminStyle from '../../styles/Admin';
import LoginFormStyles from '../../styles/LoginForm';
import snacks from '../../../modules/client/snacks';
import userTools from '../../../modules/userTools';
import security from '../../../modules/security';
import ResponsivePaper from '../../components/ResponsivePaper/ResponsivePaper';
import { topCenterStyle } from '../../styles/root';
import { buttonStyle } from '../../styles/common';

class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      phone: '',
      profileChanged: false,
      oldPassword: '',
      newPassword: '',
    };
    this.updateNotificationPreference = this.updateNotificationPreference.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setStateProfile(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    const newUserId = _.get(nextProps, 'user._id', false);
    const currentUserId = _.get(this.props, 'user._id', false);

    if (newUserId && (newUserId !== currentUserId || !_.isEqual(nextProps.user.profile, this.props.user.profile))) {
      this.setStateProfile(nextProps.user);
    }
  }

  setStateProfile(user) {
    if (!_.isEmpty(user)) {
      const { name, phone } = user.profile;
      const { first, last } = name;
      this.setState({
        first,
        last,
        phone,
        profileChanged: false,
      });
    }
  }

  updateNotificationPreference(preference, notify) {
    const userId = this.props.user._id;
    Meteor.call('utility.updateNotificationPreference', { userId, notificationName: preference, notify }, (error) => {
      if (error) {
        snacks.handleMethodError(error);
      } else {
        // snacks.setMessage('Notification updated 📣');
      }
    });
  }

  handleUpdateProfile(event) {
    event.preventDefault();
    const { first, last, phone } = this.state;
    const userId = this.props.user._id;
    console.log('userId, first, last, phone: ', userId, first, last, phone);
    Meteor.call('utility.updateUserProfile', { userId, first, last, phone }, (error) => {
      if (error) {
        snacks.handleMethodError(error);
      } else {
        snacks.setMessage('Profile updated 📝');
      }
    });
  }

  handleUpdatePassword(event) {
    event.preventDefault();
    const { oldPassword, newPassword } = this.state;

    Accounts.changePassword(oldPassword, newPassword, (error) => {
      if (error) {
        snacks.handleMethodError(error);
      } else {
        snacks.setMessage('Password updated 🔐');
        this.setState({
          oldPassword: '',
          newPassword: '',
        });
      }
    });
  }

  handleChange(name) {
    return (event) => {
      const value = event.target.value;
      this.setState({
        [name]: value,
      });
      if (['first', 'last', 'phone'].includes(name)) {
        this.setState({
          profileChanged: true,
        });
      }
    };
  }

  renderProfileForm() {
    const { classes, user } = this.props;
    const { first, last, phone, profileChanged } = this.state;
    const email = userTools.email(user);
    return (
      <form className={classes.accountForm} onSubmit={this.handleUpdateProfile}>
        <TextField label="Email" value={email} margin="normal" className={classes.input} disabled />
        <TextField
          label="First name"
          required
          value={first}
          onChange={this.handleChange('first')}
          margin="normal"
          className={classes.input}
          autoComplete="given-name"
        />
        <TextField
          label="Last name"
          required
          value={last}
          onChange={this.handleChange('last')}
          margin="normal"
          className={classes.input}
          autoComplete="family-name"
        />
        <TextField
          label="Mobile phone number"
          type="tel"
          value={phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          className={classes.input}
          autoComplete="tel"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={!profileChanged}
        >
          Save
        </Button>
      </form>
    );
  }

  renderPasswordForm() {
    const { classes, user } = this.props;
    const { oldPassword, newPassword } = this.state;
    if (Meteor.userId() !== user._id) {
      return null;
    }
    return (
      <form className={classes.accountForm} onSubmit={this.handleUpdatePassword}>
        <TextField
          label="Old password"
          required
          value={oldPassword}
          onChange={this.handleChange('oldPassword')}
          margin="normal"
          className={classes.input}
          type="password"
        />
        <TextField
          label="New password"
          required
          value={newPassword}
          onChange={this.handleChange('newPassword')}
          margin="normal"
          className={classes.input}
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={!(oldPassword && newPassword)}
        >
          Update password
        </Button>
      </form>
    );
  }

  render() {
    const { classes, user, match } = this.props;
    if (_.isEmpty(user)) {
      return null;
    }
    if (match.params.userId !== user._id && !security.user.isSuperAdmin(user._id)) {
      return (
        <div>
          <Typography variant="h6">You are not authorised to view this page.</Typography>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div>
          <ResponsivePaper title="My details">{this.renderProfileForm()}</ResponsivePaper>
          <div className={classes.spacer} />
          <ResponsivePaper title="Password">{this.renderPasswordForm()}</ResponsivePaper>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
};

Account.defaultProps = {
  user: null,
};

const style = (theme) => ({
  // ...AdminStyle(theme),
  // ...LoginFormStyles(theme),
  spacer: {
    height: 1,
    marginTop: theme.spacing.unit * 5,
  },
  accountForm: {
    // width: 400,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    marginTop: theme.spacing.unit * 2,
  },
  root: topCenterStyle(theme),
  button: buttonStyle(theme),
});

export default withTracker((props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const userId = props.match.params.userId;
  const handle = Meteor.subscribe('users.one', userId);
  const user = Meteor.users.findOne({ _id: userId });
  return {
    loading: !handle.ready(),
    user,
  };
})(withStyles(style)(Account));
