import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { commonProps } from './props';
import LoginFormComponent from './LoginFormComponent';

const propTypes = {
  className: PropTypes.string,
  ...commonProps.propTypes,
};
const defaultProps = {
  className: undefined,
  ...commonProps.defaultProps,
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const LoginForm = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;

  return (
    <LoginFormComponent
      {...rest}
      onCreateUser={() => {}}
      onCheckIfEmailExists={() => {}}
      onLogin={() => {}}
      onSendPasswordResetEmail={() => {}}
    />
  );
};

LoginForm.propTypes = propTypes;

LoginForm.defaultProps = defaultProps;

export default LoginForm;
