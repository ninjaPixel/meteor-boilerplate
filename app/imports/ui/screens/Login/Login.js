import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';
import { middleOfScreenStyle } from '../../styles/root';
import { TYPE_SCALE } from '../../styles/constants';

const Login = (props) => {
  const { classes, user } = props;
  if (!user) {
    return <LoginForm />;
  }
  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.message} data-e2e="logged-in">
        You're all logged-in 👌
      </Typography>
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

const style = (theme) => ({
  root: middleOfScreenStyle(theme),
  message: {
    fontSize: TYPE_SCALE['48'],
  },
});

export default withStyles(style)(Login);
