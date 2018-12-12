import React from 'react'

import { StyleSheet, Alert, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TransactionListItem from '../components/TransactionListItem'

import { Colors } from '../../design/Constants'

export default class SingleWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  static navigationOptions = ({ navigation }) => {
    const wallet = navigation.getParam('wallet', 'wallet')
    return {
      title: wallet.nickname,
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


  // componentDidMount() {
  //   const wallet = this.props.navigation.getParam('wallet', 'wallet') // second param is its default value (string)
  //   let transactionsArray = undefined;
  //   if (wallet.transactions) {
  //     wallet.transactions.sort(function (a, b) {
  //       return b.timeStamp - a.timeStamp
  //     })
  //     this.setState({
  //       transactions: wallet.transactions
  //     });
  //   }
  // }


  handleDeleteButton = (nickname, address) => {
    const wallet = this.props.navigation.getParam('wallet', 'wallet') // second param is its default value (string)

    Alert.alert(
      `Delete ${nickname}?`,
      `${address}`,
      [
        { text: 'Cancel' },
        {
          text: 'Delete', onPress: () => {
            this.props.screenProps.deleteAddress(address);
            this.props.navigation.goBack();
          }
        },
      ]
    )
  }

  navigateToSingleTransaction = (transaction) => {
    this.props.navigation.navigate(
      'SingleTransaction',
      { transaction: transaction, writeToClipboard: this.props.screenProps.writeToClipboard })
  }

  renderItem = (metaItem) => {
    const { item } = metaItem
    return (<TransactionListItem navigation={this.props.navigation} navigateToSingleTransaction={this.navigateToSingleTransaction} transaction={item} showNickName={false} />)
  }

  render() {
    const wallet = this.props.navigation.getParam('wallet', 'wallet') // second param is its default value (string)
    const { transactions } = wallet
    return (
      <View style={StyleSheet.absoluteFill}>
        <View>
          <View style={{ padding: 15, backgroundColor: Colors.primary, color: Colors.white, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '600' }}>Wallet Balance</Text>
            <Text style={{ color: Colors.white, fontSize: 24 }}>{wallet.balance && wallet.balance || 0} <Text style={{ color: Colors.grey, fontWeight: '600' }}> ETH</Text></Text>
            <Text style={{color: Colors.darkGrey, fontSize: 12}}>{wallet.address && wallet.address}</Text>
            <View style={{ margin: 10, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => { this.handleDeleteButton(wallet.nickname, wallet.address) }}>
                <Text style={{ color: Colors.red, fontSize: 12, padding: 4 }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.copyButton} onPress={() => { this.props.screenProps.writeToClipboard(wallet.nickname, wallet.address, 'Wallet address') }}>
                <Text style={{ color: Colors.white, fontSize: 12 }}>Copy Address</Text>
                <View style={{ padding: 5 }}>
                  <FeatherIcon name='copy' color={Colors.white} size={12} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.walletColumns}>
          {transactions &&
            <FlatList
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
            <View style={{ backgroundColor: Colors.white }} />
          }
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
