// SignUp.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase'
import { Colors } from '../design/Constants';

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    firebase.auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(
        () => this.props.navigation.navigate('Main')
      )
      .catch(
        error => this.setState({ errorMessage: error.message })
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <View style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'baseline' }}>
          <TextInput
            autoFocus
            placeholder='Email'
            autoCapitalize='none'
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            returnKeyType='next'
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>
        <View style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'baseline' }}>
          <TextInput
            secureTextEntry
            selectTextOnFocus
            placeholder='Password'
            autoCapitalize='none'
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            ref={(input) => { this.secondTextInput = input; }}
            onSubmitEditing={this.handleSignUp}
            returnKeyType='done'
          />
        </View>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Button
          style={styles.buttons}
          title='Sign Up' onPress={this.handleSignUp} />
        <View style={{ height: 40 }} />
        <Button
          style={styles.buttons}
          title='Already have an account? Login'
          color={Colors.green}
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100,
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginTop: 8
  }
})