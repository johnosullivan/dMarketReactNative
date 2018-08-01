import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      backgroundColor: "#5A8DAB",
      flex: 1
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#5aaba1',
      borderWidth: 1,
      borderRadius: 5,
      padding: 4,
      backgroundColor: "#fff",
   },
   submitButton: {
      backgroundColor: '#5aaba1',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 5,
      alignItems: 'center'
   },
   submitButtonText:{
      color: 'white'
   }
});

import Loader from '../../components/Loader';
import EtherWallet from '../../libs/EtherWallet';

export default class CreateWallet extends Component {

   state = {
     walletPassword: '',
     walletRePassword: '',
     generating: false
   };

   handleWalletPassword = (text) => {
     this.setState({ walletPassword: text })
   };
   handleWalletRePassword = (text) => {
     this.setState({ walletRePassword: text })
   };

   generate = (walletPassword, walletRePassword) => {
     console.log("walletPassword: ", walletPassword);
     console.log("walletRePassword: ", walletRePassword);

     this.setState({ generating: true });
     console.log(new EtherWallet());
     var self = this;
     setTimeout(function(){
       self.setState({ generating: false });
     }, 3000);
   };

   render() {
      console.log(Loader);
      return (
         <View style = {styles.container}>
         <Loader loading={this.state.generating} />
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Wallet Password"
               placeholderTextColor = "#5aaba1"
               autoCapitalize = "none"
               secureTextEntry = {true}
               onChangeText = {this.handleWalletPassword}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Wallet Password Retype"
               placeholderTextColor = "#5aaba1"
               autoCapitalize = "none"
               secureTextEntry = {true}
               onChangeText = {this.handleWalletRePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.generate(this.state.walletPassword, this.state.walletRePassword)
               }>
               <Text style = {styles.submitButtonText}> Create Wallet </Text>
            </TouchableOpacity>
         </View>
       );
  }
}
