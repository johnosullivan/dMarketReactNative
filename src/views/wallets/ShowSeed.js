import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import SeedView from '../../components/SeedView';

const styles = StyleSheet.create({
   container: {
      padding: 23,
      backgroundColor: "#5A8DAB",
      flex: 1
   },
   seed: {
      backgroundColor: "#ccc",
      padding: 5,
      height: 30
   },
   tag: {
      padding: 0
   }
});

import Loader from '../../components/Loader';

import PubSub from 'pubsub-js';

export default class ShowSeed extends Component {

   state = {
     seedPhrase: 'trim bacon account saddle spend spoil festival maze fit reward august elder',
     emails: [],
     text: " "
   };

   render() {

      const seeds = this.state.seedPhrase.split(" ");

      return (
         <View style = {styles.container}>

         <SeedView
 value={seeds}
 onChange={(emails) => this.setState({ emails })}
 labelExtractor={(email) => email}
 text={this.state.text}
 editable={false}
 tagContainerStyle={styles.seed}
 tagTextStyle={styles.tag}
 onChangeText={(text) => this.setState({ text })}
/>

         </View>
      );
  }
}
