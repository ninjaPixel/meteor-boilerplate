/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import LinkComponent from '../../components/Link/Link';
import InlineCode from '../../components/InlineCode/InlineCode';
import { documentLayoutStyle, stackStyle, stackStyleLG } from '../../styles/common';
import newRoutes from '../../../imports/modules/routes';
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
    '& > * + h3': {
      // we need a bit more top padding for the sub title
      paddingTop: theme.spacing(5),
    },
    '& > h2 + h3': {
      // but don't add extra padding if this sub heading comes immediately after the section heading
      paddingTop: theme.spacing(0),
    },
    '& h3': {
      // paddingLeft: theme.spacing(2),
      // '&::before': {
      //   content: "'• '",
      // },
    },
    '& h4': {
      // paddingLeft: theme.spacing(2),
      // '&::before': {
      //   content: "'•• '",
      // },
    },
  },
}));

const Architecture = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <div className={classes.section}>
        <Typography component="div">
          The heart of this project is built with the{' '}
          <LinkComponent to="https://www.meteor.com">Meteor framework</LinkComponent>. The only big difference is that
          I've created a 'lite' mode which builds the UI components very fast. Rebuild times for a Meteor app are
          usually 2-3 seconds, but running in lite mode a rebuild takes less than 100ms (and is often less than 20ms).
          For me, this is a crucial developer experience which allows me to remain in a flow state when I'm iterating
          the UI 🧘.
        </Typography>
        <Typography component="div">
          Lite mode is a script that can be run from the <InlineCode>app</InlineCode> directory with{' '}
          <InlineCode>npm run start:lite</InlineCode>. The only drawback of this approach is that the serverside code
          does not run, therefore you can't subscribe to collections or make method (API) calls. I now see this as a
          blessing in disguise as it's forced me to completely separate all of the Meteor-specific logic out of the UI
          components. When in lite mode, I mock the Meteor API calls (more on this in the Redux-Sagas section).
        </Typography>

        <Typography component="div">
          The ui code all lives in the <InlineCode>app/view</InlineCode> directory and the code that fetches data and
          responds to user actions lives in the <InlineCode>app/controller</InlineCode> directory. Functions that
          request data (for example, a database call) reside in <InlineCode>app/controller/sagas</InlineCode> (more on
          this later)
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">Model</Typography>
        <Typography variant="h3">Collections, Subscriptions and Meteor Methods</Typography>
        <Typography>
          The <InlineCode>app/model/api</InlineCode> directory contains a directory for each collection in our database.
          These directories also include the publications and methods (API calls) for that collection.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">View</Typography>
        <Typography variant="h3">Title bar and nav drawer</Typography>
        <Typography>
          Each app route points to a screen, and each screen is wrapped in the{' '}
          <InlineCode>TitleBarAndNavDrawer.js</InlineCode> component. This, itself, is wrapped in an{' '}
          <InlineCode>AppRoute</InlineCode> component which is a thin wrapper on a react-router{' '}
          <InlineCode>Route</InlineCode>.
        </Typography>
        <Typography variant="h3">Styling</Typography>
        <Typography component="div">
          JSS is used for styling. Most of the styling is done within the component itself, the more generic stuff is
          located in <InlineCode>app/view/styles</InlineCode>. Further info on{' '}
          <LinkComponent to={newRoutes.styling.path}>this page</LinkComponent> and also the{' '}
          <LinkComponent to="https://material-ui.com/styles/basics/">Material UI docs</LinkComponent>.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">Controller</Typography>
        <Typography variant="h3">Redux</Typography>
        <Typography component="div">
          Used for for handling the state. Make sure that you download the redux dev tools as they are lit{' '}
          <span role="img" aria-label="flame">
            🔥
          </span>
        </Typography>
        <Typography component="div">
          In general, I save a component's state variables to the Redux store. This does fragment the code somewhat but
          I think the payoff is worth it because it means that if a component unmounts, the user does not loose their
          state. This is particularly important when a user is filling in a form and then gets distracted by a
          notification. When they return to the form, we don't want them to have to start from scratch. Another benefit,
          is that the loading progress of any action is always up-to-date. If a user leaves a screen and then comes back
          to it, the progress indicator will not be reset.
        </Typography>
        <Typography variant="h4">Sagas</Typography>
        <Typography component="div">
          <LinkComponent to={'https://redux-saga.js.org/'}>Redux-Sagas</LinkComponent> is a library used for
          asynchronous state changes to the Redux store. In this project, it is used for making calls to the backend
          server (e.g. when you login). The use of Redux-Sagas does add an extra level of complexity to the project, so
          apologies for that. What we've lost in DX (developer experience) will be made up for with long-term robustness
          and (hopefully) easier debugging of this project.
        </Typography>
        <Quote author={'the Saga docs'}>
          The mental model is that a saga is like a separate thread in your application that's solely responsible for
          side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled
          from the main application with normal redux actions, it has access to the full redux application state and it
          can dispatch redux actions as well.
        </Quote>
        <Typography component="div">
          I'm still getting to grips with Redux-Sagas, and am just at the start of my journey with this library!
        </Typography>
        <Typography>
          For functions that need to interact with our server, we check if the <InlineCode>window.Meteor</InlineCode>{' '}
          variable exists. If it does, we are running in regular mode and can call Meteor methods etc. If{' '}
          <InlineCode>window.Meteor</InlineCode> does not exist then it means we are in lite mode, as such the saga will
          mock the Meteor calls. The entry point for the client app is{' '}
          <InlineCode>app/imports/meteor_startup/client/app.js</InlineCode>, however in lite mode the entry point is{' '}
          <InlineCode>app/client/parcel-index.js</InlineCode>.
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="h2">Other...</Typography>
        <Typography>
          Some things don't fit neatly into the MVC categories (for logical or practical reasons). In these cases they
          have been put into other directories.
        </Typography>
        <Typography variant="h3">Imports</Typography>
        <Typography>
          The <InlineCode>app/imports</InlineCode> directory contains code that is shared in many places and across the
          boundaries of MVC. Things such as routing and security.
        </Typography>
        <Typography variant="h3">Serverless functions</Typography>
        <Typography>
          I'll write a whole page about this at some point, but for now I'll just mention that the{' '}
          <InlineCode>serverless</InlineCode> directory allows us to deploy serverless functions (using{' '}
          <LinkComponent to="https://www.zeit.co">Zeit Now</LinkComponent>). Really handy for off-loading long-running
          processes, so that your Meteor server does not become slow to client requests.
        </Typography>
        <Typography variant="h3">Emails</Typography>
        <Typography>
          Emails are sent using an SMTP connection. Templates are located in{' '}
          <InlineCode>app/private/emailTemplates</InlineCode>
        </Typography>
      </div>
    </div>
  );
};

Architecture.propTypes = propTypes;

Architecture.defaultProps = defaultProps;

export default Architecture;
