import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SampleCollection from '../SampleCollection';

Meteor.publish('sampleCollection', ({ _id }) => {
  check(_id, String);
  return SampleCollection.find({ _id });
});
