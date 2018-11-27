import React from 'react'

import { StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

export default class SingleWallet extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  };
  render() {
    const wallet = this.props.navigation.getParam('wallet', 'wallet') // second param is its default value (string)
    return (
      <View style={styles.walletColumns}>
        <View>
          <Text style={styles.nickname}>{wallet.nickname}{wallet.updated && ' updated!'}{wallet.transactions && ' (' + wallet.transactions.length + ')'}</Text>
          <Text style={styles.address}>{wallet.address}</Text>
          <Text style={styles.address}>{wallet.webhookId && wallet.webhookId}</Text>
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <View onPress={() => console.log('this should copy the wallets address')}></View>
        </TouchableOpacity>
      </View>

    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    padding: 8,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 40
  },
  walletDoneFetching: {
    padding: 10,
    // backgroundColor: 'lightgreen',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: -1
  },
  walletStillFetching: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: -1
  },
  walletColumns: {
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
