import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import TransactionListItem from '../components/TransactionListItem'

export default class Transactions extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { wallet } = this.props
    const shortenedTxHash = wallet.txHash.slice(0, 8).concat(['...']).concat(wallet.txHash.slice(wallet.txHash.length - 4))
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={() => {
          this.props.navigation.navigate(
            'Details',
            { title: wallet.title, img: wallet.img, id: wallet.imdbID })
        }}
        style={styles.transaction}
      >
        <View style={styles.transactionColumn}>
          <View>
            <Text style={styles.nickname}>Date: {wallet.dateString}</Text>
            <Text>Timestamp: {wallet.timeStamp}</Text>
            <Text style={styles.address}>Shortened Tx Hash: {shortenedTxHash}</Text>
            <Text>Type: {wallet.type}</Text>
            <Text>Value: {wallet.value}</Text>
            <Text>My address: {wallet.type === 'outgoing' ? wallet.fromAddress : wallet.toAddress}</Text>
            <Text>other address: {wallet.type === 'outgoing' ? wallet.toAddress : wallet.fromAddress}</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Button title='' onPress={() => this.props.screenProps.writeToClipboard(wallet.txHash, 'Transaction hash')}></Button>
          </TouchableOpacity>
        </View>
      </TouchableHighlight >
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
