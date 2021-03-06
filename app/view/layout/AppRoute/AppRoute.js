import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useStoreUser } from '../../hooks/reduxSelectors';

const propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  fullScreen: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.object,
  loginRequired: PropTypes.bool,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
};
const defaultProps = {
  exact: false,
  fullScreen: false,
  loading: false,
  location: undefined,
  loginRequired: false,
  title: '',
};

const AppRoute = props => {
  const { path, exact, component, title, location, ...rest } = props;
  const user = useStoreUser();
  const { loginRequired } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => {
        const { history, match, navigation } = routeProps;
        const routerProps = { history, match, navigation };
        const componentProps = {
          ...rest,
          user,
          key: 'app-route-component',
        };
        const showLoginScreen = loginRequired && _.isEmpty(user);

        return (
          <TitleBarAndNavDrawer screenTitle={title} {...routerProps} {...props}>
            {!showLoginScreen ? React.createElement(component, componentProps) : <LoginForm />}
          </TitleBarAndNavDrawer>
        );
      }}
    />
  );
};

AppRoute.propTypes = propTypes;

AppRoute.defaultProps = defaultProps;

export default AppRoute;
