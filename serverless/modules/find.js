const mongoQuery = ({ db, collection, find = {}, limit = 1, sort = {} }) =>
  new Promise((resolve, reject) => {
    const cursor = db
      .collection(collection)
      .find(find)
      .limit(limit)
      .sort(sort);

    const docs = [];
    cursor.forEach(
      (doc) => {
        docs.push(doc);
      },
      (err) => {
        if (err) {
          console.error('error: ', err);
          reject(err);
        } else {
          resolve(docs);
        }
      },
    );
  });

const findAll = async (db) => {
  const docs = await mongoQuery({ db, collection: 'sampleCollection' });
  return docs;
};

module.exports = { findAll };
