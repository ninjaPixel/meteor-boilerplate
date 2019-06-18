const { findAll } = require('./find');

const increment = async (db) => {
  const docs = await findAll(db);
  let result;
  if (docs.length === 0) {
    result = await db.collection('sampleCollection').insertOne({ count: 1 });
  } else {
    const _id = docs[0]._id;
    const count = docs[0].count;
    result = await db.collection('sampleCollection').updateOne({ _id }, { $set: { count: count + 1 } });
  }
  return result;
};

module.exports = { increment };
