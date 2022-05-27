// Starts the Multichain daemon

var chainDaemon = require('../../../utils/chainCommand.js').chainDaemon;

export default async function handler(req, res) {
  const result = await chainDaemon(["-reindex=1", "esa-blockchain", "-daemon"])
  console.log(result);
  res.status(200).json(result[2] ? result[2] : result[0]);
}
