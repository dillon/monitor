import React from 'react'

import { StyleSheet, TouchableHighlight, StatusBar, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';


import { isWallet } from '../../utils/isAddress'
import { Colors } from '../../design/Constants'
import shortenHash from '../../utils/shortenHash'
import WalletListItem from '../components/WalletListItem'

export default class AllWallets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAddress: '',
      newNickname: '',
      showTextInput: false,
    }
  }
  static navigationOptions = {
    title: 'Wallets',
    headerTintColor: Colors.white,
    headerTitleStyle: {
      color: Colors.white,
    },
    headerStyle: {
      backgroundColor: Colors.primary,
      color: Colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
  };

  navigateToSingleWallet = (wallet) => {
    this.props.navigation.navigate(
      'SingleWallet',
      { wallet: wallet, deleteWallet: this.props.screenProps.deleteWallet, navigation: this.props.navigation, writeToClipboard: this.props.screenProps.writeToClipboard }
    )
  }

  handleAddAddress = () => {
    let { newAddress, newNickname } = this.state

    // Make sure nickname isn't blank, or isn't all spaces. If it is, replace it with its address.
    newNickname = newNickname.replace(/\s/g, '').length === 0 ? shortenHash(newAddress) : newNickname

    const wallet = {
      address: newAddress,
      nickname: newNickname,
      createdOn: new Date(),
      isFetchingTransactions: true
    }

    if (isWallet(wallet)) {
      this.props.screenProps.addAddress(wallet); // add wallet
      this.props.screenProps.handleErrorMessage(); // delete error message
      this.setState({ newAddress: '', newNickname: '', showTextInput: false })
    }
    else this.props.screenProps.handleErrorMessage('not a valid address');
  }


  renderItem = (metaItem) => {
    const { item } = metaItem
    return <WalletListItem navigateToSingleTransaction={this.navigateToSingleTransaction} navigateToSingleWallet={this.navigateToSingleWallet} wallet={item} deleteAddress={this.props.screenProps.deleteAddress} />
  }

  render() {
    const { currentUser, errorMessage, wallets, handleSignOut, handleErrorMessage, addAddress, deleteAddress } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>
        {/* <StatusBar
          barStyle="light-content"
        /> */}
        <View style={{ backgroundColor: Colors.primary }}>
          {!this.state.showTextInput &&
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10, marginBottom: 10 }}>
              <Icon name='pluscircleo' size={35} color={Colors.white} onPress={() => { handleErrorMessage(); this.setState({ showTextInput: !this.state.showTextInput }) }} />
            </View>
          }
          {this.state.showTextInput &&
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginRight: 10, marginBottom: 10, marginLeft: 10 }}>
              <TextInput
                style={{
                  padding: 8,
                  borderColor: Colors.white,
                  borderWidth: 1,
                  borderRadius: 5,
                  flex: 1
                }}
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                autoFocus
                color={Colors.white}
                placeholder="0x..."
                onChangeText={newAddress => this.setState({ newAddress })}
                value={this.state.newAddress}
                returnKeyType='done'
                onSubmitEditing={this.handleAddAddress}
                blurOnSubmit={true}
                maxLength={42}
              ></TextInput>
              <Icon style={{ marginLeft: 10 }} name='minuscircleo' size={35} color={Colors.white} onPress={() => { handleErrorMessage(); this.setState({ showTextInput: !this.state.showTextInput }) }} />
            </View>
          }
          {this.state.showTextInput &&
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
              <TextInput
                style={{
                  padding: 8,
                  borderColor: Colors.white,
                  borderWidth: 1,
                  marginLeft: 10,
                  marginRight: 0,
                  marginBottom: 10,
                  borderRadius: 5,
                  flex: 1
                }}
                placeholderTextColor={Colors.grey}
                autoCapitalize="sentences"
                color={Colors.white}
                autoCorrect={false}
                placeholder="nickname..."
                onChangeText={newNickname => this.setState({ newNickname })}
                value={this.state.newNickname}
                returnKeyType='done'
                onSubmitEditing={this.handleAddAddress}
                blurOnSubmit={true}
                maxLength={20}
              ></TextInput>
              <View style={{ width: 55 }}>
                <Button color={Colors.white} title="Add" onPress={this.handleAddAddress} />
              </View>
            </View>
          }
          {errorMessage &&
            <Text style={{ marginLeft: 10, textAlign: 'center', marginRight: 10, color: Colors.red }}>
              {errorMessage}
            </Text>
          }
        </View>
        {wallets &&
          <FlatList
            backgroundColor={Colors.white}
            removeClippedSubviews={false}
            style={{ flex: 1 }}
            data={wallets}
            keyExtractor={x => x.address}
            renderItem={this.renderItem}
            keyExtractor={(wallet) => wallet.address}
          >
          </FlatList>
        }
        {!wallets && !this.state.showTextInput &&
          <View style={{ flex: 1, paddingTop: 100, backgroundColor: Colors.white }}>
            <Button title="Add Address" color={Colors.primary} onPress={() => { handleErrorMessage(); this.setState({ showTextInput: !this.state.showTextInput }) }} />
          </View>
        }
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
  walletDoneFetching: {
    padding: 10,
    marginBottom: -1
  },
  walletStillFetching: {
    padding: 10,
    backgroundColor: Colors.grey,
    marginBottom: -1
  },
  walletColumns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nickname: {
    fontSize: 12,
  },
  address: {
    fontSize: 10,
    color: Colors.darkGrey
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
