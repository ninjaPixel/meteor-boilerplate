import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

const Test = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="title" >Test page</Typography>
    </div>
  );
};


Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

Test.defaultProps = {
};

const style = theme => ({
  root: {
    padding:theme.spacing.unit*10,
    backgroundColor: 'yellow',
  },
});

export default withStyles(style)(Test);
