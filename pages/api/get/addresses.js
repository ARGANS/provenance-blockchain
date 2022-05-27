// Gets a list of all addresses known by the current multichain instance

var chainCommand = require('../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const result = await chainCommand(["listaddresses"])
  res.status(200).json(result[2] ? result[2] : result[0]);
}
