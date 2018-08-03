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

import SeedView from '../../components/SeedView';

const styles = StyleSheet.create({
   container: {
      padding: 23,
      paddingTop: 50,
      backgroundColor: "#5A8DAB",
      flex: 1,
   },
   container_img: {
      backgroundColor: "#5A8DAB",
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10
   },
   seed: {
      backgroundColor: "#5aaba1",
      padding: 5,
      height: 30
   },
   tag: {
      padding: 0,
      fontWeight: 'bold'
   },
   doneButton: {
      backgroundColor: '#5aaba1',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 5,
      alignItems: 'center'
   },
   doneButtonText:{
      color: 'white'
   },
   image: {
     height: 155,
     width: 155
   }
});

import Loader from '../../components/Loader';

import PubSub from 'pubsub-js';

export default class ShowSeed extends Component {

   state = {
     seedPhrase: this.props.seedPhrase,
     seedWords: [],
     text: " "
   };

   done = () => {

   }

   render() {

      console.log("props: ", this.props);

      /*
      <Text style={{
        color: 'red',
        fontWeight: 'bold'
      }}>
        Please write these words down on a peice of paper and put
        it in a safe place. This seed phrase will allow you to recover your wallet
        in the future. If you lose this seed phrase your wallet funds and its contracts
        will be lost forever.
      </Text>
      */

      const seeds = this.state.seedPhrase.split(" ");

      return (
        <View style = {styles.container}>

        <View style = {styles.container_img}>
        <Image
          source={require('../../../assets/shield.png')}
          style = {styles.image}
        />

        </View>

        <Text style={{
          color: 'white',
          fontWeight: 'bold'
        }}> Seed Phrase </Text>

        <SeedView
 value={seeds}
 onChange={(seedWords) => this.setState({ seedWords })}
 labelExtractor={(word) => word}
 text={this.state.text}
 editable={false}
 tagTextColor="white"
 tagContainerStyle={styles.seed}
 tagTextStyle={styles.tag}
 onChangeText={(text) => this.setState({ text })}
/>

<TouchableOpacity
   style = {styles.doneButton}
   onPress = {
      () => this.done()
   }>
   <Text style = {styles.doneButtonText}> Finish </Text>
</TouchableOpacity>

         </View>
      );
  }
}
