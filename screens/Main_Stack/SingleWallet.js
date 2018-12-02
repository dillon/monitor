import React from 'react'

import { StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { Colors } from '../../design/Constants'

export default class SingleWallet extends React.Component {
  constructor(props) {
    super(props);
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
              <View onPress={() => { this.props.screenProps.writeToClipboard(item.address, 'Wallet address') }}>
                <FeatherIcon name='copy' color={Colors.primary} size={15}/>
              </View>
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
})
