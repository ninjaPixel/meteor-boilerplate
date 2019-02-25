import { ClientFunction, Selector } from 'testcafe';

const domain = 'http://127.0.0.1:3003/';
// const domain = 'http://127.0.0.1:3000/';
const pages = {
  landing: `${domain}`,
  login: `${domain}/login`,
};

const getWindowLocation = ClientFunction(() => window.location.href);

const speed = {
  Glacial: 0.01,
  Slow: 0.4,
  Medium: 0.7,
  Fast: 0.9,
};

const elements = {
  mainContent: Selector('div[data-e2e=main-content]'),
  mainContentButtons: Selector('div[data-e2e=main-content] button'),
  bookScreenButtons: {
    pricesSolopreneuer: Selector('button[data-e2e=solopreneur-prices-button]'),
    pricesStaff: Selector('button[data-e2e=staff-button]'),
    pricesShop: Selector('button[data-e2e=shop-prices-button]'),
    times: Selector('button[data-e2e=times-button]'),
    shops: Selector('button[data-e2e=shops-button]'),
  },
};

export default {
  domain,
  pages,
  getWindowLocation,
  speed,
  elements,
};
