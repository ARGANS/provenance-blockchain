// Gets the balance of an address

var chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { address } = req.query;
  const result =  await chainCommand(["getaddressbalances", address])
  res.status(200).json(result[2] ? result[2] : JSON.parse(result[0])[0].raw);
}
