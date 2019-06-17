import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Route } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LinkButton from '../../components/LinkButton/LinkButton';
import LoginForm from '../../components/LoginForm/LoginForm';
import reactiveState from '../../../api/State/client/reactiveState';
import routes from '../../../modules/routes';
import TitleBarAndNavDrawer from '../../layouts/TitleBarAndNavDrawer/TitleBarAndNavDrawer';
import track from '../../../modules/client/track';

class AppRoute extends React.PureComponent {
  componentDidMount() {
    const { title } = this.props;
    if (title) {
      reactiveState.screenTitle.set(title);
    }
    const page = this.props.location.pathname + this.props.location.search;
    track.pageView(page);
  }
  componentDidUpdate(prevProps) {
    const currentPage = prevProps.location.pathname + prevProps.location.search;
    const nextPage = this.props.location.pathname + this.props.location.search;

    if (currentPage !== nextPage) {
      track.pageView(nextPage);
    }
  }
  componentWillUnmount() {
    reactiveState.screenTitle.set('');
  }

  render() {
    const {
      classes,
      authenticationRoles,
      authenticationGroup,
      component,
      path,
      exact,
      loginRequired,
      title,
      fullScreen,
      loading,
      user,
      ...rest
    } = this.props;
    if (title) {
      reactiveState.screenTitle.set(title);
    }
    if (loginRequired && _.isEmpty(this.props.user)) {
      return (
        <div className={classes.authRoot}>
          <Typography gutterBottom>You need to login to view this page.</Typography>
          <LoginForm user={this.props.user} />
        </div>
      );
    }

    if (
      !_.isEmpty(authenticationRoles) &&
      (_.isEmpty(this.props.user) || !Roles.userIsInRole(this.props.user._id, authenticationRoles, authenticationGroup))
    ) {
      return (
        <div className={classes.authRoot}>
          <Typography gutterBottom>You do not have permission to view this page.</Typography>
          {_.isEmpty(this.props.user) && (
            <LinkButton to={routes.login.getPath()} text="Login" variant="contained" color="primary" />
          )}
        </div>
      );
    }

    return (
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => (
          <TitleBarAndNavDrawer user={user} loading={loading} fullScreen={fullScreen} {...routeProps}>
            {React.createElement(component, { ...routeProps, ...rest, user, key: 'app-route-component' })}
          </TitleBarAndNavDrawer>
        )}
      />
    );
  }
}

AppRoute.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.object,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  authenticationRoles: PropTypes.array,
  authenticationGroup: PropTypes.string,
  loginRequired: PropTypes.bool,
  fullScreen: PropTypes.bool,
  loading: PropTypes.bool,
};

AppRoute.defaultProps = {
  exact: false,
  user: null,
  authenticationRoles: [],
  authenticationGroup: null,
  loginRequired: false,
  fullScreen: false,
  loading: false,
};

const styles = {
  authRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
};

export default withStyles(styles)(AppRoute);
