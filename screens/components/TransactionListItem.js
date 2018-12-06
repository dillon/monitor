import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import moment from 'moment'

import shortenHash from '../../utils/shortenHash'

import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../../design/Constants';


export default class Transactions extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { transaction, showNickName, navigateToSingleTransaction } = this.props
    const date = parseInt(moment().diff(transaction.dateString, 'months')) <= 0 ? moment(transaction.dateString).fromNow() : moment(transaction.dateString).calendar();
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={() => navigateToSingleTransaction(transaction)}
        style={styles.transaction}
      >
        <View style={styles.transactionColumn}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.iconFrame}>
              {transaction.type === 'incoming'
                ?
                <View style={{ paddingBottom: 1, paddingLeft: 1 }}>
                  <Icon name='download' size={15} color={Colors.darkGrey} />
                </View>
                :
                <View style={{ paddingBottom: 1, paddingLeft: 1 }}>
                  <Icon name='upload' size={15} color={Colors.darkGrey} />
                </View>
              }
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={transaction.type === 'incoming' || transaction.value == 0 ? { color: Colors.green } : { color: Colors.red }}>
                {(transaction.type === 'outgoing' && transaction.value != 0) && '-'}{parseFloat(transaction.value.toFixed(8))} <Text style={{ fontWeight: '600', color: Colors.grey }}>ETH</Text>
              </Text>
              {showNickName && <Text style={{ fontWeight: '600', color: Colors.darkGrey }}>
                {transaction.walletNickname}
              </Text>}
            </View>
          </View>
          <View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'right', color: Colors.black }}>
                {date}
              </Text>
              <Text style={{ textAlign: 'right', color: Colors.darkGrey }}>
                {transaction.type === 'incoming' ? `from ${shortenHash(transaction.fromAddress)}` : `to ${shortenHash(transaction.toAddress)}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight >
    )
  }
}


const styles = StyleSheet.create({
  transaction: {
    padding: 10,
    // backgroundColor: 'lightgreen',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    backgroundColor: Colors.white
  },
  transactionColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 12,
  },
  address: {
    fontSize: 10,
    color: Colors.grey
  },
  iconFrame: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 50,
    // backgroundColor: '#aaccff',
    borderColor: Colors.grey,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
