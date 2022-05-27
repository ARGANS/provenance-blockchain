// Gets the main address of the current multichain instance

var chainCommand = require('../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const addressList = await chainCommand(["listaddresses"])
  var result = ""
  JSON.parse(addressList[0]).forEach(entry => {
    if (entry.ismine === true) {
      result = entry.address;
    }
  });

  res.status(200).json((result !== "") ? {"address": result } : {"address": "none"})
}
