// Searches the root stream for all detail entries for a given address and extracts the name

var chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { address } = req.query;
  const result =  await chainCommand([
    "liststreamqueryitems",
    "root",
    "'{\"key\": \"details\", \"publisher\": \"" + address + "\"}'"
  ]);
  console.log(result[2]);
  const details = JSON.parse(result[2]);
  var name = "Name not set";
  if (details !== []) {
    console.log("Get name here when add details is available");
  }
  res.status(200).json(result[2] ? result[2] : name);
}
