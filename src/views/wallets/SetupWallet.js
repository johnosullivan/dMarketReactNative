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

import ShowSeed from './ShowSeed';
import CreateWallet from './CreateWallet';

import { StackNavigator } from 'react-navigation';
import { createTransition, FlipX, Fade, FlipY, SlideLeft, SlideRight, SlideUp, SlideDown } from 'react-native-transition';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 0,
      backgroundColor: "black"
   }
});

const Transition = createTransition(SlideLeft);

export default class SetupWallet extends Component {

   state = { };

   created = (seedPhrase) => {
     Transition.show(
       <ShowSeed seedPhrase={seedPhrase}/>
     );
   }

   render() {
      return (
         <View style = {styles.container}>
          <Transition>
            <CreateWallet created={this.created}/>
          </Transition>
         </View>
      );
  }
}
