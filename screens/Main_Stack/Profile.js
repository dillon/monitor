import React from 'react'

import { StyleSheet, Alert, TouchableOpacity, StatusBar, FlatList, Button, Platform, Image, Text, View } from 'react-native'
import { Colors } from '../../design/Constants';


export default class Profile extends React.Component {


  handleSignOutConfirmation = () => {
    Alert.alert(
      'Sign out user',
      this.props.screenProps.currentUser.email + ' ?',
      [
        { text: 'Cancel' },
        {
          text: 'Sign out', onPress: () => {
            this.props.screenProps.handleSignOut();
          }
        },
      ]
    )
  }

  handleDeleteAccountConfirmation = () => {
    Alert.alert(
      'Delete account',
      this.props.screenProps.currentUser.email + ' ?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete account', onPress: () => {
            this.props.screenProps.handleDeleteAccount();
          }
        },
      ]
    )
  }

  render() {
    const { currentUser, errorMessage, wallets } = this.props.screenProps
    return (
      <View style={StyleSheet.absoluteFill}>
        <StatusBar
          backgroundColor={Colors.primary}
          barStyle="light-content"
        />
        <View style={{ height: 40, width: '100%', backgroundColor: Colors.primary }} />
        <View style={styles.container}>
          {/* {errorMessage &&
            <Text style={{ color: 'red' }}>
              {errorMessage}
            </Text>} */}
          <Text>
            {currentUser.email && currentUser.email}
          </Text>
          <TouchableOpacity style={styles.signOutButton} onPress={this.handleSignOutConfirmation}>
            <Text style={{ color: Colors.primary, fontSize: 12, padding: 4 }}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAccountButton} onPress={this.handleDeleteAccountConfirmation}>
            <Text style={{ color: Colors.red, fontSize: 12, padding: 4 }}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutButton: {
    borderRadius: 25,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingLeft: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    margin: 30
  },
  deleteAccountButton: {
    borderRadius: 25,
    borderColor: Colors.red,
    borderWidth: 1,
    paddingLeft: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    margin: 30
  }
})

