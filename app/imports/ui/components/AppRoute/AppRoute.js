import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Route } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';
import LinkButton from '../../components/LinkButton/LinkButton';
import LoginForm from '../../components/LoginForm/LoginForm';
import reactiveState from '../../../api/State/client/reactiveState';
import routes from '../../../modules/routes';
import TitleBarAndNavDrawer from '../../layouts/TitleBarAndNavDrawer/TitleBarAndNavDrawer';

class AppRoute extends React.PureComponent {
  componentDidMount() {
    const { title } = this.props;
    if (title) {
      reactiveState.screenTitle.set(title);
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
      distractionFree,
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
            <LinkButton to={routes.login} text="Login" variant="contained" color="primary" />
          )}
        </div>
      );
    }

    return (
      <Route
        path={path}
        exact={exact}
        render={routeProps => (
          <TitleBarAndNavDrawer user={user} loading={loading} distractionFree={distractionFree} {...routeProps}>
            {React.createElement(component, { ...routeProps, ...rest, user, key: 'app-route-component' })}
          </TitleBarAndNavDrawer>
        )}
      />
    );
  }
}

AppRoute.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.object,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  authenticationRoles: PropTypes.array,
  authenticationGroup: PropTypes.string,
  loginRequired: PropTypes.bool,
  distractionFree: PropTypes.bool,
  loading: PropTypes.bool,
};

AppRoute.defaultProps = {
  exact: false,
  user: null,
  authenticationRoles: [],
  authenticationGroup: null,
  loginRequired: false,
  distractionFree: false,
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
