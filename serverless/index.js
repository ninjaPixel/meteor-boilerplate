const { findAll } = require('./lambdas/find');
const { increment } = require('./lambdas/increment');
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
