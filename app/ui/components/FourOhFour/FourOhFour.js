import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(() => ({
  root: {},
}));

const FourOhFour = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>FourOhFour component.</Typography>
    </div>
  );
};

FourOhFour.propTypes = propTypes;

FourOhFour.defaultProps = defaultProps;

export default FourOhFour;
