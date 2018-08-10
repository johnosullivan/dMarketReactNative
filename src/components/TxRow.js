import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10
    },
  text: {
    fontSize: 12,
    fontWeight: "600"
  },
  text_des: {
    paddingLeft: 0,
    paddingTop: 10,
    fontSize: 12
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  success: {
    color: 'green',
    fontWeight: "800"
  },
  failed: {
    color: 'red',
    fontWeight: "800"
  }
});

const TxRow = (props) => (
  <View style={styles.container}>
      <Text style={styles.text}>0xde8d067f010c087e8cac64098ff079b461da93de4250dcb4e0107973a46466bc</Text>
      <Text style={styles.text_des}>Status: <Text style={styles.success}>Success</Text> GasUsed: 767682</Text>
      <Text style={styles.text_des}>{ JSON.stringify(props) }</Text>
  </View>
);

export default TxRow;
