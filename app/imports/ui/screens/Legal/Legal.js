import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import LegalComponent from '../../components/Legal/Legal';
import { defaultRootStyle } from '../../styles/root';

const Legal = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LegalComponent />
    </div>
  );
};

Legal.propTypes = {
  classes: PropTypes.object.isRequired,
};

Legal.defaultProps = {};

const style = (theme) => ({
  root: defaultRootStyle(theme),
});

export default withStyles(style)(Legal);
