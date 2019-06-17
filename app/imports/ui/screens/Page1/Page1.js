import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import _ from 'lodash';
import { linkStyle } from '../../styles/common';
import { defaultRootStyle } from '../../styles/root';

const Page1 = (props) => {
  const { classes, name } = props;
  const lodash = _.get({}, 'x', true);
  console.log('lodash loaded: ', lodash);
  const x = _.cloneDeep({ hello: 'world!' });
  const time = new moment();
  return (
    <div className={classes.root}>
      <Typography variant="h4">Hello, {name}!</Typography>
      <Typography>
        This component is dynamically loaded. It depends upon the material-ui, moment, and lodash libraries.
      </Typography>
      <Typography gutterBottom>
        Since these libraries are loaded dynamically, they are kept out of the initial client bundle️, which reduces the
        bundle size significantly.{' '}
        <a href="https://www.ninjapixel.io/meteor-bundle-size.html" className={classes.link}>
          Read more about it here.
        </a>
      </Typography>

      <Typography variant="caption">
        Current date (calculated by the dynamically imported moment.js module): {time.toString()}
      </Typography>
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

const style = (theme) => ({
  root: defaultRootStyle(theme),
  link: linkStyle(theme),
});

export default withStyles(style)(Page1);
