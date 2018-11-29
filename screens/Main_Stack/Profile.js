import React from 'react'

import { StyleSheet, FlatList, Button, Platform, Image, Text, View } from 'react-native'


export default class Profile extends React.Component {
  
  render() {
    const { currentUser, errorMessage, theme, wallets, handleSignOut } = this.props.screenProps
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        {errorMessage &&
          <Text style={{ color: 'red' }}>
            {errorMessage}
          </Text>}
        <Text>
          {currentUser && currentUser.email}
        </Text>
        <Text>
          UID: {currentUser && currentUser.uid}
        </Text>
        <Text>
          Theme: {theme && theme}
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

