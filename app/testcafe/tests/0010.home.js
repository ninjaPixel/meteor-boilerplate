import { Selector } from 'testcafe';
import common from '../common';

fixture`Loading the home page:`.page`${common.pages.landing}`;

test('Page has header text', async (t) => {
  const title = Selector('h2');

  // this implicitly checks for visibility
  // so I don't really need the second expect...
  await t
    .expect(title.innerText)
    .contains('Home screen')
    .expect(title.visible)
    .ok();
});

test('Page title is displayed in the app bar.', async (t) => {
  const title = Selector('h1[data-e2e=app-bar-text]');
  await t
    .expect(title.innerText)
    .contains('Meteor Boilerplate')
    .expect(title.visible)
    .ok();
});
