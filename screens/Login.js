// Login.js
import React from 'react'

import { Colors, Styles } from '../design/Constants'

import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', errorMessage: null }
  }

  handleLogin = () => {
    const { email, password } = this.state
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('MainRouter'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    const { navigation } = this.props;
    const confirmReset = navigation.getParam('confirmReset', null)
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {confirmReset &&
          <Text style={{ color: 'darkgreen' }}>
            {confirmReset}
          </Text>}
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          autoFocus
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType='next'
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          blurOnSubmit={false}
        />
        <TextInput
          secureTextEntry
          selectTextOnFocus
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref={(input) => { this.secondTextInput = input; }}
          onSubmitEditing={this.handleLogin}
          returnKeyType='done'
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          title="Reset password"
          onPress={() => this.props.navigation.navigate('PasswordReset')}
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
    padding: 8,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
})