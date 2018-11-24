import React from 'react'

import { StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

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
    return (
      <TouchableHighlight
        underlayColor='#ddd'
        onPress={() => {
          this.props.navigation.navigate(
            'Details',
            { title: item.title, img: item.img, id: item.imdbID })
        }}
        style={item.isFetchingTransactions ? styles.walletStillFetching : styles.walletDoneFetching}
      >
        <View style={styles.walletColumns}>
          <View>
            <Text style={styles.nickname}>{item.nickname}{item.updated && ' updated!'}{item.transactions && ' (' + item.transactions.length + ')'}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <View onPress={() => console.log('this should copy the wallets address')}></View>
          </TouchableOpacity>
        </View>
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
      createdOn: new Date(),
      isFetchingTransactions: true
    }

    if (isWallet(wallet)) {
      this.props.screenProps.addAddress(wallet); // add wallet
      this.props.screenProps.handleErrorMessage(null); // delete error message
      this.setState({ newAddress: '', newNickname: '' })
    }
    else this.props.screenProps.handleErrorMessage('not a valid address');
  }


  render() {
    const { currentUser, errorMessage, theme, wallets, handleSignOut, handleErrorMessage, addAddress } = this.props.screenProps
    // wallets = [{ address: '0x04fea4947baba4A5D0aCFAAf1Cb912b7D4670D49', nickname: 'primablock' }, { address: '0x05rat4857dada4A5D0aCFAAf1Cb912b1D2351A75', nickname: 'dillon\'s wallet' }]
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
          autoCorrect={false}
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
            keyExtractor={x => x.address}
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
