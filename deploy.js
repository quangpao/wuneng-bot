// eslint-disable-next-line no-unused-vars
const WNClient = require("../src/common/classes/WNClient");

require("dotenv").config();
const { TOKENID } = process.env;

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  client.start(TOKENID);
};
