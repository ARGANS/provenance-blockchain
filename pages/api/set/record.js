// write a Name object to the blockchain with keys: 
// type: whether it is generation or something else
// id: current hash
// prodId: hash of file for generation event

const chainCommand = require('../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const body = JSON.stringify(req.body);
  console.log(body);
  const result =  await chainCommand([
    "publish",
    "root",
    '\'["' + req.body["Type"]+ '", "' + req.body["Product identifier"] + '", "' + req.body["File identifier"] + '"]\'',
    '\'{"json": ' + body + '}\''
  ]);
  console.log(result)

  res.status(200).end(result[0]);
}
