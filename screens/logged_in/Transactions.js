import React from 'react'

import { StyleSheet, FlatList, Button, Platform, Image, Text, View } from 'react-native'


export default class Transactions extends React.Component {
    render() {
        const { currentUser, errorMessage, theme, wallets, handleSignOut, addAddress } = this.props.screenProps
        return (
            <View style={styles.container}>
                {errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {errorMessage}
                    </Text>}
                <Text>Transactions</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

