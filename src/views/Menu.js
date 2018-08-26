import React from 'react';
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
    width: 250,
    height: 69,
    backgroundColor: '#b5c3cb'
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

export default function Menu({ onItemSelected }) {

  console.log(this);

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
        alignItems: 'center',
        padding: 5
      }}>

      <Text numberOfLines={1} ellipsizeMode='middle' style={{
        fontWeight: '700'
      }}>0x901473eE8ac77F0967aD3D0Ac2943d4f27668a7f</Text>

      </Col>

      </Row>

      <Row>

      <Col style={{
        padding: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 25
      }}>

      <View style={ {
      width: 12,
      height: 12,
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
      }}> #32562475</Text>

      </Col>

      </Row>
      </Grid>

      </View>

    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
