
// MainRouter.js
import React from 'react'

import { StyleSheet, Alert, FlatList, Button, Platform, Image, Text, View, Clipboard } from 'react-native'

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import firebase from 'react-native-firebase';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import TransactionsRouter from './Main_Stack/TransactionsRouter'
import WalletsRouter from './Main_Stack/WalletsRouter'
import Profile from './Main_Stack/Profile'
import { Colors } from '../design/Constants';

import { BLOCKCYPHER_API_KEY } from '../secrets'

// how to set up a stack navigator for each tab:
// https://reactnavigation.org/docs/en/tab-based-navigation.html


const MainNavigation = createBottomTabNavigator(
  {
    Transactions: {
      screen: TransactionsRouter,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons
            name='compare-arrows'
            color={tintColor}
            size={33}
          />
        )
      })
    },
    Wallets: {
      screen: WalletsRouter,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <AntDesign
            name='wallet'
            color={tintColor}
            size={23}
          />
        )
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name='face-profile'
            color={tintColor}
            size={23}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Wallets',
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.grey,
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
  };

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

      firebase.messaging().requestPermission()
        .then(() => {
          firebase.messaging().getToken()
            .then(token => {
              console.log('requestPermission - user has permission')
              firebase.database().ref(`users/${currentUser.uid}`)
                .update({ pushToken: token })
              // .catch((err) => { this.handleErrorMessage(err) })
              return true
            })
        })

      const messagingRequestPermission = () => {
        console.log('firebase messaging requesting permission')
        return firebase.messaging().requestPermission()
          .then(() => {
            firebase.messaging().getToken()
              .then(token => {
                console.log('requestPermission - user has permission')
                firebase.database().ref(`users/${currentUser.uid}`)
                  .update({ pushToken: token })
                // .catch((err) => { this.handleErrorMessage(err) })
                return true
              })
          })
          .catch(error => {
            console.log('requestPermission - does not have permission')
            return false
          });
      }
      messagingRequestPermission();
    }

    // const FCM = firebase.messaging();
    // FCM.requestPermissions();
    // // gets the device's push token
    // FCM.getToken().then(token => {
    //   // stores the token in the user's document
    //   firebase.database().ref(`users/${uid}`)
    //   .child('pushToken').set(token)
    // });

    // check to make sure the user is authenticated
    // requests permissions from the user

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
            let transactionsArray = [];
            walletsArray.map((wallet, index) => {
              let transactionsForSingleWallet = []
              if (wallet.transactions) {
                Object.keys(wallet.transactions).map((tx) => {
                  transactionsArray.push(wallet.transactions[tx])
                  return transactionsForSingleWallet.push(wallet.transactions[tx])
                });
              }
              transactionsForSingleWallet.sort(function (a, b) {
                return b.timeStamp - a.timeStamp
              })
              walletsArray[index].transactions = transactionsForSingleWallet;
            });
            this.setState({ wallets: walletsArray })
            walletsArray.map((wallet) => {
              if (wallet.transactions) {
                Object.keys(wallet.transactions).map(tx => transactionsArray.push(wallet.transactions[tx]))
              }
            })
            transactionsArray.sort(function (a, b) {
              return b.timeStamp - a.timeStamp
            })
            this.setState({ transactions: transactionsArray })
          }
        }
        catch { (error) => this.handleErrorMessage(error.message) }
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
      .then(() => {
        Alert.alert(
          'Success',
          'Account deleted'
        )
        this.handleSignOut()
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
          snapshot.forEach((child) => {
            // const wallet = child;
            const webhookId = child.child('webhookId').val()
            fetch(
              `https://api.blockcypher.com/v1/eth/main/hooks/${webhookId}?token=${BLOCKCYPHER_API_KEY}`,
              {
                method: 'DELETE', // DELETE method
                headers: {
                  'Content-Type': 'application/json',
                }

              }
            )
              // .then(response => this.handleErrorMessage(JSON.stringify(response)))
              .then(() =>
                child.ref.remove().catch((err) => this.handleErrorMessage(err.message))
              )
              .catch(err => this.handleErrorMessage(err.message))
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

