import React from 'react'

import { StyleSheet, FlatList, Button, Platform, Image, Text, View } from 'react-native'


export default class Settings extends React.Component {
    render() {
        const { currentUser, errorMessage, theme, wallets, handleSignOut } = this.props.screenProps
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
                {errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {errorMessage}
                    </Text>}
                <Text>
                    Hi there {currentUser && currentUser.email}
                </Text>
                <Text>
                    Your uid is {currentUser && currentUser.uid}
                </Text>
                <Text>
                    Your theme is {theme && theme}
                </Text>
                <Button title='Sign Out' onPress={handleSignOut} />
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

