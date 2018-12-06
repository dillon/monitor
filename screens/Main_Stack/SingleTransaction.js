import React from 'react'

import { StyleSheet, Alert, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TransactionListItem from '../components/TransactionListItem'

import { Colors } from '../../design/Constants'

import shortenHash from '../../utils/shortenHash'


export default class SingleTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  static navigationOptions = ({ navigation }) => {
    const transaction = navigation.getParam('transaction', 'transaction')
    return {
      title: shortenHash(transaction.txHash) || 'transaction',
      headerStyle: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        color: Colors.white,
      },
    };
  };

  render() {
    const transaction = this.props.navigation.getParam('transaction', 'transaction')
    transaction.shortenedTxHash = shortenHash(transaction.txHash)
    return (
      <View><Text>{transaction.txHash}</Text></View>
    )
  }

}