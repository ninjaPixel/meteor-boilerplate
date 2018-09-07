import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SampleCollection from '../SampleCollection';
import rateLimit from '../../../modules/rateLimit';


SampleCollection._ensureIndex({
  userId: 1,
  fieldOne: 1,
  fieldTwo: 1,
});


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