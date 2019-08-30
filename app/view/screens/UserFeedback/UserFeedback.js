/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import { documentLayoutStyle, stackStyle, stackStyleLG } from '../../styles/common';
import InlineCode from '../../components/InlineCode/InlineCode';
import { actionNotificationAdd, actionSnackAdd } from '../../../controller/actions';
import Quote from '../../components/Quote/Quote';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(theme => ({
  root: {
    ...documentLayoutStyle(theme),
    ...stackStyleLG(theme),
  },
  section: {
    ...stackStyle(theme),
  },
  buttonGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const UserFeedback = props => {
  const { className } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <div className={classes.section}>
        <Typography variant="h2">Notifications</Typography>
        <Typography component="div">
          Notifications are a common feature but are hard to build. The boilerplate includes the UI for notifications;
          if you want to generate notifications in your app, I recommend doing this using serverless functions, so that
          the processing logic does not tie-up your server's only thread. See the <InlineCode>/serverless</InlineCode>{' '}
          directory for a code stub.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            actionNotificationAdd({ dispatch, message: 'Hello, world!' });
          }}
        >
          Generate a notification
        </Button>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">Alerts</Typography>
        <Quote author="Don Norman. The Design of Everyday Things">
          Feedback provides reassurance, even when it indicates a negative result. A lack of feedback creates a feeling
          of lack of control, which can be unsettling.
        </Quote>
        <Typography component="div">
          This boilerplate includes a few different flavours of 'snacks'. Hit the buttons below to try them out.
        </Typography>
        <div className={classes.buttonGrid}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              actionSnackAdd({
                dispatch,
                message: 'This is an info message',
                variant: 'info',
              });
            }}
          >
            Info
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              actionSnackAdd({
                dispatch,
                message: 'This is an error message',
                variant: 'error',
              });
            }}
          >
            Error
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              actionSnackAdd({
                dispatch,
                message: 'This is a success message',
                variant: 'success',
              });
            }}
          >
            Success
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              actionSnackAdd({
                dispatch,
                message: 'And this is a warning message',
                variant: 'warning',
              });
            }}
          >
            Warning
          </Button>
        </div>
      </div>
    </div>
  );
};

UserFeedback.propTypes = propTypes;

UserFeedback.defaultProps = defaultProps;

export default UserFeedback;
