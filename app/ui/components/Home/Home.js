import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {};
const defaultProps = {};

const useStyles = makeStyles(() => ({
  root: {},
}));

const Home = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Home component.</Typography>
    </div>
  );
};

Home.propTypes = propTypes;

Home.defaultProps = defaultProps;

export default Home;
