import React from 'react'

import { StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import { createStackNavigator } from 'react-navigation'

import SingleWallet from './SingleWallet'
import AllWallets from './AllWallets'

import { isWallet } from '../../utils/isAddress'

const WalletsNavigation = createStackNavigator({
  AllWallets: AllWallets,
  SingleWallet: SingleWallet
})

export default class WalletsRouter extends React.Component {
  static router = WalletsNavigation.router;
  constructor(props) {
    super(props)
  }

  deleteWallet = (wallet) => {
    console.log('this should delete a wallet')
  }

  render() {
    const { currentUser, errorMessage,
      theme, wallets, transactions,
      handleErrorMessage, addAddress } = this.props.screenProps
    return (
      <WalletsNavigation
        screenProps={{
          currentUser,
          errorMessage,
          theme,
          wallets,
          transactions,
          handleErrorMessage,
          addAddress
        }}
        navigation={this.props.navigation}
      />
    )
  }
}