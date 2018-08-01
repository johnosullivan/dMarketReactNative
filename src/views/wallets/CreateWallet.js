import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

export default class CreateWallet extends Component {

   state = {
      walletPassword: '',
      walletRePassword: ''
   }
   handleWalletPassword = (text) => {
      this.setState({ walletPassword: text })
   }
   handleWalletRePassword = (text) => {
      this.setState({ walletRePassword: text })
   }
   generate = (walletPassword, walletRePassword) => {


   }
   render() {

    return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Wallet Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleWalletPassword}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Wallet Password Retype"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleWalletRePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.generate(this.state.walletPassword, this.state.walletRePassword)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      );
  }
}
