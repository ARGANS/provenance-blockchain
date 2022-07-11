// write a Name object to the blockchain with key: details publisher: current address

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
    "'details'",
    '\'{"json": ' + body + '}\''
  ]);
  // console.log(result)

  /*  const details = JSON.parse(result[2]);
  var name = "Name not set";
  if (details !== []) {
    console.log("Get name here when add details is available");
  }
  res.status(200).json(result[2] ? result[2] : name);
  */
  res.status(200).end(result[0]);
}
