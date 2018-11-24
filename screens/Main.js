
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
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      currentUser: null,
      errorMessage: null,
      theme: null,
      wallets: null,
      transactions: null,
    };
  }


  componentDidMount() {
    const { currentUser } = firebase.auth()
    // TODO: make data persistent instead of checking the theme...

    // ENABLING THIS IS CAUSING UNHANDLED PROMISE, but it also allows user data to be read
    if (!this.state.currentUser) {
      // this.setState({ currentUser })})
      this.setState({ currentUser })
      this.readUserData(currentUser.uid)
      // .catch((error) => { this.setState({ errorMessage: error.message }) })
    }
  }

  readUserData = async (uid) => {
    firebase.database().ref(`users/${uid}`)
      .on('value', (snapshot) => {
        const val = snapshot.val()
        const walletsArray = val.wallets ? Object.keys(val.wallets).map(i => val.wallets[i]) : undefined;
        walletsArray.sort(function (a, b) {
          return new Date(b.createdOn) - new Date(a.createdOn)
        })
        const transactionsArray = [];
        if (walletsArray) {
          walletsArray.map((wallet) => {
            if (wallet.transactions && wallet.transactions.length >= 0) {
              wallet.transactions.map((tx) => {
                transactionsArray.push(tx)
              })
            }
          })
        }
        transactionsArray.sort(function (a, b) {
          return b.timeStamp - a.timeStamp
        })
        this.setState({ theme: val.theme, wallets: walletsArray, transactions: transactionsArray })
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
    const { currentUser, errorMessage, theme, wallets, transactions } = this.state
    const { handleSignOut, handleErrorMessage, addAddress } = this
    return (
      <MainNavigation
        screenProps={{
          currentUser,
          errorMessage,
          theme,
          wallets,
          transactions,
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

