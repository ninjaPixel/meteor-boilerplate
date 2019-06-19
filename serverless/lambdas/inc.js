const { increment } = require('../modules/increment');
const { connector } = require('../modules/connector');

module.exports = async (req, res) => {
  const { db, client } = await connector();
  let message = '';
  try {
    const count = await increment(db);
    message = `Count has been incremented to ${count}`;
  } catch (ex) {
    message = ex;
  } finally {
    client.close();
  }
  res.end(`Request received. ${message}`);
};
