const { findAll } = require('./find');

const increment = async (db, amount) => {
  console.log('amount: ', amount);
  const docs = await findAll(db);
  if (docs.length === 0) {
    await db.collection('sampleCollection').insertOne({ count: amount });
  } else {
    const { _id, count } = docs[0];
    await db.collection('sampleCollection').updateOne({ _id }, { $set: { count: count + amount } });
  }
  const newDocs = await findAll(db);
  return newDocs[0].count;
};

module.exports = { increment };
