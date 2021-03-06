import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { Overlay, Button, Icon } from 'react-native-elements';
import { createTransition, FlipX, Fade, FlipY, SlideLeft, SlideRight, SlideUp, SlideDown } from 'react-native-transition';
//import { StackNavigator } from 'react-navigation';

import Loader from '../../components/Loader';
import EtherWallet from '../../libs/EtherWallet';
import PubSub from 'pubsub-js';

const Slide = {
  out: (value, bounds) => ({
    left: value.interpolate({
      inputValue: [0, 1],
      outputValue: [0, -bounds.width],
    }),
    width: bounds.width,
  }),
  in: (value, bounds) => ({
    left: value.interpolate({
      inputValue: [0, 1],
      outputValue: [bounds.width, 0],
    }),
    width: bounds.width,
  }),
};

import * as lightwallet from 'eth-lightwallet';

var Transition = createTransition(SlideLeft);

const styles = StyleSheet.create({
   container: {
      paddingTop: 25,
      paddingTop: 50,
      backgroundColor: "#5A8DAB",
      flex: 1
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#5aaba1',
      borderWidth: 0,
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
   },
   container_img: {
      backgroundColor: "#5A8DAB",
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20
   },
   image: {
     height: 155,
     width: 155
   },
   cancelButton: {
      backgroundColor: '#5A8DAB',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 5,
      alignItems: 'center'
   },
   cancelButtonText:{
      color: 'white'
   }
});


export default class CreateWallet extends Component {

  state = {
     walletPassword: '',
     walletRePassword: '',
     seedPhrase: '',
     generating: false,
     isVisible: true
  };

  invalidPassWordCom = () => {

  }

  generate = () => {
     if ((this.state.walletPassword == '') || (this.state.walletRePassword == '')) {
       this.invalidPassWordCom();
       return;
     }
     if (this.state.walletPassword == this.state.walletRePassword) {
       this.setState({ generating: true });
       var self = this;
       setTimeout(function(){
         self.setState({ generating: false });
         // Create wallet here!!!!
         const mnemonic = lightwallet.keystore.generateRandomSeed('insert random entropy generation')
         console.log("mnemonic: ", mnemonic);
         self.props.created(mnemonic);
       }, 3000);
     } else {
       this.invalidPassWordCom();
     }
   };

   generateView = () => {
     return (
       <View>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "New Wallet Password"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            secureTextEntry = {true}
            onChangeText={(text) => this.setState({ walletPassword:text })} />
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Wallet Password Again"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            secureTextEntry = {true}
            onChangeText={(text) => this.setState({ walletRePassword:text })}/>

          <Button title='Generate Wallet'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            titleStyle={{ fontWeight: "500", fontSize: 15 }}
            buttonStyle={{
              backgroundColor: "#5aaba1"
            }}
            onPress = {
               () => this.generate()
          }/>

          <TouchableOpacity
            style = {styles.cancelButton}
            onPress = { () => this.optionsOpt() }>
          <Text style = {styles.cancelButtonText}> Go Back </Text>
          </TouchableOpacity>
       </View>
     );
   }

   restoreView = () => {
     return (
       <View>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Seed Phrase"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            onChangeText={(text) => this.setState({ seedPhrase:text })} />


          <Button title='Restore Wallet'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            titleStyle={{ fontWeight: "500", fontSize: 16 }}
            buttonStyle={{
              backgroundColor: "#5aaba1"
            }}
            onPress = {
               () => this.generate()
          }/>

          <TouchableOpacity
            style = {styles.cancelButton}
            onPress = { () => this.optionsOpt() }>
          <Text style = {styles.cancelButtonText}> Go Back </Text>
          </TouchableOpacity>
       </View>
     );
   }

   allOptions = () => {
     return (
       <View>
       <Button title='Generate Wallet'
       raised={false}
       style={{
         padding: 10
       }}
       titleStyle={{ fontWeight: "500", fontSize: 16 }}
       buttonStyle={{
         backgroundColor: "#5aaba1"
       }}
       onPress = {
          () => this.generateOpt()
       }/>

       <Button title='Restore Wallet'
       raised={false}
       style={{
         padding: 10
       }}
       titleStyle={{ fontWeight: "500", fontSize: 16 }}
       buttonStyle={{
         backgroundColor: "#5aaba1",
       }}
       onPress = {
          () => this.restoreOpt()
       }/>

       <Button title='Import Wallet'
       raised={false}
       style={{
         padding: 10
       }}
       titleStyle={{ fontWeight: "500", fontSize: 16 }}
       buttonStyle={{
         backgroundColor: "#5aaba1",
       }}/>
       </View>
     );
   }

   generateOpt = () => {
     Transition.show(
       this.generateView(),
       SlideLeft
     );
   };

   optionsOpt = () => {
     Transition.show(
       this.allOptions(),
       SlideRight
     );
   }

   restoreOpt = () => {
     Transition.show(
       this.restoreView(),
       SlideLeft
     );
   }

   render() {
      return (
         <View style = {styles.container}>
            <Loader loading={this.state.generating} />
            <View style = {styles.container_img}>
            <Image source={require('../../../assets/wallet.png')} style = {styles.image} />
            </View>


            <Transition>
            { this.allOptions() }
            </Transition>





            <Overlay
            fullScreen={false}
            isVisible={this.state.isVisible}
            height={290}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingBottom: 5
            }}>What is a Ethereum Wallet?</Text>
            <Text>Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. The Ethereum Wallet is a gateway to decentralized applications on the Ethereum blockchain. It allows you to hold and secure ether and other crypto-assets built on Ethereum, as well as write, deploy and use smart contracts.</Text>

            <Button title='Dismiss'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            titleStyle={{ fontWeight: "400", fontSize: 15 }}
            buttonStyle={{
              backgroundColor: "#5aaba1",
            }}
            onPress = {
               () => this.setState({isVisible: false})
            }/>


  </Overlay>
         </View>
       );
  }
}
