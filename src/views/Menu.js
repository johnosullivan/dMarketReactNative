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
    width: 200,
    height: 80,
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
      <Col style={{
        backgroundColor: 'red'
      }}></Col>
      <Col style={{
        backgroundColor: 'green'
      }}></Col>
      </Grid>

      </View>

    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
