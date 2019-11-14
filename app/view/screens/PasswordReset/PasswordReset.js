import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const PasswordReset = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography>PasswordReset component.</Typography>
    </div>
  );
};

PasswordReset.propTypes = propTypes;

PasswordReset.defaultProps = defaultProps;

export default PasswordReset;
