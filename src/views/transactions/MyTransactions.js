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

import { 
  Header, 
  List, 
  ListItem, 
  CheckBox, 
  Icon  
} from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
       padding: 23,
       paddingTop: 50,
       backgroundColor: "#5A8DAB",
       flex: 1,
    }
});

export default class MyTransactions extends Component {

    render() {
        return (
            <View>
                <Header
                    centerComponent={{ text: 'My Transactions', style: { color: '#fff', fontSize: 15 } }}
                    rightComponent={
                        <TouchableOpacity>
                        <Icon
                            name='close'
                            underlayColor='rgba(255, 255, 255, .0)'
                            style={styles.icon}
                            color='white'
                            onPress={() => {
                                this.props.dissmisModel();
                            }}
                        />
                        </TouchableOpacity>}
                    leftComponent={
                        <TouchableOpacity>
                        <Icon
                            name='edit'
                            underlayColor='rgba(255, 255, 255, .0)'
                            style={styles.icon}
                            color='white'
                            onPress={() => {
  
                            }}
                        />
                        </TouchableOpacity>
                    }
                />
                <View>
                    { /*  */ }
                </View>
            </View>
        )
    }

}