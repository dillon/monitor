import React from 'react'

import { StyleSheet, TouchableWithoutFeedback, FlatList, StatusBar, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import { createStackNavigator } from 'react-navigation';

import AllTransactions from './AllTransactions';
import SingleTransaction from './SingleTransaction';

const TransactionsNavigation = createStackNavigator({
  AllTransactions: AllTransactions,
  SingleTransaction: SingleTransaction
})

export default class TransactionsRouter extends React.Component {
  static router = TransactionsNavigation.router;
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      currentUser, errorMessage,
      transactions
    } = this.props.screenProps
    return (
      <TransactionsNavigation
        screenProps={{
          currentUser,
          errorMessage,
          transactions,
        }}
        navigation={this.props.navigation}
      />
    )
  }
}