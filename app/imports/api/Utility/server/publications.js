import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import security from '../../../modules/security';

Meteor.publish('users.one', (userId) => {
  check(userId, String);
  if (security.user.canEditThisProfile({ userId: this.userId, targetUserId: userId, errorCode: 'user.one.auth', errorMessage: 'You are not allowed to view this user\'s profile.' })) {
    return Meteor.users.find({ _id: userId }, {
      fields: {
        emails: 1,
        profile: 1,
        marketingConsent: 1,
      },
    });
  }
  return null;
});


Meteor.publish('users.many', (userIds) => {
  check(userIds, [String]);
  if (Roles.userIsInRole(this.userId, ['super-admin'], Roles.GLOBAL_GROUP)) {
    return Meteor.users.find({ _id: { $in: userIds } }, {
      fields: {
        emails: 1,
        profile: 1,
      },
    });
  }
  return null;
});
