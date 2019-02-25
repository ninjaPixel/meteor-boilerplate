import { Selector } from 'testcafe';

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class UserJourney {
  constructor({ t }) {
    this.t = t || null;
    this.user = {
      email: `${getRandomIntInclusive(1, 99999999)}@test.com`,
      password: getRandomIntInclusive(10000, 99999).toString(),
      bookings: [],
      firstName: 'Testy',
      lastName: 'McTestFace',
    };
    this.screens = {
      snack: Selector('div[data-e2e=global-snack'),
      title: Selector('div[data-e2e=navigation-toolbar]'),
      modal: {
        card: Selector('div[data-e2e=modal-card]'),
        confirmButton: Selector('button[data-e2e=modal-confirm]'),
        cancelButton: Selector('button[data-e2e=modal-cancel]'),
      },
      loginForm: {
        email: Selector('input[data-e2e=login-form-email-input]'),
        password: Selector('input[data-e2e=login-form-password-input]'),
        firstName: Selector('input[data-e2e=login-form-first-name-input]'),
        lastName: Selector('input[data-e2e=login-form-last-name-input]'),
        phoneNumber: Selector('input[data-e2e=login-form-phone-number-input]'),
        submitButton: Selector('button[data-e2e=login-form-submit-button]'),
        tosCheckBox: Selector('span[data-e2e=login-form-tos-checkbox]'),
      },
    };
  }

  setT(t) {
    this.t = t;
  }

  async login(email, password) {
    await this.t
      .typeText(this.screens.loginForm.email, email)
      .typeText(this.screens.loginForm.password, password)
      .click(this.screens.loginForm.submitButton);
  }

  async loginWithTestAccount() {
    await this.login('test@test.com', 'password');
  }

  async loginWithAdminAccount() {
    await this.login('admin@test.com', 'adminpassword');
  }

  async createNewAccount() {
    await this.t
      .typeText(this.screens.loginForm.email, this.user.email)
      .typeText(this.screens.loginForm.password, this.user.password)
      .click(this.screens.loginForm.submitButton)
      .typeText(this.screens.loginForm.firstName, this.user.firstName)
      .typeText(this.screens.loginForm.lastName, this.user.lastName)
      .click(this.screens.loginForm.tosCheckBox)
      .click(this.screens.loginForm.submitButton);
  }
}

export default UserJourney;
