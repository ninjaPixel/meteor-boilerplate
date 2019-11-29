import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import LoginFormWiredUp from './LoginFormWiredUp';
import { paperPadding } from '../../styles/common';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  paper: {
    padding: paperPadding(theme),
  },
}));

const Screen = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Paper className={classes.paper}>
        <LoginFormWiredUp />
      </Paper>
    </div>
  );
};

Screen.propTypes = propTypes;

Screen.defaultProps = defaultProps;

export default Screen;
