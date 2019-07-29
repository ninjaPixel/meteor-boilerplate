import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import SvgUndrawPageNotFound from '../Undraw/UndrawPageNotFound';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    // padding: theme.spacing(3),
  },
}));

const FourOhFour = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SvgUndrawPageNotFound viewBox="0 0 1000 1000" width="300" height="300" />
      <Typography>Sorry, we can't find that page.</Typography>
    </div>
  );
};

FourOhFour.propTypes = propTypes;

FourOhFour.defaultProps = defaultProps;

export default FourOhFour;
