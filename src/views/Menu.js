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

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

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
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
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
    blockNumber: 0
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
          height: 20
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
          width: (width * 0.65) + 2
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

      </View>
    );
  }

}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
