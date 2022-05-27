// Returns the details of the current multichain node

var chainCommand = require('../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const result = await chainCommand(["getpeerinfo"])
  res.status(200).json(result[2] ? result[2] : result[0]);
}
