import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import newCollection from '../../../imports/modules/newCollection';

const SampleCollection = newCollection('sampleCollection');

const schema = new SimpleSchema({
  count: {
    type: Number,
    label: 'A number',
  },
});

SampleCollection.attachSchema(schema);

if (Meteor.isServer && SampleCollection.find({}).fetch().length === 0) {
  SampleCollection.insert({ count: 1 });
}

export default SampleCollection;
