const MongoClient = require('mongodb').MongoClient;
const { DB_NAME, MONGO_URL } = require('./connection');
const connector = async () => {
  const client = await MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
  );
  const db = client.db(DB_NAME);
  return { client, db };
};

module.exports = { connector };
