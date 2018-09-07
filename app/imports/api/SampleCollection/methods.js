import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../../modules/rateLimit';

Meteor.methods({
  'sampleCollection.test': function (userId) {
    check(userId, String);
    return `Hello, user ${userId}!`;
  },
});

rateLimit({
  methods: [
    'sampleCollection.test',
  ],
  limit: 10,
  timeRange: 5,
});
