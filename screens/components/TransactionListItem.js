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
    let { item, showNickName } = this.props
    const date = parseInt(moment().diff(item.dateString, 'months')) <= 0 ? moment(item.dateString).fromNow() : moment(item.dateString).calendar();
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
            <View style={styles.iconFrame}>
              {item.type === 'incoming'
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
              <Text style={item.type === 'incoming' || item.value==0 ? { color: Colors.green } : { color: Colors.red }}>
                {(item.type === 'outgoing' && item.value!=0) && '-'}{parseFloat(item.value.toFixed(8))} <Text style={{ fontWeight: '600', color: Colors.grey }}>ETH</Text>
              </Text>
              {showNickName && <Text style={{ fontWeight: '600', color: Colors.darkGrey }}>
                {item.walletNickname}
              </Text>}
            </View>
          </View>
          <View>
            <View style={{ display: 'flex', border: '1px solid red', flexDirection: 'column' }}>
              <Text style={{ textAlign: 'right', color: Colors.black }}>
                {date}
              </Text>
              <Text style={{ textAlign: 'right', color: Colors.darkGrey }}>
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
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: -1,
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
