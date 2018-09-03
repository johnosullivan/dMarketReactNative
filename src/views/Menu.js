import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

import Web3 from 'web3';
const web3Provider = new Web3.providers.HttpProvider('http://167.99.150.226:8545');
var web3 = new Web3(web3Provider);

import { List, ListItem } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#fff',
  },
  sideheader: {
    height: 69,
    backgroundColor: '#b5c3cb',
    shadowColor: 'black',
    shadowOpacity: 2.0
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
});

/*
<Text
  onPress={() => onItemSelected('About')}
  style={styles.item}
>
  About
</Text>
*/

export default class Menu extends Component {

  state = {
    blockNumber: 0,
    names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12}
      ]
  };

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    var self = this;
    this._interval = setInterval(async () => {
      // Your code
      console.log('ping');
      try {
        let netIsListening = await web3.eth.net.isListening();
        let block = await web3.eth.getBlock('latest');
        console.log('netIsListening: ', netIsListening);
        console.log('block: #', block.number);
        this.setState({ blockNumber: block.number });
      } catch (error) {
        console.log('error:', error);
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.menu}>
        <View style={styles.sideheader}>

        <Grid>
        <Row style={{
          height: 25
        }}></Row>

        <Row style={{ }}>

        <Col style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4
        }}>

        <Text numberOfLines={1} ellipsizeMode='middle' style={{
          fontWeight: '700',
          width: (width * 0.65)
        }}>0x901473eE8ac77F0967aD3D0Ac2943d4f27668a7f</Text>

        </Col>

        </Row>

        <Row>

        <Col style={{
          padding: 5,
          justifyContent: 'center',
          width: 20,
        }}>

        <View style={ {
        width: 10,
        height: 10,
        borderRadius: 100/2,
        backgroundColor: 'green'
        }} />
        </Col>

        <Col style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>

        <Text style={{
          fontWeight: '400'
        }}> #{ this.state.blockNumber }</Text>

        </Col>


        </Row>
        </Grid>

        </View>

        <ScrollView style = {{ paddingTop: 4 }}>
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {{
                         flexDirection: 'row',
                         justifyContent: 'space-between',
                         alignItems: 'center',
                         padding: 10,
                         margin: 2,
                         borderColor: '#2a4944',
                         borderWidth: 1,
                         backgroundColor: '#eee',
                         width: (width * 0.65)
                      }}>
                        <Text>{item.name}</Text>
                     </View>
                  ))
               }
            </ScrollView>


      </View>
    );
  }

}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
