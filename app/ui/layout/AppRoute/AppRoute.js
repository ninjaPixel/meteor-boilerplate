import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';

const propTypes = {
  authenticationGroup: PropTypes.string,
  authenticationRoles: PropTypes.array,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  fullScreen: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.object,
  loginRequired: PropTypes.bool,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
};
const defaultProps = {
  exact: false,
  fullScreen: false,
  loading: false,
  location: undefined,
  loginRequired: false,
  title: '',
  user: undefined,
};

const AppRoute = props => {
  const { path, exact, component, user, title, location, ...rest } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => {
        const componentProps = {
          ...routeProps,
          ...rest,
          user,
          matt: true,
          key: 'app-route-component',
        };
        return (
          <TitleBarAndNavDrawer screenTitle={title} {...props} {...routeProps}>
            {React.createElement(component, componentProps)}
          </TitleBarAndNavDrawer>
        );
      }}
    />
  );
};

AppRoute.propTypes = propTypes;

AppRoute.defaultProps = defaultProps;

export default AppRoute;
