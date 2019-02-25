import { ClientFunction } from 'testcafe';

const domain = 'http://127.0.0.1:3003/';
// const domain = 'http://127.0.0.1:3000/';
const pages = {
  landing: `${domain}`,
  login: `${domain}login`,
};

const getWindowLocation = ClientFunction(() => window.location.href);

const speed = {
  Glacial: 0.01,
  Slow: 0.4,
  Medium: 0.7,
  Fast: 0.9,
};

export default {
  domain,
  pages,
  getWindowLocation,
  speed,
};
