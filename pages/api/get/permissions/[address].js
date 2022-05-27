// Gets the permissions for an address

var chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { address } = req.query;
  const result =  await chainCommand(["listpermissions", "send,receive,mine,admin", address])
  const perms = JSON.parse(result[0]);
  var permsArray = [];
  perms.forEach(entry => {
    permsArray.push(entry.type);
  });
  res.status(200).json(result[2] ? result[2] : permsArray);
}
