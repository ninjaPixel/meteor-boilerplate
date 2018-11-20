import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';

const Login = props => {
  const { classes, user } = props;
  if (!user) {
    return <LoginForm />;
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5">You're all logged-in 👌</Typography>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

Login.defaultProps = {
  user: null,
};

const style = theme => ({
  root: {},
});

export default withStyles(style)(Login);
