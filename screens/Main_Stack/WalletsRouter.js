import React from 'react'

import { StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View, Clipboard } from 'react-native'

import { createStackNavigator } from 'react-navigation'

import SingleWallet from './SingleWallet'
import AllWallets from './AllWallets'
import SingleTransaction from './SingleTransaction'

const WalletsNavigation = createStackNavigator({
  AllWallets: AllWallets,
  SingleWallet: SingleWallet,
  SingleTransaction: SingleTransaction
})

export default class WalletsRouter extends React.Component {
  static router = WalletsNavigation.router;
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      currentUser, errorMessage,
      wallets, transactions,
      handleErrorMessage, addAddress, deleteAddress, writeToClipboard
    } = this.props.screenProps
    return (
      <WalletsNavigation
        screenProps={{
          currentUser,
          errorMessage,
          wallets,
          transactions,
          handleErrorMessage,
          addAddress,
          deleteAddress,
          writeToClipboard
        }}
        navigation={this.props.navigation}
      />
    )
  }
}