const account = (userId) => `/account/${userId}`;
const legal = '/legal';
const page1 = '/page1';
const page2 = '/page2';
const home = '/';
const login = '/login';
const resetPassword = (token) => `/reset-password/${token}`;
export default {
  account,
  legal,
  page1,
  page2,
  home,
  login,
  resetPassword,
};
