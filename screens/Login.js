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
        <View style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'baseline' }}>
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
        </View>
        <View style={{ display: 'flex', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'baseline' }}>
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
        </View>
        {confirmReset &&
          <Text style={{ color: Colors.green }}>
            {confirmReset}
          </Text>}
        {this.state.errorMessage &&
          <Text style={{ color: Colors.red }}>
            {this.state.errorMessage}
          </Text>}
        <Button title="Login" onPress={this.handleLogin} />
        <View style={{ height: 40 }} />
        <Button
          color={Colors.green}
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          color={Colors.green}
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
    flex: 1,
    padding: 8,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginTop: 8
  },
})