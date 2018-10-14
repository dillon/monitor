import React from 'react'

import { StyleSheet, TouchableHighlight, FlatList, Button, Platform, Image, Text, TextInput, View } from 'react-native'

import { isWallet } from '../../utils/isAddress'


export default class Wallets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAddress: ''
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
                <Text>{item.nickname}: {item.address} {item.updated && 'updated!'}</Text>
            </TouchableHighlight >
        )
    }

    handleAddAddress = () => {
        const { newAddress } = this.state
        const wallet = {
            address: newAddress,
            isFetchingBalances: true,
            isFetchingTransactions: true,
            nickname: 'dillons wallet',
            createdOn: new Date()
        }

        if (isWallet(wallet)) {
            this.props.screenProps.addAddress(wallet); this.props.screenProps.handleErrorMessage(null);
        }
        else this.props.screenProps.handleErrorMessage('not a valid address');
    }


    render() {
        const { currentUser, errorMessage, theme, wallets, handleSignOut, handleErrorMessage, addAddress } = this.props.screenProps
        return (
            <View style={StyleSheet.absoluteFill}>

                {errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {errorMessage}
                    </Text>}

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="add an address..."
                    onChangeText={newAddress => this.setState({ newAddress })}
                    value={this.state.newAddress}
                    returnKeyType='done'
                    onSubmitEditing={this.handleAddAddress}
                    blurOnSubmit={false}
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
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
})
