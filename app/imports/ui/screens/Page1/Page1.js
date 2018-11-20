import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import moment from 'moment';
import _ from 'lodash';


const Page1 = (props) => {
  const { classes, name } = props;
  const lodash = _.get({}, 'x', true);
  console.log('lodash loaded: ', lodash);
  const x = _.cloneDeep({ hello: 'world!' });
  const time = new moment();
  return (
    <div className={classes.root}>
      <Typography variant="h1" >Hello, {name}!</Typography>
      <Typography>This component depends upon the material-ui, moment, and lodash libraries.</Typography>
      <Typography>These libraries are loaded dynamically, which means that they are kept out of the initial client bundle️, which reduces the bundle size significantly.</Typography>
      <Typography>Current date (calculated by moment.js): {time.toString()}</Typography>
    </div>
  );
};


Page1.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
};

Page1.defaultProps = {
  name: 'World',
};

const style = theme => ({
  root: {
    padding: theme.spacing.unit * 10,
    height: '100%',
    backgroundColor: purple[500],
  },
});

export default withStyles(style)(Page1);
