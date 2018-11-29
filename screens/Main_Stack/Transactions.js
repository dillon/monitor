import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import TransactionListItem from '../components/TransactionListItem'

export default class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderItem = (metaItem) => {
    const wallet = metaItem.item
    return (<TransactionListItem navigation={this.props.navigation} wallet={wallet}/>)
  }

  render() {
    const { currentUser, errorMessage, theme, wallets, transactions, handleSignOut, addAddress } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>
        {errorMessage &&
          <Text style={{ color: 'red' }}>
            {errorMessage}
          </Text>}
        {transactions &&
          <FlatList
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ flex: 1, borderColor: 'blue', borderWidth: 1, marginTop: 40 }}
            data={transactions}
            renderItem={this.renderItem}
            keyExtractor={(tx, i) => tx.txHash + i}
          >
          </FlatList>
        }
      </View>
    )
  }
}
