import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  /*
  this.state = {
    showRealApp: false
  }*/
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    //this.setState({ showRealApp: true });
    console.log("Done With Setup");
  }
  render() {
    /*if (this.state.showRealApp) {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      );
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
    }*/
    return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
  }
}
