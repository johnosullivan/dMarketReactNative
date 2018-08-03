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
   }
});


export default class CreateWallet extends Component {

  state = {
     walletPassword: '',
     walletRePassword: '',
     generating: false,
     isVisible: false
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
         // Create wallet here!!!!!
         self.props.created("trim bacon account saddle spend spoil festival maze fit reward august elder");
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
            placeholder = "Wallet Password Retype"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            secureTextEntry = {true}
            onChangeText={(text) => this.setState({ walletRePassword:text })}/>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = { () => this.generate() }>
          <Text style = {styles.submitButtonText}> Generate Wallet </Text>
          </TouchableOpacity>
       </View>
     );
   }

   generateOpt = () => { Transition.show(this.generateView()); };

   render() {
      return (
         <View style = {styles.container}>
            <Loader loading={this.state.generating} />
            <View style = {styles.container_img}>
            <Image source={require('../../../assets/wallet.png')} style = {styles.image} />
            </View>

            {this.generateView()}
            {/*
            <Transition>
            <View>
            <Button title='Generate Wallet'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            buttonStyle={{
              backgroundColor: "#5aaba1",
            }}
            onPress = {
               () => this.generateOpt()
            }/>

            <Button title='Restore Wallet'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            buttonStyle={{
              backgroundColor: "#5aaba1",
            }}/>

            <Button title='Import Wallet'
            raised={false}
            style={{
              padding: 10,
              paddingTop: 20
            }}
            buttonStyle={{
              backgroundColor: "#5aaba1",
            }}/>
            </View>
            </Transition>
            */}




            <Overlay
            fullScreen={false}
            isVisible={this.state.isVisible}
            height={270}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingBottom: 5
            }}>What is a Ethereum Wallet?</Text>
            <Text>Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. The Ethereum Wallet is a gateway to decentralized applications on the Ethereum blockchain. It allows you to hold and secure ether and other crypto-assets built on Ethereum, as well as write, deploy and use smart contracts.</Text>

  <TouchableOpacity
     style = {styles.submitButton}
     onPress = {
        () => this.setState({isVisible: false})
     }>
     <Text style = {styles.submitButtonText}> Done </Text>
  </TouchableOpacity>

  </Overlay>
         </View>
       );
  }
}
