// @flow
import { Meteor } from 'meteor/meteor';

const appUrl = Meteor.settings.public.appUrl;

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
  login: createRoute({
    title: 'Login',
    importFunction: (): Promise => import('/imports/ui/screens/Login/Login.js'),
    exact: true,
    path: '/login',
  }),
  logout: createRoute({
    title: 'Logout',
    importFunction: (): Promise => import('/imports/ui/screens/Logout/Logout.js'),
    exact: true,
    path: '/logout',
  }),
  legal: createRoute({
    title: 'Legal',
    importFunction: (): Promise => import('/imports/ui/screens/Legal/Legal.js'),
    exact: true,
    path: '/legal',
  }),
  account: createRoute({
    title: 'My account',
    importFunction: (): Promise => import('/imports/ui/screens/Account/Account.js'),
    exact: true,
    loginRequired: true,
    path: '/account/:userId',
    getPath: (userId: string): string => `/account/${userId}`,
  }),
  resetPassword: createRoute({
    title: 'Reset password',
    importFunction: (): Promise => import('/imports/ui/screens/ResetPassword/ResetPassword.js'),
    exact: true,
    path: '/reset-password/:token',
    getPath: (token: string): string => `/reset-password/${token}`,
  }),
  page1: createRoute({
    title: 'Page 1',
    importFunction: (): Promise => import('/imports/ui/screens/Page1/Page1.js'),
    exact: true,
    path: '/page1',
  }),
  page2: createRoute({
    title: 'Page 2',
    importFunction: (): Promise => import('/imports/ui/screens/Page2/Page2.js'),
    exact: true,
    path: '/page2',
  }),
};
