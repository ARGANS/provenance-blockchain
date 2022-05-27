// Searches the root stream for all detail entries for a given address

var chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { params } = req.query;

  const result =  await chainCommand([
    "liststreamqueryitems",
    "root",
    "'{\"keys\": [], \"publisher\": \"" + address + "\"}'"
  ]);
  console.log(result[2]);
  res.status(200).json(result[2] ? result[2] : result[0]);
}
