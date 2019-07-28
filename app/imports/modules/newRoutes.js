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
    importFunction: (): Promise => import('../../ui/screens/DynamicImports/DynamicImports.js'),
    exact: true,
    path: '/dynamic-imports',
  }),
  notifications: createRoute({
    title: 'Notifications',
    importFunction: (): Promise => import('../../ui/components/Notifications/NotificationList.js'),
    exact: true,
    fullScreen: true,
    path: '/notifications',
  }),
  typography: createRoute({
    title: 'Typography',
    importFunction: (): Promise => import('../../ui/screens/Typography/Typography.js'),
    exact: true,
    path: '/typography',
  }),
};
