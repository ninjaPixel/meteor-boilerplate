import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import ResponsivePaper from '../../components/ResponsivePaper/ResponsivePaper';

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
  const [password, setPassword] = useState('');
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <ResponsivePaper title="Choose a new password">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          TODO
        </form>
      </ResponsivePaper>
    </div>
  );
};

PasswordReset.propTypes = propTypes;

PasswordReset.defaultProps = defaultProps;

export default PasswordReset;
