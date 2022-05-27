import { chain } from '../config/config.js';
const { exec } = require("child_process");

export function chainCommand(parameters) {
  const command = "multichain-cli " + chain.concat(parameters).join(' ');
  console.log("Command: " + command);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) =>  {
      resolve([stdout, stderr, error]);
    });
  });
}

export function chainDaemon(parameters) {
  const command = "multichaind " + chain.concat(parameters).join(' ');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) =>  {
      resolve([stdout, stderr, error]);
    });
  });
}
