// Required for eth-lightwallet
import './../shim.js'
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
  Animated
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { createTransition, FlipX, Fade, FlipY, SlideLeft, SlideRight, SlideUp, SlideDown } from 'react-native-transition';

const Brooom = {
  out: (value, bounds) => ({
    left: value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -bounds.width],
    }),
    width: bounds.width,
    transform: [{
      skewX: value.interpolate({
        inputRange: [0, 0.1, 0.9, 1],
        outputRange: ["0deg", "-20deg", "-20deg", "0deg"],
      }),
    }],
  }),
  in: (value, bounds) => ({
    left: value.interpolate({
      inputRange: [0, 1],
      outputRange: [bounds.width, 0],
    }),
    width: bounds.width,
    transform: [{
      skewX: value.interpolate({
        inputRange: [0, 0.1, 0.9, 1],
        outputRange: ["0deg", "-20deg", "-20deg", "0deg"],
      }),
    }],
  }),
};

const Transition = createTransition(SlideLeft);

import * as lightwallet from 'eth-lightwallet';
import PubSub from 'pubsub-js';

//import Web3 from 'web3';
//const web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/'));
//console.log(Web3);

import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from '../intro/introslides';

import { Header, List, ListItem  } from 'react-native-elements';

import SideMenu from 'react-native-side-menu';
import Menu from './views/Menu';

import CreateWallet from './views/wallets/CreateWallet';
import ShowSeed from './views/wallets/ShowSeed';

import SetupWallet from './views/wallets/SetupWallet';

class ContentView extends Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
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
      seedPhrase: 'trim bacon account saddle spend spoil festival maze fit reward august elder'
    }

    this.password = "mypassword2018"
    this.keystore = null


    this.toggleSideMenu = this.toggleSideMenu.bind(this);

    var mySubscriber = function (msg, data) {
      console.log( msg, data );
    };

    var token = PubSub.subscribe('MY TOPIC', mySubscriber);
  }

  toggleSideMenu () {
  this.setState({
    isOpen: !this.state.isOpen
  })
}

  componentWillMount() {
    this.loadKeystore();
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

  onDoneIntro = () => {
    Transition.show(
      <SetupWallet/>
    );
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

  render() {
    console.log("Application Current State: ", this.state);
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;





    return (
      <View>

      </View>
    );
/*

<SideMenu menu={menu} isOpen={this.state.isOpen}>
<Header
  leftComponent={{
    icon: 'menu',
    color: '#fff',
    onPress: () => {
      this.toggleSideMenu();
    }
  }}

/>
  <ContentView/>
</SideMenu>

centerComponent={{ text: 'dMarket', style: {
   color: '#fff',
   fontWeight: "500",
   fontSize: 17
} }}
    return (
      <Transition>
        <SetupWallet/>
      </Transition>
    );*/

    //return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
    //<ShowSeed seedPhrase={this.state.seedPhrase}/>
    /*
    */

    /*
    <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'dMarket', style: { color: '#fff' } }}
    />
    return (
      <View style={styles.container}>
        { !this.state.keystore ?
          <View>
            { !this.state.generating ?
              <View>
                { !this.state.restoring ?
                  <View>
                    <View style={styles.generateButton}>
                      <Button
                        onPress={this._generateNewWallet}
                        title="Generate New Wallet"
                        accessibilityLabel="Click to generate wallet"
                      />
                    </View>
                    <Button
                      onPress={this._stateRestore}
                      title="Restore Existing Wallet"
                      accessibilityLabel="Click to restore wallet from nmemonic"
                    />
                  </View>
                  :
                  <View>
                    <TextInput
                      style={{height: 40, width: 300, color: 'white', borderColor: 'white', borderBottomWidth: 1}}
                      autoFocus={true}
                      onChangeText={(restoreMnemonic) => this.setState({ restoreMnemonic })}
                      onSubmitEditing={this._generateFromMnemonic}
                      value={this.state.restoreMnemonic}
                    />
                  </View>
                }
              </View>
              :
              <Text style={styles.text}>
                {(this.state.restoring) ? 'Restoring' : 'Generating' } wallet...
              </Text>
            }
          </View>
          :
          <View>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              Keystore loaded...
            </Text>
            <Text style={[styles.text, {fontSize: 14, marginBottom: 20}]}>
                Address: {'\n'}
                {this.state.address}
            </Text>
            { this.state.mnemonic ?
              <View>
                <Text style={[styles.text, {fontSize: 12, marginBottom: 10, fontWeight: 'bold'}]}>
                    Safely copy and paste or screenshot mnemonic below:
                </Text>
                <Text selectable={true} style={[styles.text, {fontSize: 14}]}>
                    {this.state.mnemonic}
                </Text>
              </View>
              : null
            }
            <Button
              onPress={this._deleteKeystore}
              title="Delete Wallet"
              accessibilityLabel="Click to delete wallet"
            />
          </View>
        }
      </View>
    )*/
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
