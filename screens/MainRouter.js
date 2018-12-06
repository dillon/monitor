
// MainRouter.js
import React from 'react'

import { StyleSheet, Alert, FlatList, Button, Platform, Image, Text, View, Clipboard } from 'react-native'

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import firebase from 'react-native-firebase';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TransactionsRouter from './Main_Stack/TransactionsRouter'
import WalletsRouter from './Main_Stack/WalletsRouter'
import Profile from './Main_Stack/Profile'
import { Colors } from '../design/Constants';



// how to set up a stack navigator for each tab:
// https://reactnavigation.org/docs/en/tab-based-navigation.html


const MainNavigation = createBottomTabNavigator(
  {
    Transactions: TransactionsRouter,
    Wallets: WalletsRouter,
    Profile: Profile
  },
  {
    initialRouteName: 'Wallets',
    tabBarOptions: {
      activeTintColor: Colors.black,
      inactiveTintColor: Colors.grey,
      // labelStyle: {
      //   fontSize: 12,
      // },
      style: {
        backgroundColor: Colors.white,
      },
    }
  }
);


export default class MainRouter extends React.Component {
  static router = MainNavigation.router;
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      currentUser: null,
      errorMessage: null,
      wallets: null,
      transactions: null,
    };
  }

  writeToClipboard = async (nickname, hash, name) => {
    await Clipboard.setString(hash);
    Alert.alert(
      'Copied to Clipboard',
      hash,
    )
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    if (!this.state.currentUser) {
      this.setState({ currentUser })
      this.readUserData(currentUser.uid)
    }
  }

  readUserData = async (uid) => {
    firebase.database().ref(`users/${uid}`)
      .on('value', (snapshot) => {
        const val = snapshot.val()
        let walletsArray = []
        try {
          if (val.wallets) {
            walletsArray = val.wallets && Object.keys(val.wallets).map(i => val.wallets[i]);
            walletsArray.sort(function (a, b) {
              return new Date(b.createdOn) - new Date(a.createdOn)
            })
          }
          let transactionsArray = undefined;
          if (walletsArray) {
            transactionsArray = []
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
          this.setState({ wallets: walletsArray, transactions: transactionsArray })
        }
        catch { }
      })
  }

  handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.handleErrorMessage(error.message))
  }

  handleDeleteAccount = async () => {
    firebase.auth().currentUser.delete()
      .then(function () {
        Alert.alert(
          'Success',
          'Account deleted'
        )
      })
      .catch(function (error) { Alert.alert('Error', error.message) })
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
          this.handleErrorMessage('address already exists')
        } else {
          // if not duplicate, push to database
          firebase.database().ref(`users/${uid}/wallets`)
            .push(wallet, (data, err) => {
              if (err) throw new Error(err)
            }).catch((error) => this.handleErrorMessage(error.message))
        }
      });
  }

  deleteAddress = async (address) => {
    const { uid } = this.state.currentUser
    firebase.database().ref(`users/${uid}/wallets`).orderByChild('address').equalTo(address).limitToFirst(1)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function (child) {
            child.ref.remove();
          });
        } else {
          this.handleErrorMessage('could not delete wallet: does not exist')
        }
      })
  }

  render() {
    const { currentUser, errorMessage, wallets, transactions } = this.state
    const { handleSignOut, handleDeleteAccount, handleErrorMessage, addAddress, deleteAddress, writeToClipboard } = this
    return (
      <MainNavigation
        screenProps={{
          currentUser,
          errorMessage,
          wallets,
          transactions,
          handleSignOut,
          handleDeleteAccount,
          handleErrorMessage,
          addAddress,
          deleteAddress,
          writeToClipboard
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

