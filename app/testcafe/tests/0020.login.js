import { Selector } from 'testcafe';
import UserJourney from '../UserJourney';
import common from '../common';

fixture`Create a new account`.page`${common.pages.login}`;

test('Create an account.', async (t) => {
  const journey = new UserJourney({ t });

  await journey.createNewAccount();

  const welcomeSelector = Selector('p[data-e2e=logged-in]');
  await t.expect(welcomeSelector.visible).ok();
});
