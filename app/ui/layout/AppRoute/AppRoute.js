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
  const { path, exact, component, user, title, ...rest } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => (
        <TitleBarAndNavDrawer screenTitle={title}
        >
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
