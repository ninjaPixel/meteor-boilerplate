import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import { documentLayoutStyle, stackStyle, stackStyleLG } from '../../styles/common';
import InlineCode from '../../components/InlineCode/InlineCode';
import { actionAddNotification } from '../../redux/actions';

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
          if you want to generate notifications in your app, we recommend doing this using serverless functions, so that
          the processing logic does not tie-up your server's only thread. See the <InlineCode>/serverless</InlineCode>{' '}
          directory for a code stub.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            actionAddNotification({ dispatch, message: 'Hello, world!' });
          }}
        >
          Generate a notification
        </Button>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">Alerts</Typography>
      </div>
    </div>
  );
};

UserFeedback.propTypes = propTypes;

UserFeedback.defaultProps = defaultProps;

export default UserFeedback;
