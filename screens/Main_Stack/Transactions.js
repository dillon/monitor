import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import TransactionListItem from '../components/TransactionListItem'
import { Colors } from '../../design/Constants';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderItem = (metaItem) => {
    const { item } = metaItem
    return (<TransactionListItem navigation={this.props.navigation} item={item} showNickName={true} />)
  }

  render() {
    const { currentUser, errorMessage, transactions, wallets, handleSignOut, addAddress } = this.props.screenProps
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
            style={{ flex: 1 }}
            data={transactions}
            renderItem={this.renderItem}
            keyExtractor={(tx, i) => tx.txHash + i}
            backgroundColor={Colors.white}
          >

          </FlatList>
        }
        {!transactions &&
          <View style={{ backgroundColor: Colors.white }} />
        }
      </View>
    )
  }
}
