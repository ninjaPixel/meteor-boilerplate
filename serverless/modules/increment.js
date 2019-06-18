const { findAll } = require('./find');

const increment = async (db) => {
  const docs = await findAll(db);
  let result;
  if (docs.length === 0) {
    await db.collection('sampleCollection').insertOne({ count: 1 });
  } else {
    const _id = docs[0]._id;
    const count = docs[0].count;
    await db.collection('sampleCollection').updateOne({ _id }, { $set: { count: count + 1 } });
  }
  const newDocs = await findAll(db);
  return newDocs[0].count;
};

module.exports = { increment };
