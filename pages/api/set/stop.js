// Stops the Multichain daemon

var chainCommand = require('../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const result = await chainCommand(["stop"])
  console.log(result);
  res.status(200).json(result[2] ? result[2] : result[0]);
}
