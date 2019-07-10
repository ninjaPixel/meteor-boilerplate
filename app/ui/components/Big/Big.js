import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Well from '../Well/Well';

const Big = () => {
  const theTime = moment().format('HH:mm:ss.SS');
  return (
    <div>
      <Typography>
        This screen is loaded dynamically which means the the 232kB moment.js module is not bundled with the web app and
        is only loaded when the user visits this screen.
      </Typography>
      <Typography>Just to prove that we've loaded the library, the time is currently:</Typography>
      <Well>{theTime}</Well>
    </div>
  );
};

export default Big;
