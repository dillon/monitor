
// Main.js
import React from 'react'

import { StyleSheet, FlatList, Button, Platform, Image, Text, View } from 'react-native'

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import firebase from 'react-native-firebase'

import Transactions from './logged_in/Transactions'
import Wallets from './logged_in/Wallets'
import Settings from './logged_in/Settings'


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
    if (!this.state.currentUser) {
      this.readUserData(currentUser.uid)
    }
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
      this.setState({errorMessage})
  }

  addAddress = async (wallet) => {
    const { uid } = this.state.currentUser
    console.log(this.state)
    console.log(uid)
    firebase.database().ref(`users/${uid}/wallets`).push(wallet, (data, err) => {
      if (err) throw new Error(err)
      else console.log('succesfull push wallet to database. here is data:', data)
    })
    // TODO: push this new address to database
  }

  render() {
    const { currentUser, errorMessage, theme, wallets } = this.state
    const { handleSignOut, handleErrorMessage, addAddress} = this
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


// class Wallets extends React.Component {
//   render() {
//     const { currentUser, errorMessage, theme, wallets, handleSignOut } = this.props.screenProps
//     return (
//       <View style={styles.container}>
//         <Text>Wallet</Text>
//         {errorMessage &&
//           <Text style={{ color: 'red' }}>
//             {errorMessage}
//           </Text>}
//         <Text>
//           Hi {currentUser && currentUser.email}
//         </Text>
//         <Text>
//           Your uid is {currentUser && currentUser.uid}
//         </Text>
//         <Text>
//           Your theme is {theme && theme}
//         </Text>
//         <Button title='Sign Out' onPress={handleSignOut} />
//       </View>
//     )
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})



// Realtime Database config and initialize

// // pluck values from your 'GoogleService-Info.plist'
// const iosConfig = {
//   clientId: '13346713522-bqaa2ecoq7hi7aa234c0rbmgmn0nhgab.apps.googleusercontent.com',
//   appId: '1:13346713522:ios:f8c1c98293c109bc',
//   apiKey: 'AIzaSyD4_pWbns98wGKYxeA3ZDb8K4x6KDdgZ_o',
//   databaseURL: 'https://monitor-3f707.firebaseio.com',
//   storageBucket: 'monitor-3f707.appspot.com',
//   messagingSenderId: '13346713522',
//   projectId: 'monitor-3f707',
//   // enable persistance by adding the below flag
//   persistence: true,
// }

// const androidConfig = {
//   client_id: '13346713522-mq9k30ebmeic4rua8da9k171l5vrj6o6.apps.googleusercontent.com',
//   appId: '1:13346713522:android:f8c1c98293c109bc',
//   apiKey: 'AIzaSyALCMxx3iL3vm8VbAIYzzLATrcDxlnspQo',
//   databaseURL: 'https://monitor-3f707.firebaseio.com',
//   storageBucket: 'monitor-3f707.appspot.com',
//   messagingSenderId: '13346713522',
//   projectId: 'monitor-3f707',
//   // enable persistance by adding the below flag
//   persistence: true,
// }

// how to set up a stack navigator for each tab:
// https://reactnavigation.org/docs/en/tab-based-navigation.html

