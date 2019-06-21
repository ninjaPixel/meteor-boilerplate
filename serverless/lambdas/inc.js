const get = require('lodash/get');
const isFinite = require('lodash/isFinite');
const { increment } = require('../modules/increment');
const { connector } = require('../modules/connector');

module.exports = async (req, res) => {
  /*
    Note that some browsers first send an OPTIONS request before sending their request
    (in order to determine CORS headers).
   */
  const amount = get(req, 'body.amount');
  if (!amount) {
    res.end('Hello');
    return;
  }
  const { db, client } = await connector();
  let message = '';
  try {
    const numberAmount = Number(amount);
    if (!isFinite(numberAmount)) {
      res.end('World');
      return;
    }
    const count = await increment(db, numberAmount);
    message = `Count has been incremented to ${count}`;
  } catch (ex) {
    message = ex;
  } finally {
    client.close();
  }
  res.end(`The serverless function has executed. ${message}`);
};
