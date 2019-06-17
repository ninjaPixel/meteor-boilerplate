import SimpleSchema from 'simpl-schema';
import newCollection from '../../modules/newCollection';

const SampleCollection = newCollection('sampleCollection');

const schema = new SimpleSchema({
  count: {
    type: Number,
    label: 'A number',
  },
});

SampleCollection.attachSchema(schema);

export default SampleCollection;
