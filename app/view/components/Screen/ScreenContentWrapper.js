import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: '100%',
  },
}));

const ScreenContentWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} data-e2e="main-content">
      {children}
    </div>
  );
};

ScreenContentWrapper.propTypes = propTypes;

export default ScreenContentWrapper;
