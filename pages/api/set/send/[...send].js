// Sends coins to an address, usage /send/address/amount
import { server } from '../../../../config/config.js';
const chainCommand = require('../../../../utils/chainCommand.js').chainCommand;

export default async function handler(req, res) {
  const { send } = req.query;
  const address = send[0];
  const amount = send[1];
  fetch(server + "/api/get/address")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const myaddress = data;
    chainCommand(["sendfrom", myaddress.address, address, amount])
    .then(result => {
      console.log(result);
      res.status(200).end(result[0]);
    })
  })
}
