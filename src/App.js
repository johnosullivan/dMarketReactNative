import './../shim.js'
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native'
import * as lightwallet from 'eth-lightwallet';
import Web3 from 'web3';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/'));
console.log(Web3);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      keystore: false,
      mnemonic: null,
      address: '',
      generating: false,
      restoring: false,
      restoreMnemonic: ''
    }

    this.password = "Simple Secret Wallet Unlock Password Which Needs To Be Stored Here"
    this.keystore = null
  }

  componentWillMount() {
    this._loadKeystore()

    const balance = web3.eth.getBalance('0x1aCc2977D4C4C8AcF2e87840ea1432248AEfeEA7', (err2, balance) => {
       console.log('Balance ' + balance);
       this.setState({balance: 'Balance: ' + balance});
    });
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

  _loadKeystore = async () => {
    try {
      const keystore = await AsyncStorage.getItem('WalletKeystore')
      if (!keystore) return

      const ks = await lightwallet.keystore.deserialize(keystore)
      if (keystore) this.setState({
        keystore: true,
        generating: false,
        address: ks.addresses[0]
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

    const mnemonic = lightwallet.keystore.generateRandomSeed('insert random entropy generation')

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

  render() {
    console.log("Current_State: ", this.state);
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03256C',
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
})
