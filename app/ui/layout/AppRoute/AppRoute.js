import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';

const propTypes = {
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
        const { history, match, navigation } = routeProps;
        // TODO: move routing handling to redux
        const routerProps = { history, match, navigation };
        const componentProps = {
          // history,
          // match,
          // navigation,
          ...rest,
          user,
          key: 'app-route-component',
        };
        return (
          <TitleBarAndNavDrawer screenTitle={title} {...routerProps} {...props}>
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
