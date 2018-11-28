import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'


export default class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderItem = (metaItem) => {
    const { item } = metaItem
    const shortenedTxHash = item.txHash.slice(0, 8).concat(['...']).concat(item.txHash.slice(item.txHash.length - 4))
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={() => {
          this.props.navigation.navigate(
            'Details',
            { title: item.title, img: item.img, id: item.imdbID })
        }}
        style={styles.transaction}
      >
        <View style={styles.transactionColumn}>
          <View>
            <Text style={styles.nickname}>Date: {item.dateString}</Text>
            <Text>Timestamp: {item.timeStamp}</Text>
            <Text style={styles.address}>Shortened Tx Hash: {shortenedTxHash}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Value: {item.value}</Text>
            <Text>My address: {item.type === 'outgoing' ? item.fromAddress : item.toAddress}</Text>
            <Text>other address: {item.type === 'outgoing' ? item.toAddress : item.fromAddress}</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Button title='' onPress={() => this.props.screenProps.writeToClipboard(item.txHash, 'Transaction hash')}></Button>
          </TouchableOpacity>
        </View>
      </TouchableHighlight >
    )
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

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 40
  },
  transaction: {
    padding: 10,
    // backgroundColor: 'lightgreen',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: -1
  },
  transactionColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  nickname: {
    fontSize: 12,
  },
  address: {
    fontSize: 10,
    color: 'darkgrey'
  },
  copyButton: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: '#aaccff',
    borderColor: 'darkgrey',
    borderWidth: 1
  }
})
