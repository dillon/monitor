
// Main.js
import React from 'react'

import { StyleSheet, FlatList, Button, Platform, Image, Text, View } from 'react-native'

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import firebase from 'react-native-firebase'

import Transactions from './Main_Stack/Transactions'
import Wallets from './Main_Stack/Wallets'
import Settings from './Main_Stack/Settings'



// how to set up a stack navigator for each tab:
// https://reactnavigation.org/docs/en/tab-based-navigation.html


const MainNavigation = createBottomTabNavigator({
  Transactions: Transactions,
  Wallets: Wallets,
  Settings: Settings
});



export default class Main extends React.Component {
  static router = MainNavigation.router;
  state = {
    currentUser: null,
    errorMessage: null,
    theme: null,
    wallets: null
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    // TODO: make data persistent instead of checking the theme...
    
    // THIS WAS CAUSING UNHANDLED PROMISE
    // if (!this.state.currentUser) {
    //   this.readUserData(currentUser.uid)
    // }
  }

  readUserData = async (uid) => {
    firebase.database().ref(`users/${uid}`).on('value', (snapshot) => {
      const val = snapshot.val()
      const walletsArray = Object.keys(val.wallets).map(i => val.wallets[i]);
      this.setState({ theme: val.theme, wallets: walletsArray })
    }).catch(error => this.setState({ errorMessage: error.message }))
  }

  handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  handleErrorMessage = (errorMessage) => {
    this.setState({ errorMessage })
  }

  addAddress = async (wallet) => {
    const { uid } = this.state.currentUser

    firebase.database().ref(`users/${uid}/wallets`).orderByChild('address')
      .equalTo(wallet.address).once('value', snapshot => {
        // check if duplicate
        if (snapshot.exists()) {
          // if duplicate, set error message
          this.setState({ errorMessage: 'address already exists' })
        } else {
          // if not duplicate, push to database
          firebase.database().ref(`users/${uid}/wallets`).push(wallet, (data, err) => {
            if (err) throw new Error(err)
          }).catch((error) => this.setState({ errorMessage: error.message }))
        }
      });
  }

  render() {
    const { currentUser, errorMessage, theme, wallets } = this.state
    const { handleSignOut, handleErrorMessage, addAddress } = this
    return (
      <MainNavigation
        screenProps={{
          currentUser,
          errorMessage,
          theme,
          wallets,
          handleSignOut,
          handleErrorMessage,
          addAddress
        }}
        navigation={this.props.navigation}
      />
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

