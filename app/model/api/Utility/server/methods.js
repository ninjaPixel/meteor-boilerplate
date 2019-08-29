import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import _ from 'lodash';
import rateLimit from '../../rateLimit';
import sendEmail from '../../../../imports/modules/server/email/send';
import routes from '../../../../imports/modules/routes';
import security from '../../../../imports/modules/security';

const _sendPasswordResetEmail = function({ email, firstName, token, windowLocationOrigin }) {
  const title = `Password reset for ${Meteor.settings.public.appName}`;
  sendEmail({
    to: email,
    from: Meteor.settings.private.email.noReply,
    subject: title,
    template: 'resetPassword',
    css: 'common',
    templateVars: {
      firstName,
      title,
      appUrl: windowLocationOrigin,
      appName: Meteor.settings.public.appName,
      resetUrl: `${windowLocationOrigin}${routes.resetPassword.getPath(token)}`,
    },
  })
    .catch(error => {
      console.warn(`Could not sent password reset email to ${email}`, error);
    })
    .finally(() => {});
};

Meteor.methods({
  'utility.checkIfEmailAddressExists': function checkIfEmailAddressExists(email) {
    check(email, String);
    const user = Accounts.findUserByEmail(email);
    return !_.isEmpty(user);
  },
  'utility.userIdFromEmail': function userIdFromEmail(email) {
    check(email, String);
    const user = Accounts.findUserByEmail(email);
    if (_.isEmpty(user)) {
      return '';
    }
    return user._id;
  },
  'utility.sendPasswordResetEmail': function sendPasswordResetEmail({ email, windowLocationOrigin }) {
    check(email, String);
    check(windowLocationOrigin, String);

    const user = Accounts.findUserByEmail(email);
    if (_.isEmpty(user)) {
      throw new Meteor.Error(
        'utility.sendPasswordResetEmail.emailDoesNotExist',
        `Cannot find an account associated with the email ${email}`,
      );
    }
    const { token } = Accounts.generateResetToken(user._id, email);
    console.log(`generateResetToken for ${email}. Token: ${token}`);
    _sendPasswordResetEmail({
      email,
      firstName: user.profile.name.first,
      token,
      windowLocationOrigin,
      userId: user._id,
    });
    return true;
  },
  'utility.updateNotificationPreference': function({ userId, notificationName, notify }) {
    check(userId, String);
    check(notificationName, String);
    check(notify, Boolean);

    if (
      security.user.userCanEditThisUserProfile({
        userId: Meteor.userId(),
        targetUserId: userId,
        errorCode: 'utility.updateUserProfile.auth',
        errorMessage: "You are not allowed to update this user's profile.",
      })
    ) {
      const field = `profile.notificationPreferences.${notificationName}`;
      return Meteor.users.update(userId, {
        $set: {
          [field]: notify,
        },
      });
    }
    return false;
  },
});

rateLimit({
  methods: [
    'utility.checkIfEmailAddressExists',
    'utility.userIdFromEmail',
    'utility.sendPasswordResetEmail',
    'utility.updateNotificationPreference',
  ],
  limit: 3,
  timeRange: 1,
});
