import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import './global';

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class App extends React.Component {

  onPressLearnMore = () => {
    web3.eth.getBlock('latest').then(console.log);
  }

  render() {
    // printing on the console the latest ethereum block
    return (
      <View style={styles.container}>
      <Button
  onPress={this.onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
        <Text>Check your console!</Text>
        <Text>You should find info on the latest ethereum block.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
