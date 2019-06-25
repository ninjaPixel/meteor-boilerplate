import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';

const propTypes = {
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
const defaultProps = {};

const AppRoute = props => {
  const { path, exact, component, user, ...rest } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => (
        <TitleBarAndNavDrawer>
          {React.createElement(component, {
            ...routeProps,
            ...rest,
            user,
            key: 'app-route-component',
          })}
        </TitleBarAndNavDrawer>
      )}
    />
  );
};

AppRoute.propTypes = propTypes;

AppRoute.defaultProps = defaultProps;

export default AppRoute;
