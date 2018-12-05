import React from 'react'

import { StyleSheet, TouchableWithoutFeedback, FlatList, StatusBar, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

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
    const { currentUser, errorMessage, transactions, wallets, handleSignOut, handleDeleteAccount, addAddress } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>
        <StatusBar
          backgroundColor={Colors.primary}
          barStyle="light-content"
        />
        <TouchableWithoutFeedback style={{ height: 40, width: '100%', backgroundColor: Colors.primary }} onPress={() => this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}>
          <View style={{ height: 40, width: '100%', backgroundColor: Colors.primary }}></View>
        </TouchableWithoutFeedback>
        {errorMessage &&
          <Text style={{ color: 'red' }}>
            {errorMessage}
          </Text>}
        {transactions &&
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
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
          <View style={{ backgroundColor: Colors.white, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.darkGrey }}>...you have no transactions</Text>
          </View>
        }
      </View>
    )
  }
}
