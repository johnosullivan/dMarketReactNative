import * as lightwallet from 'eth-lightwallet';
import Web3 from 'web3';

import {
  web3ConnectionURL,
  seedEntropyPhrase
} from './Common'

import {
  AsyncStorage
} from 'react-native';

module.exports = class EtherWallet {
   constructor() {
     this.web3 = new Web3();
     this.web3.setProvider(new this.web3.providers.HttpProvider(web3ConnectionURL));
   }
   info() { }
}
