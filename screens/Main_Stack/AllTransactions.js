
import React from 'react'

import { StyleSheet, TouchableWithoutFeedback, FlatList, StatusBar, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import TransactionListItem from '../components/TransactionListItem'
import { Colors } from '../../design/Constants';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Transactions',
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white,
    },
    headerStyle: {
      backgroundColor: Colors.primary,
      color: Colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
  };

  navigateToSingleTransaction = (transaction) => {
    this.props.navigation.navigate(
      'SingleTransaction',
      { transaction: transaction, writeToClipboard: this.props.screenProps.writeToClipboard })
  }

  renderItem = (metaItem) => {
    const { item } = metaItem
    return (<TransactionListItem navigateToSingleTransaction={this.navigateToSingleTransaction} transaction={item} />)
  }

  render() {
    const { currentUser, errorMessage, transactions } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback style={{ height: 49, width: '100%', backgroundColor: Colors.primary }} onPress={() => this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}>
          <StatusBar
            backgroundColor={Colors.primary}
            barStyle="light-content"
          />
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
