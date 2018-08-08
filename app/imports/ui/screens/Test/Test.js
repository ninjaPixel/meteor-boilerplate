import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';


const Test = (props) => {
  const { classes, name } = props;
  const lodash = _.get({}, 'x', true);
  console.log('lodash: ', lodash);
  const x = _.cloneDeep({ arse: 1 });
  const time = new moment();
  return (
    <div className={classes.root}>
      <Typography variant="display1" >Hello, {name}!</Typography>
      <Typography>This component is loaded dynamically, which means that the moment library that it uses is not in the initial client bundle ✌️</Typography>
      <Typography>Current date (calculated by moment.js): {time.toString()}</Typography>
    </div>
  );
};


Test.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
};

Test.defaultProps = {
  name: 'World',
};

const style = theme => ({
  root: {
    padding: theme.spacing.unit * 10,
    backgroundColor: 'yellow',
  },
});

export default withStyles(style)(Test);
