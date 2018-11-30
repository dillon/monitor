import React from 'react'

import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button, Platform, Image, Text, View } from 'react-native'

import moment from 'moment'

import shortenHash from '../../utils/shortenHash'

import Icon from 'react-native-vector-icons/Feather';


export default class Transactions extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { item } = this.props
    const date = moment(item.dateString).fromNow();
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={() => {
          this.props.navigation.navigate(
            'SingleTransaction',
            { transaction: item })
        }}
        style={styles.transaction}
      >
        <View style={styles.transactionColumn}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.copyButton}>
              {item.type === 'incoming'
                ?
                <Icon name='download' size={16} color='grey' />
                :
                <Icon name='upload' size={16} color='grey' />
              }
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={item.type === 'incoming' ? { color: 'blue' } : { color: 'darkorange' }}>
                {parseFloat(item.value.toFixed(8))} <Text style={{ fontWeight: '600', color: '#aaa' }}>ETH</Text>
              </Text>
              <Text style={{ fontWeight: '600', color: '#aaa' }}>
                {item.walletNickname}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ display: 'flex', border: '1px solid red', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'right' }}>
                {date}
              </Text>
              <Text style={{ textAlign: 'right', color: '#aaa' }}>
                {item.type === 'incoming' ? `from ${shortenHash(item.fromAddress)}` : `to ${shortenHash(item.toAddress)}`}
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
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: -1
  },
  transactionColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginRight: 10,
    borderRadius: 50,
    // backgroundColor: '#aaccff',
    borderColor: 'darkgrey',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
