import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import moment from 'moment'
import Swipeout from 'react-native-swipeout';

import shortenHash from '../../utils/shortenHash'

import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../design/Constants';

export default class Transactions extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { wallet, deleteAddress, navigateToSingleWallet } = this.props
    const swipeoutBtns = [{ text: 'Delete', backgroundColor: Colors.red, color: Colors.white, onPress: () => deleteAddress(wallet.address) }]
    return (
      <View style={styles.walletContainer}>
        <Swipeout backgroundColor={Colors.white} right={swipeoutBtns} style={{ borderRadius: 5 }}>
          <TouchableHighlight
            underlayColor='#ddd'
            onPress={() => navigateToSingleWallet(wallet)}
            style={wallet.isFetchingTransactions ? styles.walletStillFetching : styles.walletDoneFetching}
          >
            <View style={styles.walletColumns}>
              <View>
                <Text style={styles.nickname}>{wallet.nickname}</Text>
                <Text style={styles.value}>{wallet.balance && wallet.balance.toFixed(8) || 0} <Text style={{color:Colors.grey}}> ETH</Text></Text>
                <Text style={styles.address}>{wallet.address}</Text>
                {/* <Text style={styles.address}>{wallet.webhookId && wallet.webhookId}</Text> */}
              </View>
              <FeatherIcon name='chevron-right' size={20} color={Colors.grey} />
            </View>
          </TouchableHighlight >
        </Swipeout>
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
  walletContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
  },
  walletDoneFetching: {
    padding: 10,
    marginBottom: -1,
    // borderRadius: 5,
  },
  walletStillFetching: {
    backgroundColor: Colors.grey,
    // borderRadius: 5,
    padding: 10,
    marginBottom: -1,
  },
  walletColumns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  nickname: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black
  },
  value: {
    fontSize: 30,
  },
  address: {
    fontSize: 11,
    color: Colors.grey
  },
  copyButton: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    borderColor: Colors.grey,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  },
  showAddAddressButton: {
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
