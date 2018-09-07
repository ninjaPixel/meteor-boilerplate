import { Mongo } from 'meteor/mongo';

export default function (collectionName) {
  const collection = new Mongo.Collection(collectionName);
  collection.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
  });

  collection.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
  });

  return collection;
}
