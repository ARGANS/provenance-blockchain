// Searches the root stream for all detail entries for a given product Id

var chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { params } = req.query;
  console.log("Parameters", params)

  const result =  await chainCommand([
    "liststreamqueryitems",
    "root",
    "'{\"keys\": [\"" + params.join('","') + "\"]}'"
  ]);
  console.log(result);
  res.status(200).json(result[2] ? result[2] : result[0]);
}
