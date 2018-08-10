const Web3 = require('Web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));

console.log("connected: ", web3.isConnected());
