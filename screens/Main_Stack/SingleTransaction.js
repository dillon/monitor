import React from 'react'

import { StyleSheet, Alert, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TransactionListItem from '../components/TransactionListItem'

import { Colors } from '../../design/Constants'

import shortenHash from '../../utils/shortenHash'

import moment from 'moment'

export default class SingleTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  static navigationOptions = ({ navigation }) => {
    const transaction = navigation.getParam('transaction', 'transaction')
    return {
      title: shortenHash(transaction.txHash) || 'Transaction',
      headerStyle: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        color: Colors.white,
      },
    };
  };

  // blockHash:
  //   "0x1f75dee5d49649684de541e34ee77f9e9fb27ee085166..."
  // blockNumber:
  //   6793722
  // dateString:
  //   "Thu, 29 Nov 2018 10:19:55 GMT"
  // fromAddress:
  //   "0x4bd827bc0b3ce2e58fa79bf287ed26dd54c853e3"
  // gasPrice:
  //   12000000000
  // gasUsed:
  //   21000
  // timeStamp:
  //   1543486795
  // toAddress:
  //   "0xce13efdee6aae165d888dea2a0c4b9c263a7acf6"
  // txHash:
  //   "0x962f127ecf8c0c311b4c75fb1bde85043aac5c0ed83a3..."
  // type:
  //   "incoming"
  // value:
  //   4.13556949
  // walletAddress:
  //   "0xce13efdee6aae165d888dea2a0c4b9c263a7acf6"
  // walletNickname:
  //   "0xce13ef...acf6"

  render() {
    const transaction = this.props.navigation.getParam('transaction', 'transaction')
    transaction.shortenedTxHash = shortenHash(transaction.txHash)
    const date = moment(transaction.dateString).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={{ flex: 1, padding: 15, backgroundColor: Colors.primary, color: Colors.white, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '600' }}>
            {transaction.type === 'incoming' && 'Incoming' || transaction.type === 'outgoing' && 'Outgoing'} Value
          </Text>
          <Text style={{ color: Colors.white, fontSize: 24 }}>
            {transaction.value && transaction.value || 0}
            <Text style={{ color: Colors.grey, fontWeight: '600' }}>
              &nbsp;ETH
            </Text>
          </Text>
          <Text style={{ maxWidth: 250, color: Colors.darkGrey, fontSize: 12 }}>
            {transaction.txHash && transaction.txHash}
          </Text>
          <View style={{ margin: 10, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.copyButton} onPress={() => this.props.screenProps.writeToClipboard(transaction.txHash, transaction.txHash, 'Transaction hash')}>
              <Text style={{ color: Colors.white, fontSize: 12 }}>
                Copy Tx Hash
              </Text>
              <View style={{ padding: 5 }}>
                <FeatherIcon name='copy' color={Colors.white} size={12} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {transaction.fromAddress &&
              <View style={{ paddingBottom: 10 }}>
                <Text style={{ color: Colors.grey }}>
                  From&nbsp;
            </Text>
                <Text style={{ color: Colors.white, fontSize: 14 }}>
                  {transaction.fromAddress}
                </Text>
              </View>}
            {transaction.toAddress &&
              <View style={{ paddingBottom: 10 }}>
                <Text style={{ color: Colors.grey }}>
                  To&nbsp;
                </Text>
                <Text style={{ color: Colors.white, fontSize: 14 }}>
                  {transaction.toAddress}
                </Text>
              </View>}
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: Colors.grey }}>
                Time&nbsp;
                </Text>
              <Text style={{ color: Colors.white, fontSize: 14 }}>
                {date && date}
              </Text>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: Colors.grey }}>
                Block Number&nbsp;
                </Text>
              <Text style={{ color: Colors.white, fontSize: 14 }}>
                {transaction.blockNumber && transaction.blockNumber}
              </Text>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: Colors.grey }}>
                Block Hash&nbsp;
                </Text>
              <Text style={{ color: Colors.white, fontSize: 14 }}>
                {transaction.blockHash && transaction.blockHash}
              </Text>
            </View>
          </View>
        </View>
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
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: -1
  },
  walletStillFetching: {
    padding: 10,
    backgroundColor: Colors.grey,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: -1
  },
  walletColumns: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  nickname: {
    fontSize: 12,
  },
  address: {
    fontSize: 10,
    color: Colors.grey
  },
  copyButton: {
    borderRadius: 25,
    borderColor: Colors.grey,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingLeft: 8,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
  },
  deleteButton: {
    borderRadius: 25,
    borderColor: Colors.red,
    borderWidth: 1,
    paddingLeft: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    marginRight: 30
  }
})
