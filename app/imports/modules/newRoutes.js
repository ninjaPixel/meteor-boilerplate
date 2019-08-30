// @flow
/* eslint-disable import/no-absolute-path */

type CreateRouteInputType = {
  title: string,
  getPath?: func,
  importFunction: func,
  path: string,
  fullScreen?: boolean,
  loginRequired?: boolean,
};

type CreateRouteOutputType = {
  title: string,
  getPath: func,
  importFunction: func,
  path: string,
  fullScreen: boolean,
  loginRequired: boolean,
};
const createRoute = ({
  title = '',
  getPath = null,
  importFunction,
  path,
  loginRequired = false,
  fullScreen = false,
}: CreateRouteInputType): CreateRouteOutputType => {
  let pathFunction = (): string => path;
  if (getPath) {
    pathFunction = getPath;
  }

  return {
    title,
    importFunction,
    path,
    loginRequired,
    getPath: pathFunction,
    fullScreen,
  };
};

export default {
  dynamicImports: createRoute({
    title: 'Dynamic imports',
    importFunction: (): Promise => import('../../view/screens/DynamicImports/DynamicImports.js'),
    exact: true,
    path: '/dynamic-imports',
    loginRequired: true,
  }),
  notifications: createRoute({
    title: 'Notifications',
    importFunction: (): Promise => import('../../view/components/Notifications/NotificationList.js'),
    exact: true,
    fullScreen: true,
    path: '/notifications',
  }),
  typography: createRoute({
    title: 'Typography',
    importFunction: (): Promise => import('../../view/screens/Typography/Typography.js'),
    exact: true,
    path: '/typography',
  }),
  styling: createRoute({
    title: 'Styling',
    importFunction: (): Promise => import('../../view/screens/Styling/Styling.js'),
    exact: true,
    path: '/styling',
  }),
  architecture: createRoute({
    title: 'Architecture',
    // eslint-disable-next-line import/no-cycle
    importFunction: (): Promise => import('../../view/screens/Architecture/Architecture.js'),
    exact: true,
    path: '/architecture',
  }),
  userFeedback: createRoute({
    title: 'User Feedback',
    importFunction: (): Promise => import('../../view/screens/UserFeedback/UserFeedback.js'),
    exact: true,
    path: '/userfeedback',
  }),
  login: createRoute({
    title: 'Login',
    importFunction: (): Promise => import('../../view/components/LoginForm/LoginForm.js'),
    exact: true,
    path: '/login',
  }),
  account: createRoute({
    title: 'Account',
    importFunction: (): Promise => import('../../view/components/LoginForm/LoginForm.js'),
    exact: true,
    loginRequired: true,
    getPath: (userId: string): string => `/account/${userId}`,
    path: '/account/:userId',
  }),
};
