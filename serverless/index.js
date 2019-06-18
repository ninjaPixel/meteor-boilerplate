const { findAll } = require('./modules/find');
const { increment } = require('./modules/increment');
const { connector } = require('./modules/connector');

const go = async () => {
  const { db, client } = await connector();
  try {
    await increment(db);
    const results = await findAll(db);
    console.log('results: ', results);
  } catch (ex) {
    console.error('exception: ', ex);
  } finally {
    client.close();
  }
};

go();
