import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import LegalComponent from '../../components/Legal/Legal';


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

Legal.defaultProps = {
};

const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing.unit,
  },
});

export default withStyles(style)(Legal);
