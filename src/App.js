// Required for eth-lightwallet
var bluebird = require('bluebird');
//require('babel/polyfill');
import './../global';
import './../shim.js'
//import 'babel-preset-react-native-web3/globals';
//import Web3 from 'web3';

import Tx from 'ethereumjs-tx';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Modal,
  ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { createTransition, FlipX, Fade, FlipY, SlideLeft, SlideRight, SlideUp, SlideDown } from 'react-native-transition';

const Transition = createTransition(SlideLeft);

import * as lightwallet from 'eth-lightwallet';
import PubSub from 'pubsub-js';

import { logging } from './libs/Logger';

import TxRow from './components/TxRow';

import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from '../intro/introslides';

import { Header, List, ListItem, CheckBox, Icon  } from 'react-native-elements';

import SideMenu from 'react-native-side-menu';
import Menu from './views/Menu';

import CreateWallet from './views/wallets/CreateWallet';
import ShowSeed from './views/wallets/ShowSeed';

import SetupWallet from './views/wallets/SetupWallet';

import url from 'url';

class ContentView extends Component {
  render() {
    return (
      <View style={styles.container}>


      </View>
    );
  }
}

import abi from './abi.json';

import Web3 from 'web3';
const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
var web3 = new Web3(web3Provider);

const signing_user_public = "0x901473eE8ac77F0967aD3D0Ac2943d4f27668a7f";
const signing_user_private = "a3bcb5a37abe81976ac4facdbb36e21db62e811b9c7f7ad0f99950a472583940";
const contract_address = "0x0b25cdb672e214acb36b153f2625df92236ab349";

const request = async () => {
  console.log("TEST");

/*
  const transactionObject = {
    from: web3.eth.defaultAccount,
    gasLimit: web3.toHex(3007101),
    gasPrice: web3.toHex(3007101),
    to: contract_address,
    nonce: web3.toHex(c),
    data: data1
  };

  console.log("TransactionObject: ", transactionObject);

  const transaction = new Tx(transactionObject);
  transaction.sign(Buffer.from(signing_user_private, 'hex'));

  console.log("Signed Tx: ", '0x' + transaction.serialize().toString('hex'));
*/
};

async function logMetaData(){
    //let isListening = await web3.eth.net.isListening();
    //let numPeers = await web3.eth.net.getPeerCount();
    //console.log( "node " + infuraUrl + " listening: " + isListening.toString() + " with " + numPeers + " peers");
};

export default class App extends Component {



  constructor(props) {
    super(props)


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


    this.state = {
      applicationRunning: false,
      error: null,
      keystore: false,
      mnemonic: null,
      address: '',
      generating: false,
      restoring: false,
      restoreMnemonic: '',
      isOpen: true,
      isOpen: false,
      seedPhrase: 'trim bacon account saddle spend spoil festival maze fit reward august elder',
      modalVisible: false,
      dataSource: ds.cloneWithRows([{ss:""}, {}])
    }

    this.password = "mypassword2018"
    this.keystore = null


    this.toggleSideMenu = this.toggleSideMenu.bind(this);

    var mySubscriber = function (msg, data) {
      console.log( msg, data );
    };

    var token = PubSub.subscribe('MY TOPIC', mySubscriber);


    //var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'))

  }





  test = async () => {

    //console.log(Web3);
    //var contract = web3.eth.contract(abi).at(contract_address);
    //request();
    //console.log("web3: ", web3.isConnected());

    console.log(Web3.providers);
    let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))

    try {
      let netIsListening = await web3.eth.net.isListening();
      console.log('netIsListening: ', netIsListening);
    } catch (error) {
      console.log('error:', error);
    }

/*
    web3.eth.getBlock('latest', (err, block) => {
      console.log(block.number);
		});

    web3.eth.getBalance('0x3e1FC9c177413B5235A7Cad62FC60df2C8f4C6EB' ,(err, balance) => {
      console.log(balance);
		});

    web3.eth.getTransactionReceipt('0x401a1b0aaacc5f403071723fdd16357a8a31a8cc3bc8ee0360388f2a8fe25e18' ,(err, receipt) => {
      console.log(receipt);
		});

    web3.net.getListening((err, status) => {
      console.log(status);
		});


    console.log(abi);

    var contract = web3.eth.contract(abi).at(contract_address);
    */
    //request();
/*
const data1 = contract.setting.getData("john");
console.log(data1);
var c = web3.eth.getTransactionCount(signing_user_public);

const transactionObject = {
  from: web3.eth.defaultAccount,
  gasLimit: web3.toHex(3007101),
  gasPrice: web3.toHex(3007101),
  to: contract_address,
  nonce: web3.toHex(c),
  data: data1
};

console.log("TransactionObject: ", transactionObject);



const transaction = new Tx(transactionObject);
transaction.sign(Buffer.from(signing_user_private, 'hex'));

console.log("Signed Tx: ", '0x' + transaction.serialize().toString('hex'));
*/
    //console.log(web3.net.listening)
    //0x3e1FC9c177413B5235A7Cad62FC60df2C8f4C6EB


  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  toggleSideMenu () {
  this.setState({
    isOpen: !this.state.isOpen
  })
}

  componentWillMount() {


//console.log("connected: ", web3.isConnected());
  //web3.eth.getBlock('latest').then(console.log)
    //this.loadKeystore();
    //this._generateNewWallet();
    /*const balance = web3.eth.getBalance('0x1aCc2977D4C4C8AcF2e87840ea1432248AEfeEA7', (err2, balance) => {
       console.log('Balance ' + balance);
       this.setState({balance: 'Balance: ' + balance});
    });*/
  }

  _saveKeystore = async () => {
    try {
      await AsyncStorage.setItem('WalletKeystore', this.keystore.serialize())
      this._loadKeystore()
      this.setState({
        keystore: true,
        restoring: false
      })
    } catch (error) {
      // Error saving data
      this.setState({ error })
    }
  }

  loadKeystore = async () => {
    try {
      const keystore = await AsyncStorage.getItem('WalletKeystore')
      if (!keystore) return

      const ks = await lightwallet.keystore.deserialize(keystore)
      if (keystore) this.setState({
        keystore: true,
        generating: false,
        address: ks.addresses[0],
        ks: ks
      })

      this.keystore = ks
    } catch (error) {
      // Error loading data
      this.setState({ error })
    }
  }

  _deleteKeystore = async () => {
    try {
      await AsyncStorage.removeItem('WalletKeystore')
      this.keystore = null
      this.setState({ keystore: false })
    } catch (error) {
      // Error saving data
      this.setState({ error })
    }
  }

  _generateNewWallet = () => {
    this.setState({ generating: true })

    const mnemonic = lightwallet.keystore.generateRandomSeed('JKCGNQc7aewS5AhfGURWdXYfS4c1w7OxK7dxihFbFJpgT5lINDkqtRyMgFQz9sH')

    this.setState({ mnemonic })

    setTimeout(() => {
      this._generateWallet(mnemonic)
    }, 500)
  }

  _generateFromMnemonic = () => {
    const { restoreMnemonic } = this.state

    this.setState({
      generating: true,
      restoreMnemonic: ''
    })

    if (restoreMnemonic.split(' ').length != 12 || !lightwallet.keystore.isSeedValid(restoreMnemonic)) {
      this.setState({
        generating: false,
        restoring: false
      })
      return
    }

    setTimeout(() => {
      this._generateWallet(restoreMnemonic)
    }, 500)
  }

  _generateWallet = (seedPhrase) => {
    const { password } = this

    lightwallet.keystore.createVault({
      password,
      seedPhrase,
      hdPathString: "m/44'/60'/0'/0/0"
    }, (error, ks) => {
      if (error) {
        this.setState({ error })
        return
      }

      ks.keyFromPassword(password, (error, pwDerivedKey) => {
        if (error) {
          this.setState({ error })
          return
        }
        console.log("pwDerivedKey: ", pwDerivedKey);


        ks.generateNewAddress(pwDerivedKey, 1)

        var pri = ks.exportPrivateKey(ks.addresses[0], pwDerivedKey);
        console.log("pri", pri);

        this.keystore = ks
        this._saveKeystore()
      })
    })
  }

  _stateRestore = () => {
    this.setState({ restoring: true })
  }

  onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
        selectedItem: item,
      });

  switch = () => {
        Transition.show(
          <View style={{ flex: 1, alignItems: 'center', padding:50 }}>
            <Text>This is another view</Text>
            <Button title="Press to Switch" onPress={this.switchBack} />
          </View>
        );
      }

      switchBack = () => {
            Transition.show(
              <View style={{ flex: 1, alignItems: 'center', padding:50 }}>
                <Text>This the initial View</Text>
                <Button title="Press to Switch" onPress={this.switch} />
              </View>
            );
          }

  updateMenuState = (isOpen) => {
    this.setState({ isOpen });
  }

  isSetupAlready = () => {
    return true;
  }

  //Loads the SetupWallet either from seeds phrase or generate
  onDoneIntro = () => {
    Transition.show(
      <SetupWallet/>
    );
  }



  //Main view for the application
  mainApplicationView = () => {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
        <Header
          leftComponent={<TouchableOpacity>
  <Icon
    name='menu'
    underlayColor='rgba(255, 255, 255, .0)'
    style={styles.icon}
    color='white'
    onPress={() => this.toggleSideMenu()}
  />
</TouchableOpacity>}
rightComponent={
  <TouchableOpacity onPress={() => {
    this.setModalVisible(!this.state.modalVisible);
  }}>
    <Text style={{ color:'white' }}>TXS</Text>
  </TouchableOpacity>}
        />


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View>
          <Header
            backgroundColor="#65737e"
            centerComponent={{ text: 'My Transactions', style: { color: '#fff', fontSize: 15 } }}
            rightComponent={
              <TouchableOpacity>
                <Icon
                  name='close'
                  underlayColor='rgba(255, 255, 255, .0)'
                  style={styles.icon}
                  color='white'
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </TouchableOpacity>}
            leftComponent={
              <TouchableOpacity>
                <Icon
                  name='edit'
                  underlayColor='rgba(255, 255, 255, .0)'
                  style={styles.icon}
                  color='white'
                  onPress={() => {

                  }}
                />
              </TouchableOpacity>}
          />
          <View>

            </View>
          </View>
        </Modal>

        { /* Body of the transactions list */ }
{/*
      <ListView
        style={styles.container_list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TxRow {...rowData}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
*/}

<View style={styles.container}>
<Button title="Press to Switch" onPress={this.test} />
</View>
      </SideMenu>
    );
  }

  /*
  {
    icon: 'menu',
    color: '#fff',
    onPress: () => {
      this.toggleSideMenu();
    }
  }
  */

  //Intro view for the application
  introApplicationView = () => {
    return (
      <Transition>
        <AppIntroSlider slides={slides} onDone={this.onDoneIntro}/>
      </Transition>
    );
  }

  render() {
    logging("Application Current State: ", this.state);
    if (this.isSetupAlready()) {
      return this.mainApplicationView();
    } else {
      return this.introApplicationView();
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingLeft: 15,
    paddingRight: 15
  },
  container_list: {
    flex: 1,
    backgroundColor: '#eee',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  icon: {

  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
    marginBottom: 25
  },
  generateButton: {
    marginBottom: 25
  },
  restoreTextInput: {
    height: 40,
    width: 300,
    fontSize: 17,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderBottomWidth: 1
  }
});
