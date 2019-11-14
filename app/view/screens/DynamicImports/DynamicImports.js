/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import moment from 'moment';
import Well from '../../components/Well/Well';
import InlineCode from '../../components/InlineCode/InlineCode';
import { documentLayoutStyle } from '../../styles/common';

const useStyles = makeStyles(theme => ({
  root: {
    ...documentLayoutStyle(theme),
  },
}));

const DynamicImports = () => {
  const classes = useStyles();
  const theTime = moment().format('HH:mm:ss.SS');
  return (
    <div className={classes.root}>
      <Typography>
        In an effort to reduce bloating of the initial client bundle, and hence to improve page load times, the routes
        in this app have been split are are all loaded dynamically.
      </Typography>
      <Typography>
        This screen imports the 232kB moment.js module. However, it is not bundled with the web app. The moment library
        is only fetched when the user visits this screen (i.e. only when they need it).
      </Typography>
      <Typography>Just to prove that we've loaded the library, here is the current 'moment':</Typography>
      <Well>{theTime}</Well>
      <Typography>
        All of the App's routes (apart from " / " and the 404) are loaded dynamically (see the{' '}
        <InlineCode>importFunction</InlineCode> in <InlineCode>app/view/App.js</InlineCode>). Declare all your routes in
        the <InlineCode>app/imports/modules/routes.js</InlineCode>
        to register all your routes and take advantage of dynamic loading.
      </Typography>
    </div>
  );
};

export default DynamicImports;
