// Loading.js
import { Colors, Styles } from '../design/Constants'

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import firebase from 'react-native-firebase'


export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // if the AuthState changes, check if value of user exists
      this.props.navigation.navigate(user ? 'MainRouter' : 'Login')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Loading</Text> */}
        <ActivityIndicator color={Colors.primary} size='small' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})