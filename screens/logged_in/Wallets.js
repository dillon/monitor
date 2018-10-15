import React from 'react'

import { StyleSheet, TouchableHighlight, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import { isWallet } from '../../utils/isAddress'


export default class Wallets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAddress: '',
      newNickname: '',
    }
  }

  renderItem = (metaItem) => {
    const { item } = metaItem
    console.log(item)
    console.log(item.address)
    return (
      <TouchableHighlight
        underlayColor='#ddd'
      // onPress={() => {
      //     this.props.navigation.navigate(
      //         'Details',
      //         { title: item.title, img: item.img, id: item.imdbID })
      // }}
      // style={styles.touchable}
      >
        <Text style={styles.flatlistItem}>{item.nickname}: {item.address} {item.updated && 'updated!'}</Text>
      </TouchableHighlight >
    )
  }


// https://github.com/dancormier/react-native-swipeout
// Swipeout to add flatlist item "swipe-to-" menu functionality


  handleAddAddress = () => {
    let { newAddress, newNickname } = this.state

    // Make sure nickname isn't blank, or isn't all spaces. If it is, replace it with its address.
    newNickname = newNickname.replace(/\s/g, '').length === 0 ? newAddress : newNickname

    const wallet = {
      address: newAddress,
      nickname: newNickname,
      createdOn: new Date()
    }

    if (isWallet(wallet)) {
      this.props.screenProps.addAddress(wallet); // add wallet
      this.props.screenProps.handleErrorMessage(null); // delete error message
      this.setState({newAddress: '', newNickname: ''})
    }
    else this.props.screenProps.handleErrorMessage('not a valid address');
  }


  render() {
    const { currentUser, errorMessage, theme, wallets, handleSignOut, handleErrorMessage, addAddress } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>

        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="add an address..."
          onChangeText={newAddress => this.setState({ newAddress })}
          value={this.state.newAddress}
          returnKeyType='done'
          onSubmitEditing={this.handleAddAddress}
          blurOnSubmit={true}
          maxLength={42}
        ></TextInput>
        {errorMessage &&
          <Text style={{ color: 'red' }}>
            {errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="sentences"
          placeholder="nickname..."
          onChangeText={newNickname => this.setState({ newNickname })}
          value={this.state.newNickname}
          returnKeyType='done'
          onSubmitEditing={this.handleAddAddress}
          blurOnSubmit={true}
          maxLength={42}
        ></TextInput>

        <Button title="Add" onPress={this.handleAddAddress} />

        {wallets &&
          <FlatList
            removeClippedSubviews={false}
            style={{ flex: 1, borderColor: 'red', borderWidth: 1, marginTop: 100 }}
            data={wallets}
            renderItem={this.renderItem}
            keyExtractor={(wallet) => wallet.address}
          >
          </FlatList>
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
  textInput: {
    padding: 8,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 40
  },

  flatlistItem: {
    paddingTop: 10
  }
})
