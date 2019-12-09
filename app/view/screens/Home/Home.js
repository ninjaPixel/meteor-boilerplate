import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import BigIcon from '@material-ui/icons/DirectionsBus';

import LinkButton from '../../components/LinkButton/LinkButton';

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
      <LinkButton to="/big">
        <BigIcon />
        Goto Big page
      </LinkButton>
    </div>
  );
};

Home.propTypes = propTypes;

Home.defaultProps = defaultProps;

export default Home;
