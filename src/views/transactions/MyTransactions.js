import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';

import { 
  Header, 
  List, 
  ListItem, 
  CheckBox, 
  Icon  
} from 'react-native-elements';

import { Col, Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
    container: {
       padding: 23,
       paddingTop: 50,
       backgroundColor: "#5A8DAB",
       flex: 1,
    }
});

export default class MyTransactions extends Component {

    state = {
        txs: [
           { 
               "txHash": "0x392c01d11d692908c5d899fa4ddb091e2f641524163c21f1c74fc0229b565e86",
               "gasUsed": "21000",
               "mineDate": "Sep-08-2018 10:43:55 PM +UTC",
               "blockNumber": "6296691",
               "toAddress": "0x689c56aef474df92d44a1b70850f808488f9769c",
               "id": 2849273,
               "status": 1
           },
           { 
                "txHash": "0x392c01d11d692908c5d899fa4ddb091e2f641524163c21f1c74fc0229b565e86",
                "gasUsed": "21000",
                "mineDate": "Sep-08-2018 10:43:55 PM +UTC",
                "blockNumber": "6296691",
                "toAddress": "0x689c56aef474df92d44a1b70850f808488f9769c",
                "id": 284935273,
                "status": 1
            }
        ]
    }

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
                <ScrollView style = {{ paddingTop: 4 }}>
                {
                  this.state.txs.map((item, index) => (
                     <View key = {item.id}
                        style = {{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            margin: 2,
                            backgroundColor: '#eee'
                    }}>

                    <Grid>

                        <Row>
                        <Text numberOfLines={1} ellipsizeMode='middle' style = {{
                        fontWeight: '600',
                        color: (item.status ? 'green' : 'red')
                        }}>TxHash: {item.txHash}</Text>
                        </Row>

                        <Row>
                        <Col>
                        <Text style = {{
                        fontWeight: '500',
                        }}>Block #: {item.blockNumber}</Text>
                        </Col>
                        <Col>
                        <Text style = {{
                        fontWeight: '500',
                        }}>Gas Used: {item.gasUsed}</Text>
                        </Col>
                        </Row>

                        <Row>
                        <Text numberOfLines={1} ellipsizeMode='middle' style = {{
                        fontWeight: '400',
                        }}>Address: {item.toAddress}</Text>
                        </Row>

                    </Grid>

                     </View>
                  ))
                }
                </ScrollView>
            </View>
        )
    }

}