import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import rateLimit from '../../modules/rateLimit';
import security from '../../modules/security';
import userTools from '../../modules/userTools';


Meteor.methods({
  'utility.updateUserProfile': function ({ userId, first, last, phone }) {
    check(userId, String);
    check(first, String);
    check(last, String);
    check(phone, Match.Maybe(String));

    if (security.user.canEditThisProfile({ userId: Meteor.userId(), targetUserId: userId, errorCode: 'utility.updateUserProfile.auth', errorMessage: 'You are not allowed to update this user\'s profile.' })) {
      return Meteor.users.update(userId, {
        $set: {
          'profile.name': { first, last },
          'profile.phone': phone,
        },
      });
    }
    return false;
  },
  'utility.updateEmailMarketingConsent': function ({ userId, organisationId, consent, text }) {
    check(userId, String);
    check(organisationId, String);
    check(consent, Boolean);
    check(text, String);

    if (security.user.canEditThisProfile({ userId: Meteor.userId(), targetUserId: userId, errorCode: 'utility.updateEmailMarketingConsent.auth', errorMessage: 'You are not allowed to update this user\'s profile.' })) {
      const user = Meteor.users.findOne({ _id: Meteor.userId() });
      return userTools.marketingConsent.set({ user, organisationId, consent, text });
    }
    return false;
  },
});

rateLimit({
  methods: [
    'utility.updateUserProfile',
  ],
  limit: 3,
  timeRange: 1,
});
